import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import TopicArticleCard from '../components/TopicArticleCard';
import articlesData from '../data/articles.json';
import { getModuleProgress } from '../utils/progressStorage';
import { addToQueue, isInQueue, getQueueStatus } from '../utils/queueStorage';

export default function TopicDetailScreen({ route, navigation }) {
  const { topicId, topicTitle, topicColor } = route.params;
  const [articles, setArticles] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [inQueue, setInQueue] = useState(false);
  const [queueStatus, setQueueStatus] = useState({ size: 0, isNearLimit: false, isFull: false });

  useEffect(() => {
    loadArticles();
    checkQueueStatus();
  }, [topicId]);

  const loadArticles = async () => {
    // Filter articles by topic name matching
    const topicName = topicTitle || '';
    const filtered = articlesData.filter(article => 
      article.topics?.some(t => t.toLowerCase() === topicName.toLowerCase())
    );
    
    setArticles(filtered);

    // Load progress for articles with moduleId
    const progressMap = {};
    for (const article of filtered) {
      if (article.moduleId) {
        const progress = await getModuleProgress(article.moduleId);
        if (progress) {
          progressMap[article.id] = progress;
        }
      }
    }
    setProgressData(progressMap);
  };

  const checkQueueStatus = async () => {
    const inQ = await isInQueue(topicId);
    setInQueue(inQ);
    
    const status = await getQueueStatus();
    setQueueStatus(status);
  };

  const handleAddToQueue = async () => {
    if (inQueue) {
      Alert.alert('Already in Queue', 'This topic is already in your learning queue.');
      return;
    }

    const result = await addToQueue({
      id: topicId,
      title: topicTitle,
      color: topicColor,
      articlesCount: articles.length,
    });

    if (result.success) {
      setInQueue(true);
      setQueueStatus(prev => ({
        size: result.queueSize,
        isNearLimit: result.isNearLimit,
        isFull: result.queueSize >= 15,
        remaining: 15 - result.queueSize,
      }));
      
      if (result.isNearLimit) {
        Alert.alert(
          'Added to Queue',
          `${topicTitle} added! You have ${15 - result.queueSize} queue slots remaining.`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Added to Queue', `${topicTitle} has been added to your learning queue.`);
      }
    } else {
      if (result.code === 'QUEUE_FULL') {
        Alert.alert('Queue Full', 'Your learning queue is full (15 topics max). Please complete some topics first.');
      } else if (result.code === 'ALREADY_EXISTS') {
        setInQueue(true);
      } else {
        Alert.alert('Error', 'Failed to add topic to queue. Please try again.');
      }
    }
  };

  const handleArticlePress = (article) => {
    if (article.moduleId) {
      // Navigate to Discover screen with module
      navigation.navigate('Discover', {
        moduleId: article.moduleId,
        startIndex: article.currentCardIndex || 0,
      });
    } else {
      Alert.alert('Coming Soon', 'This article module is not yet available.');
    }
  };

  const getLayoutForIndex = (index) => {
    // Pattern: Feature -> Medium -> Medium -> Compact -> Compact
    const pattern = index % 5;
    if (pattern === 0) return 'feature';
    if (pattern === 1 || pattern === 2) return 'medium';
    return 'compact';
  };

  return (
    <View style={styles.container}>
      {/* Header with Queue Button */}
      <LinearGradient
        colors={[theme.colors.cardGradientStart, theme.colors.background]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>{topicTitle}</Text>
            <TouchableOpacity 
              style={[
                styles.queueButton,
                inQueue && styles.queueButtonActive,
                queueStatus.isFull && !inQueue && styles.queueButtonDisabled,
              ]}
              onPress={handleAddToQueue}
              disabled={inQueue || queueStatus.isFull}
            >
              <Ionicons 
                name={inQueue ? "checkmark-circle" : "add-circle-outline"} 
                size={20} 
                color={inQueue ? theme.colors.accentGreen : theme.colors.primaryBlue} 
              />
              <Text style={[
                styles.queueButtonText,
                inQueue && styles.queueButtonTextActive,
              ]}>
                {inQueue ? 'In Queue' : 'Add to Queue'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>
              {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
            </Text>
            {queueStatus.isNearLimit && !queueStatus.isFull && (
              <>
                <View style={styles.metaDot} />
                <Text style={[styles.headerMetaText, styles.warningText]}>
                  {queueStatus.remaining} queue slots left
                </Text>
              </>
            )}
            {queueStatus.isFull && !inQueue && (
              <>
                <View style={styles.metaDot} />
                <Text style={[styles.headerMetaText, styles.errorText]}>
                  Queue Full
                </Text>
              </>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Articles List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {articles.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>No articles found for this topic</Text>
            <Text style={styles.emptySubtext}>Check back soon for new content!</Text>
          </View>
        ) : (
          articles.map((article, index) => (
            <TopicArticleCard
              key={article.id}
              article={article}
              layout={getLayoutForIndex(index)}
              progress={progressData[article.id]}
              onPress={() => handleArticlePress(article)}
            />
          ))
        )}
        
        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 24,
    color: theme.colors.textPrimary,
    letterSpacing: 1,
    flex: 1,
  },
  queueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: `${theme.colors.primaryBlue}15`,
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue,
  },
  queueButtonActive: {
    backgroundColor: `${theme.colors.accentGreen}15`,
    borderColor: theme.colors.accentGreen,
  },
  queueButtonDisabled: {
    opacity: 0.4,
  },
  queueButtonText: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.colors.primaryBlue,
    letterSpacing: 0.5,
  },
  queueButtonTextActive: {
    color: theme.colors.accentGreen,
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMetaText: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  warningText: {
    color: theme.colors.accentYellow,
  },
  errorText: {
    color: theme.colors.accentRed,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.textSecondary,
    marginHorizontal: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  emptySubtext: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.colors.textTertiary,
    marginTop: 6,
  },
  bottomPadding: {
    height: 40,
  },
});
