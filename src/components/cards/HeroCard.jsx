import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../../styles/theme';

const HeroCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[card.color + '40', card.color + '10', 'transparent']}
        style={styles.gradient}
      />
      
      <View style={styles.header}>
        <Text style={styles.icon}>{card.icon}</Text>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: card.color + '30' }]}>
            <Text style={styles.badgeText}>{card.difficulty}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱ {card.readTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>{card.subtitle}</Text>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.content}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.category}>{card.category}</Text>
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
    height: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: 64,
  },
  badges: {
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 150, 255, 0.2)',
  },
  badgeText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    ...typography.bodySecondary,
    color: colors.accentCyan,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footer: {
    marginTop: spacing.xl,
  },
  category: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default HeroCard;
