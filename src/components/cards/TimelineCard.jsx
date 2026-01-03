import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const TimelineCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{card.title}</Text>
      
      <View style={styles.timeline}>
        {card.events.map((event, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.yearContainer}>
              <Text style={[styles.year, { color: card.color }]}>{event.year}</Text>
            </View>
            
            <View style={styles.connector}>
              <View style={[styles.dot, { backgroundColor: card.color }]} />
              {index < card.events.length - 1 && (
                <View style={[styles.line, { backgroundColor: card.color + '40' }]} />
              )}
            </View>
            
            <View style={styles.eventContainer}>
              <View style={[styles.eventBubble, { borderColor: card.color }]}>
                <Text style={styles.eventText}>{event.event}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: card.color + '20' }]}>
            <Text style={styles.badgeText}>{card.difficulty}</Text>
          </View>
          <Text style={styles.readTime}>⏱ {card.readTime}</Text>
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
  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
  },
  timeline: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  yearContainer: {
    width: 70,
    alignItems: 'flex-end',
    paddingRight: spacing.md,
    paddingTop: spacing.xs,
  },
  year: {
    ...typography.h4,
    fontWeight: '700',
  },
  connector: {
    width: 30,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 40,
  },
  eventContainer: {
    flex: 1,
    paddingLeft: spacing.md,
  },
  eventBubble: {
    backgroundColor: 'rgba(0, 150, 255, 0.05)',
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 3,
  },
  eventText: {
    ...typography.body,
  },
  footer: {
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 150, 255, 0.1)',
    paddingTop: spacing.md,
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

export default TimelineCard;
