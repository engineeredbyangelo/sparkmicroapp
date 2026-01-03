import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const TextFocusedCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{card.title}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: card.color + '20' }]}>
            <Text style={styles.badgeText}>{card.difficulty}</Text>
          </View>
          <Text style={styles.readTime}>⏱ {card.readTime}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainText}>{card.content}</Text>

        {card.keyPoints && (
          <View style={styles.keyPoints}>
            <Text style={styles.keyPointsTitle}>Key Points:</Text>
            {card.keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPointRow}>
                <View style={[styles.bullet, { backgroundColor: card.color }]} />
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={[styles.categoryTag, { borderColor: card.color }]}>
          <Text style={[styles.categoryText, { color: card.color }]}>{card.category}</Text>
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
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
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
  content: {
    flex: 1,
  },
  mainText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  keyPoints: {
    backgroundColor: 'rgba(0, 150, 255, 0.05)',
    borderRadius: 16,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryBlue,
  },
  keyPointsTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 10,
    marginRight: spacing.md,
  },
  keyPointText: {
    ...typography.body,
    flex: 1,
  },
  footer: {
    marginTop: spacing.lg,
  },
  categoryTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  categoryText: {
    ...typography.caption,
    fontWeight: '600',
  },
});

export default TextFocusedCard;
