import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const QuoteCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteIcon}>"</Text>
        <Text style={styles.quote}>{card.quote}</Text>
        <Text style={styles.quoteIconBottom}>"</Text>
      </View>

      <View style={styles.authorContainer}>
        <View style={[styles.authorLine, { backgroundColor: card.color }]} />
        <Text style={[styles.author, { color: card.color }]}>— {card.author}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{card.title}</Text>
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
  quoteContainer: {
    backgroundColor: 'rgba(0, 150, 255, 0.05)',
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  quoteIcon: {
    fontSize: 64,
    color: colors.primaryBlue,
    opacity: 0.3,
    position: 'absolute',
    top: spacing.sm,
    left: spacing.md,
  },
  quote: {
    ...typography.h3,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  quoteIconBottom: {
    fontSize: 64,
    color: colors.primaryBlue,
    opacity: 0.3,
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.md,
    transform: [{ rotate: '180deg' }],
  },
  authorContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  authorLine: {
    width: 40,
    height: 2,
    marginBottom: spacing.sm,
  },
  author: {
    ...typography.bodySecondary,
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
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

export default QuoteCard;
