import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import SparkOrb from '../components/SparkOrb';
import CardStack from '../components/CardStack';
import learningCardsData from '../data/learningCards.json';

const DiscoverScreen = () => {
  const [showCards, setShowCards] = useState(false);

  if (showCards) {
    return (
      <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
        <LinearGradient
          colors={[
            colors.gradientStart,
            colors.gradientStep1,
            colors.gradientStep2,
            colors.gradientMiddle,
            colors.gradientStep3,
            colors.gradientStep4,
            colors.gradientEnd,
          ]}
          style={globalStyles.gradientOverlay}
        />
        
        <CardStack 
          cards={learningCardsData} 
          onComplete={() => setShowCards(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <View style={styles.container}>
        {/* Header with Spark Orb */}
        <View style={styles.header}>
          <View style={styles.orbHeader}>
            <SparkOrb size={100} animate={true} />
          </View>
          <Text style={styles.title}>AI Discovery Hub</Text>
          <Text style={styles.subtitle}>
            Experience intelligent micro-learning
          </Text>
        </View>

        {/* Start Learning Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[globalStyles.glowCard, styles.startButton]}
            activeOpacity={0.8}
            onPress={() => setShowCards(true)}
          >
            <LinearGradient
              colors={[colors.primaryBlue, colors.accentCyan]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.startButtonIcon}>🧠</Text>
              <Text style={styles.startButtonText}>Start Learning</Text>
              <Text style={styles.startButtonSubtext}>12 Cards • Neural Networks</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            <View style={[globalStyles.card, styles.featureBox]}>
              <Text style={styles.featureNumber}>12</Text>
              <Text style={styles.featureLabel}>Cards</Text>
            </View>
            <View style={[globalStyles.card, styles.featureBox]}>
              <Text style={styles.featureNumber}>2-4</Text>
              <Text style={styles.featureLabel}>Min Each</Text>
            </View>
            <View style={[globalStyles.card, styles.featureBox]}>
              <Text style={styles.featureNumber}>+250</Text>
              <Text style={styles.featureLabel}>XP</Text>
            </View>
          </View>
        </View>

        {/* Coming Soon Section */}
        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonTitle}>More Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            🚀 AI Chat • Voice Learning • AR Experiences
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  orbHeader: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionContainer: {
    marginBottom: spacing.xl,
  },
  startButton: {
    marginBottom: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  startButtonIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  startButtonText: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  startButtonSubtext: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  featuresGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  featureBox: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  featureNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: spacing.xs,
  },
  featureLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  comingSoonSection: {
    marginTop: 'auto',
    paddingBottom: 120, // Extra space for tab bar
    alignItems: 'center',
  },
  comingSoonTitle: {
    ...typography.h4,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  comingSoonText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default DiscoverScreen;
