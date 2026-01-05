import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../styles/theme';

/**
 * TopicArticleCard Component
 * Displays article cards in TopicDetailScreen with 3 layout variants
 * Matches ModuleCard styling for consistency
 */
export default function TopicArticleCard({ 
  article, 
  layout = 'medium',
  onPress,
  progress = null,
}) {
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

  const IconComponent = getIconComponent(article.icon);
  const iconName = getIconName(article.icon);

  // Compact Layout - Slim horizontal card
  if (layout === 'compact') {
    return (
      <TouchableOpacity 
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.cardGradientStart, theme.colors.cardGradientEnd]}
          style={styles.compactGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.compactIconContainer}>
            <IconComponent name={iconName} size={24} color={theme.colors.primaryBlue} />
          </View>
          
          <View style={styles.compactContent}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {article.title}
            </Text>
            <View style={styles.compactMeta}>
              <Text style={styles.compactMetaText}>
                {article.category}
              </Text>
              {progress && (
                <>
                  <View style={styles.metaDot} />
                  <Text style={styles.compactMetaText}>
                    {Math.round((progress.currentCardIndex / progress.totalCards) * 100)}% complete
                  </Text>
                </>
              )}
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Medium Layout - Standard card with icon, title, description
  if (layout === 'medium') {
    return (
      <TouchableOpacity 
        style={styles.mediumContainer}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.cardGradientStart, theme.colors.cardGradientEnd]}
          style={styles.mediumGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.mediumIconContainer}>
            <LinearGradient
              colors={[`${theme.colors.primaryBlue}30`, `${theme.colors.accentCyan}20`]}
              style={styles.mediumIconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconComponent name={iconName} size={32} color={theme.colors.primaryBlue} />
            </LinearGradient>
          </View>

          <View style={styles.mediumContent}>
            <Text style={styles.mediumTitle} numberOfLines={2}>
              {article.title}
            </Text>
            {article.description && (
              <Text style={styles.mediumDescription} numberOfLines={2}>
                {article.description}
              </Text>
            )}
            <View style={styles.mediumFooter}>
              <View style={styles.mediumTags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{article.category}</Text>
                </View>
                {article.difficulty && (
                  <View style={[styles.tag, styles.tagSecondary]}>
                    <Text style={styles.tagText}>{article.difficulty}</Text>
                  </View>
                )}
              </View>
              {progress && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(progress.currentCardIndex / progress.totalCards) * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Feature Layout - Large hero card with gradient background
  return (
    <TouchableOpacity 
      style={styles.featureContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[
          theme.colors.gradientStart,
          theme.colors.gradientMid1,
          theme.colors.gradientMid2,
          theme.colors.gradientCenter,
        ]}
        style={styles.featureGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.featureIconContainer}>
          <IconComponent name={iconName} size={48} color={theme.colors.primaryBlue} />
        </View>

        <Text style={styles.featureTitle} numberOfLines={3}>
          {article.title}
        </Text>
        
        {article.description && (
          <Text style={styles.featureDescription} numberOfLines={3}>
            {article.description}
          </Text>
        )}

        <View style={styles.featureFooter}>
          <View style={styles.featureTags}>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>{article.category}</Text>
            </View>
            {article.difficulty && (
              <View style={[styles.featureTag, styles.featureTagSecondary]}>
                <Text style={styles.featureTagText}>{article.difficulty}</Text>
              </View>
            )}
          </View>
          
          {progress ? (
            <View style={styles.featureProgress}>
              <Text style={styles.featureProgressText}>
                {Math.round((progress.currentCardIndex / progress.totalCards) * 100)}% Complete
              </Text>
              <View style={styles.featureProgressBar}>
                <View 
                  style={[
                    styles.featureProgressFill, 
                    { width: `${(progress.currentCardIndex / progress.totalCards) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          ) : (
            <View style={styles.featureAction}>
              <Text style={styles.featureActionText}>Start Learning</Text>
              <Ionicons name="arrow-forward" size={20} color={theme.colors.primaryBlue} />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Compact Layout Styles
  compactContainer: {
    marginBottom: 12,
  },
  compactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  compactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${theme.colors.primaryBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  compactContent: {
    flex: 1,
  },
  compactTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactMetaText: {
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.textSecondary,
    marginHorizontal: 6,
  },

  // Medium Layout Styles
  mediumContainer: {
    marginBottom: 16,
  },
  mediumGradient: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mediumIconContainer: {
    marginBottom: 12,
  },
  mediumIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediumContent: {
    flex: 1,
  },
  mediumTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 8,
    lineHeight: 22,
  },
  mediumDescription: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  mediumFooter: {
    marginTop: 8,
  },
  mediumTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: `${theme.colors.primaryBlue}20`,
  },
  tagSecondary: {
    backgroundColor: `${theme.colors.accentCyan}15`,
  },
  tagText: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.colors.primaryBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: `${theme.colors.primaryBlue}20`,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: 2,
  },

  // Feature Layout Styles
  featureContainer: {
    marginBottom: 20,
  },
  featureGradient: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 240,
  },
  featureIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: `${theme.colors.primaryBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 22,
    color: theme.colors.textPrimary,
    marginBottom: 12,
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  featureDescription: {
    fontFamily: theme.fonts.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  featureFooter: {
    marginTop: 'auto',
  },
  featureTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featureTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: `${theme.colors.primaryBlue}25`,
  },
  featureTagSecondary: {
    backgroundColor: `${theme.colors.accentCyan}20`,
  },
  featureTagText: {
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.colors.primaryBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  featureProgress: {
    marginTop: 8,
  },
  featureProgressText: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  featureProgressBar: {
    height: 6,
    backgroundColor: `${theme.colors.primaryBlue}20`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  featureProgressFill: {
    height: '100%',
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: 3,
  },
  featureAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  featureActionText: {
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.colors.primaryBlue,
    letterSpacing: 1,
  },
});
