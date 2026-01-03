import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../../styles/theme';
import SparkOrb from '../SparkOrb';

const CompletionCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[card.color + '40', card.color + '20', 'transparent']}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.orbContainer}>
          <SparkOrb size={100} animate={true} />
        </View>

        <Text style={styles.title}>{card.title}</Text>
        
        <View style={styles.achievementBadge}>
          <Text style={styles.achievementIcon}>🏆</Text>
          <Text style={styles.achievementText}>{card.achievement}</Text>
        </View>

        <Text style={styles.description}>{card.content}</Text>

        <View style={styles.nextSection}>
          <Text style={styles.nextLabel}>Continue Learning:</Text>
          <View style={[styles.nextModule, { borderColor: card.color }]}>
            <Text style={[styles.nextModuleText, { color: card.color }]}>
              {card.nextModule} →
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Cards Completed</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>+250</Text>
            <Text style={styles.statLabel}>XP Earned</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.2)',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBlue + '20',
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementText: {
    ...typography.h4,
    color: colors.accentCyan,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  nextSection: {
    width: '100%',
    alignItems: 'center',
  },
  nextLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nextModule: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  nextModuleText: {
    ...typography.h4,
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 150, 255, 0.05)',
    borderRadius: 16,
    padding: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(0, 150, 255, 0.2)',
    marginHorizontal: spacing.md,
  },
});

export default CompletionCard;
