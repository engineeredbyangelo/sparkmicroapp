import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../styles/theme';

/**
 * Standard Module Card Layout
 * Clean, minimal design with progress bar
 */
export const StandardModuleCard = ({ module, progress, onPress }) => {
  const progressPercent = progress?.progressPercentage || 0;
  const cardIndex = progress?.currentCardIndex || 0;

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={module.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.standardCard}
      >
        {/* Icon Section */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconLarge}>{module.icon}</Text>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.headerRow}>
            <Text style={styles.difficulty}>{module.difficulty}</Text>
            <Text style={styles.duration}>
              <Ionicons name="time-outline" size={12} color="#fff" /> {module.estimatedTime}
            </Text>
          </View>
          
          <Text style={styles.title}>{module.title}</Text>
          <Text style={styles.subtitle}>{module.subtitle}</Text>

          {/* Progress Section */}
          {progressPercent > 0 ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {cardIndex}/{module.totalCards} • {progressPercent}% Complete
              </Text>
            </View>
          ) : (
            <View style={styles.startContainer}>
              <Ionicons name="play-circle" size={20} color="#fff" />
              <Text style={styles.startText}>Start Learning</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

/**
 * Technical Module Card Layout
 * Detailed, info-rich design with stats
 */
export const TechnicalModuleCard = ({ module, progress, onPress }) => {
  const progressPercent = progress?.progressPercentage || 0;
  const cardIndex = progress?.currentCardIndex || 0;

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.technicalCard}>
        {/* Header with gradient accent */}
        <LinearGradient
          colors={[module.gradient[0], module.gradient[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.technicalHeader}
        >
          <Text style={styles.iconMedium}>{module.icon}</Text>
          <View style={styles.technicalHeaderText}>
            <Text style={styles.technicalTitle}>{module.title}</Text>
            <Text style={styles.technicalCategory}>{module.category}</Text>
          </View>
        </LinearGradient>

        {/* Content Body */}
        <View style={styles.technicalBody}>
          <Text style={styles.technicalDescription} numberOfLines={2}>
            {module.description}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="cards" size={16} color={theme.colors.accent} />
              <Text style={styles.statText}>{module.totalCards} Cards</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name={
                  module.difficulty === 'Beginner' ? 'signal-cellular-1' :
                  module.difficulty === 'Intermediate' ? 'signal-cellular-2' :
                  'signal-cellular-3'
                }
                size={16} 
                color={theme.colors.accent} 
              />
              <Text style={styles.statText}>{module.difficulty}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={theme.colors.accent} />
              <Text style={styles.statText}>{module.estimatedTime}</Text>
            </View>
          </View>

          {/* Progress or CTA */}
          {progressPercent > 0 ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={module.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressFillGradient, { width: `${progressPercent}%` }]}
                />
              </View>
              <Text style={styles.progressTextTechnical}>
                Card {cardIndex + 1} of {module.totalCards} • {progressPercent}%
              </Text>
            </View>
          ) : (
            <View style={styles.ctaButton}>
              <Text style={styles.ctaText}>Begin Module</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Practical Module Card Layout
 * Action-oriented, visual design with tags
 */
export const PracticalModuleCard = ({ module, progress, onPress }) => {
  const progressPercent = progress?.progressPercentage || 0;
  const isStarted = progressPercent > 0;

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.practicalCard}>
        {/* Left Accent Bar */}
        <LinearGradient
          colors={module.gradient}
          style={styles.accentBar}
        />

        {/* Content */}
        <View style={styles.practicalContent}>
          {/* Top Section */}
          <View style={styles.practicalTop}>
            <Text style={styles.iconSmall}>{module.icon}</Text>
            <View style={styles.practicalHeader}>
              <Text style={styles.practicalTitle}>{module.title}</Text>
              <Text style={styles.practicalSubtitle}>{module.subtitle}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {module.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Bottom Row */}
          <View style={styles.practicalBottom}>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {module.totalCards} cards • {module.estimatedTime}
              </Text>
              <View style={[styles.difficultyBadge, { 
                backgroundColor: module.difficulty === 'Beginner' ? '#10B981' :
                                 module.difficulty === 'Intermediate' ? '#F59E0B' :
                                 '#EF4444'
              }]}>
                <Text style={styles.difficultyText}>{module.difficulty}</Text>
              </View>
            </View>

            {/* Progress or Start */}
            {isStarted ? (
              <View style={styles.resumeSection}>
                <View style={styles.progressBarPractical}>
                  <LinearGradient
                    colors={module.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFillGradient, { width: `${progressPercent}%` }]}
                  />
                </View>
                <Text style={styles.resumeText}>
                  Resume • {progressPercent}% Complete
                </Text>
              </View>
            ) : (
              <View style={styles.startButton}>
                <Ionicons name="play" size={16} color="#fff" />
                <Text style={styles.startButtonText}>Start</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },

  // STANDARD CARD STYLES
  standardCard: {
    borderRadius: 16,
    padding: 20,
    minHeight: 180,
  },
  iconContainer: {
    marginBottom: 12,
  },
  iconLarge: {
    fontSize: 48,
  },
  contentSection: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  difficulty: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontFamily: theme.fonts.body,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  duration: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontFamily: theme.fonts.body,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontFamily: theme.fonts.body,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  progressFillGradient: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontFamily: theme.fonts.body,
    fontWeight: '600',
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: theme.fonts.body,
    fontWeight: '600',
  },

  // TECHNICAL CARD STYLES
  technicalCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  technicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconMedium: {
    fontSize: 32,
  },
  technicalHeaderText: {
    flex: 1,
  },
  technicalTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: theme.fonts.heading,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  technicalCategory: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: theme.fonts.body,
    marginTop: 2,
  },
  technicalBody: {
    padding: 16,
  },
  technicalDescription: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontFamily: theme.fonts.body,
    lineHeight: 20,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: theme.fonts.body,
  },
  progressTextTechnical: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontFamily: theme.fonts.body,
    fontWeight: '600',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,150,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  ctaText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: theme.fonts.body,
    fontWeight: '600',
  },

  // PRACTICAL CARD STYLES
  practicalCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  accentBar: {
    width: 6,
  },
  practicalContent: {
    flex: 1,
    padding: 16,
  },
  practicalTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  iconSmall: {
    fontSize: 28,
  },
  practicalHeader: {
    flex: 1,
  },
  practicalTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: theme.fonts.heading,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  practicalSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontFamily: theme.fonts.body,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontFamily: theme.fonts.body,
    fontWeight: '500',
  },
  practicalBottom: {
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: theme.fonts.body,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: theme.fonts.body,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  resumeSection: {
    gap: 6,
  },
  progressBarPractical: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  resumeText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontFamily: theme.fonts.body,
    fontWeight: '600',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: theme.colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: theme.fonts.body,
    fontWeight: '700',
  },
});
