import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import SparkOrb from '../components/SparkOrb';

const DiscoverScreen = () => {
  const aiSuggestions = [
    {
      id: 1,
      title: 'AI-Powered Learning Path',
      description: 'Get personalized recommendations based on your interests',
      icon: '🎯',
      color: colors.accentPurple,
    },
    {
      id: 2,
      title: 'Quick Insights',
      description: 'Bite-sized knowledge powered by AI',
      icon: '⚡',
      color: colors.accentCyan,
    },
    {
      id: 3,
      title: 'Adaptive Quizzes',
      description: 'Test your knowledge with smart questions',
      icon: '🧠',
      color: colors.primaryBlue,
    },
    {
      id: 4,
      title: 'Learning Analytics',
      description: 'Track your progress with AI insights',
      icon: '📊',
      color: colors.accentPurple,
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with Spark Orb */}
        <View style={styles.header}>
          <View style={styles.orbHeader}>
            <SparkOrb size={80} animate={true} />
          </View>
          <Text style={styles.title}>AI Discovery Hub</Text>
          <Text style={styles.subtitle}>
            Powered by intelligent learning algorithms
          </Text>
        </View>

        {/* AI Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Learning Features</Text>
          {aiSuggestions.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[globalStyles.card, styles.featureCard]}
              activeOpacity={0.8}
            >
              <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                <Text style={styles.featureEmoji}>{feature.icon}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Coming Soon Section */}
        <View style={[styles.section, styles.comingSoonSection]}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <View style={[globalStyles.card, styles.comingSoonCard]}>
            <Text style={styles.comingSoonEmoji}>🚀</Text>
            <Text style={styles.comingSoonText}>
              More AI-powered features on the way!
            </Text>
            <Text style={styles.comingSoonSubtext}>
              Chat with Spark, voice learning, AR experiences, and more...
            </Text>
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
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  orbHeader: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  arrow: {
    fontSize: 20,
    color: colors.primaryBlue,
    marginLeft: spacing.sm,
  },
  comingSoonSection: {
    paddingBottom: 100, // Extra padding for tab bar
  },
  comingSoonCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  comingSoonEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  comingSoonText: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  comingSoonSubtext: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default DiscoverScreen;
