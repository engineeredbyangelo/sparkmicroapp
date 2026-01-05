import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import SparkOrb from '../components/SparkOrb';

// Import mock data
import articlesData from '../data/articles.json';
import topicsData from '../data/topics.json';
import userProgressData from '../data/userProgress.json';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const inProgressArticles = articlesData.filter(article => article.inProgress);
  const newTopics = topicsData.filter(topic => topic.trending);

  const handleArticlePress = (article) => {
    if (article.moduleId) {
      // Navigate to Discover screen with module and card index
      navigation.navigate('Discover', {
        moduleId: article.moduleId,
        startIndex: article.currentCardIndex || 0,
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      {/* Gradient overlay */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with Spark Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <SparkOrb size={50} />
            <Text style={styles.logoText}>Spark</Text>
          </View>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={[globalStyles.glowCard, styles.progressCard]}>
            <View style={styles.progressRow}>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{userProgressData.totalUnitsCompleted}</Text>
                <Text style={styles.progressLabel}>Completed</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{userProgressData.currentStreak}</Text>
                <Text style={styles.progressLabel}>Day Streak</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>{userProgressData.level}</Text>
                <Text style={styles.progressLabel}>Level</Text>
              </View>
            </View>
            
            {/* Daily Goal Progress */}
            <View style={styles.goalContainer}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalText}>Daily Goal</Text>
                <Text style={styles.goalProgress}>
                  {userProgressData.dailyGoal.completed}/{userProgressData.dailyGoal.target} lessons
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <LinearGradient
                  colors={[colors.primaryBlue, colors.accentCyan]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${(userProgressData.dailyGoal.completed / userProgressData.dailyGoal.target) * 100}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Current Learning Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          {inProgressArticles.map(article => (
            <TouchableOpacity 
              key={article.id} 
              activeOpacity={0.8}
              onPress={() => handleArticlePress(article)}
            >
              <View style={[globalStyles.card, styles.articleCard]}>
                <View style={styles.articleHeader}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.badgeText}>{article.difficulty}</Text>
                  </View>
                  <Text style={styles.durationText}>⏱ {article.duration}</Text>
                </View>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDescription} numberOfLines={2}>
                  {article.description}
                </Text>
                
                {/* Quick Preview of where they left off */}
                {article.currentCardIndex > 0 && (
                  <View style={styles.resumePreview}>
                    <Text style={styles.resumeText}>
                      📍 Resume at Card {article.currentCardIndex + 1}
                    </Text>
                  </View>
                )}
                
                {/* Progress Bar */}
                <View style={styles.articleProgressContainer}>
                  <View style={styles.progressBarContainer}>
                    <LinearGradient
                      colors={[colors.accentCyan, colors.primaryBlue]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.progressBarFill, { width: `${article.progress}%` }]}
                    />
                  </View>
                  <Text style={styles.progressText}>{article.progress}%</Text>
                </View>

                <View style={styles.topicsContainer}>
                  {article.topics.map((topic, idx) => (
                    <View key={idx} style={styles.topicTag}>
                      <Text style={styles.topicTagText}>{topic}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* New Topics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Discover New Topics</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.topicsScroll}
            contentContainerStyle={styles.topicsScrollContent}
          >
            {newTopics.map(topic => (
              <TouchableOpacity key={topic.id} activeOpacity={0.8}>
                <LinearGradient
                  colors={[`${topic.color}30`, `${topic.color}10`]}
                  style={[globalStyles.card, styles.topicCard]}
                >
                  <Text style={styles.topicIcon}>{topic.icon}</Text>
                  <Text style={styles.topicName}>{topic.name}</Text>
                  <Text style={styles.topicCount}>{topic.articlesCount} articles</Text>
                  {topic.trending && (
                    <View style={styles.trendingBadge}>
                      <Text style={styles.trendingText}>🔥 Trending</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Explore Tab Section */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Explore Themes</Text>
          <View style={styles.exploreGrid}>
            {topicsData.slice(0, 4).map(topic => (
              <TouchableOpacity key={topic.id} style={styles.exploreItem} activeOpacity={0.8}>
                <LinearGradient
                  colors={[`${topic.color}40`, `${topic.color}15`]}
                  style={[globalStyles.card, styles.exploreCard]}
                >
                  <Text style={styles.exploreIcon}>{topic.icon}</Text>
                  <Text style={styles.exploreName}>{topic.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  logoText: {
    ...typography.h1,
    marginLeft: spacing.md,
    color: colors.primaryBlue,
    fontWeight: '800',
  },
  dateText: {
    ...typography.bodySecondary,
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primaryBlue,
  },
  progressCard: {
    padding: spacing.lg,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...typography.caption,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.primaryBlue,
    opacity: 0.3,
  },
  goalContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 150, 255, 0.2)',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  goalText: {
    ...typography.body,
  },
  goalProgress: {
    ...typography.bodySecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  articleCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  articleBadge: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  badgeText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  durationText: {
    ...typography.caption,
  },
  articleTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  articleDescription: {
    ...typography.bodySecondary,
    marginBottom: spacing.md,
  },
  resumePreview: {
    backgroundColor: 'rgba(0, 150, 255, 0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentCyan,
  },
  resumeText: {
    ...typography.caption,
    color: colors.accentCyan,
    fontWeight: '600',
  },
  articleProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressText: {
    ...typography.caption,
    marginLeft: spacing.sm,
    minWidth: 40,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  topicTag: {
    backgroundColor: 'rgba(0, 150, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
  },
  topicTagText: {
    ...typography.caption,
    color: colors.accentCyan,
  },
  topicsScroll: {
    marginHorizontal: -spacing.lg,
  },
  topicsScrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  topicCard: {
    width: 160,
    height: 180,
    padding: spacing.md,
    marginRight: spacing.md,
    justifyContent: 'space-between',
  },
  topicIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  topicName: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  topicCount: {
    ...typography.caption,
  },
  trendingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendingText: {
    fontSize: 10,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exploreItem: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    marginBottom: spacing.md,
  },
  exploreCard: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  exploreName: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
