import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const TextFocusedCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.header}>
        <Text style={styles.title}>{card.title}</Text>
        {(card.difficulty || card.readTime) && (
        <View style={styles.metaRow}>
          {card.difficulty && (
          <View style={[styles.badge, { backgroundColor: (card.color || '#0096FF') + '20' }]}>
            <Text style={styles.badgeText}>{card.difficulty}</Text>
          </View>
          )}
          {card.readTime && <Text style={styles.readTime}>⏱ {card.readTime}</Text>}
        </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.mainText}>{card.content || card.description || ''}</Text>

        {card.keyPoints && (
          <View style={styles.keyPoints}>
            <Text style={styles.keyPointsTitle}>Key Points:</Text>
            {card.keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPointRow}>
                <View style={[styles.bullet, { backgroundColor: card.color || '#0096FF' }]} />
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        )}
        
        {card.keyTakeaway && (
          <View style={styles.takeawayBox}>
            <Text style={styles.takeawayLabel}>Key Takeaway</Text>
            <Text style={styles.takeawayText}>{card.keyTakeaway}</Text>
          </View>
        )}
      </View>

      {card.category && (
      <View style={styles.footer}>
        <View style={[styles.categoryTag, { borderColor: card.color || '#0096FF' }]}>
          <Text style={[styles.categoryText, { color: card.color || '#0096FF' }]}>{card.category}</Text>
        </View>
      </View>
      )}
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
  takeawayBox: {
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentCyan,
  },
  takeawayLabel: {
    ...typography.caption,
    color: colors.accentCyan,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  takeawayText: {
    ...typography.body,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
});

export default TextFocusedCard;
