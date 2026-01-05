import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, globalStyles } from '../styles/theme';

import topicsData from '../data/topics.json';
import articlesData from '../data/articles.json';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = [...new Set(articlesData.map(article => article.category))];

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicDetail', {
      topicId: topic.id,
      topicTitle: topic.title || topic.name,
      topicColor: topic.color,
    });
  };

  const getIconComponent = (iconName) => {
    if (iconName?.startsWith('MaterialCommunityIcons/')) {
      return MaterialCommunityIcons;
    }
    return Ionicons;
  };

  const getIconName = (iconName) => {
    if (iconName?.includes('/')) {
      return iconName.split('/')[1];
    }
    return iconName || 'book-outline';
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover new topics and expand your knowledge</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[globalStyles.card, styles.searchBar]}>
            <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics, lessons..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* All Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Topics</Text>
          <View style={styles.topicsGrid}>
            {topicsData.map(topic => {
              const IconComponent = getIconComponent(topic.icon);
              const iconName = getIconName(topic.icon);
              
              return (
                <TouchableOpacity 
                  key={topic.id} 
                  style={styles.topicItem} 
                  activeOpacity={0.8}
                  onPress={() => handleTopicPress(topic)}
                >
                  <LinearGradient
                    colors={[`${topic.color}40`, `${topic.color}15`]}
                    style={[globalStyles.card, styles.topicCard]}
                  >
                    <View style={styles.topicIconContainer}>
                      <IconComponent name={iconName} size={32} color={topic.color} />
                    </View>
                    <Text style={styles.topicName}>{topic.name}</Text>
                    <Text style={styles.topicCount}>{topic.articlesCount} articles</Text>
                    {topic.trending && (
                      <View style={styles.trendingBadge}>
                        <Ionicons name="flame" size={12} color={colors.accentOrange} />
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Categories */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>By Category</Text>
          {categories.map((category, idx) => {
            const categoryArticles = articlesData.filter(a => a.category === category);
            return (
              <TouchableOpacity key={idx} activeOpacity={0.8}>
                <View style={[globalStyles.card, styles.categoryCard]}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{category}</Text>
                    <Text style={styles.categoryCount}>
                      {categoryArticles.length} lessons →
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                  >
                    {categoryArticles.map(article => (
                      <View key={article.id} style={styles.miniCard}>
                        <Text style={styles.miniCardTitle} numberOfLines={2}>
                          {article.title}
                        </Text>
                        <Text style={styles.miniCardDuration}>{article.duration}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            );
          })}
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
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.bodySecondary,
    marginTop: spacing.xs,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
  },
  section: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  topicCard: {
    aspectRatio: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  topicIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicName: {
    ...typography.body,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  topicCount: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  trendingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.cardBackground,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryName: {
    ...typography.h3,
  },
  categoryCount: {
    ...typography.bodySecondary,
    color: colors.primaryBlue,
  },
  categoryScroll: {
    marginHorizontal: -spacing.sm,
  },
  miniCard: {
    backgroundColor: 'rgba(0, 150, 255, 0.1)',
    padding: spacing.md,
    borderRadius: 12,
    marginRight: spacing.sm,
    width: 140,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.2)',
  },
  miniCardTitle: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  miniCardDuration: {
    ...typography.caption,
    color: colors.accentCyan,
  },
});

export default ExploreScreen;
