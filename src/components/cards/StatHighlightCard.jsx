import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const StatHighlightCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <Text style={styles.title}>{card.title}</Text>
      
      <View style={styles.statsGrid}>
        {card.stats.map((stat, index) => (
          <View 
            key={index} 
            style={[
              styles.statBox,
              { borderColor: card.color, backgroundColor: card.color + '10' }
            ]}
          >
            <Text style={[styles.statValue, { color: card.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{card.content}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: card.color + '20' }]}>
            <Text style={styles.badgeText}>{card.difficulty}</Text>
          </View>
          <Text style={styles.readTime}>⏱ {card.readTime}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.2)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    flexGrow: 1,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  statsGrid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statBox: {
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodySecondary,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  footer: {
    marginTop: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  badgeText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  readTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default StatHighlightCard;
