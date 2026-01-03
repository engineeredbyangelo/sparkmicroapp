import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../../styles/theme';

const ComparisonCard = ({ card }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{card.title}</Text>
      
      <View style={styles.comparisonContainer}>
        {/* Left Side */}
        <View style={styles.side}>
          <View style={[styles.sideHeader, { backgroundColor: colors.error + '20' }]}>
            <Text style={styles.sideTitle}>{card.leftSide.title}</Text>
          </View>
          <View style={styles.pointsList}>
            {card.leftSide.points.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <Text style={styles.pointIcon}>✕</Text>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <LinearGradient
            colors={[colors.primaryBlue + '00', colors.primaryBlue, colors.primaryBlue + '00']}
            style={styles.dividerLine}
          />
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>
        </View>

        {/* Right Side */}
        <View style={styles.side}>
          <View style={[styles.sideHeader, { backgroundColor: colors.success + '20' }]}>
            <Text style={styles.sideTitle}>{card.rightSide.title}</Text>
          </View>
          <View style={styles.pointsList}>
            {card.rightSide.points.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <Text style={styles.pointIcon}>✓</Text>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.metaRow}>
          <Text style={styles.difficulty}>{card.difficulty}</Text>
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
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  comparisonContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: spacing.md,
  },
  side: {
    flex: 1,
  },
  sideHeader: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sideTitle: {
    ...typography.h4,
    textAlign: 'center',
  },
  pointsList: {
    gap: spacing.md,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  pointIcon: {
    fontSize: 16,
    marginTop: 4,
  },
  pointText: {
    ...typography.body,
    flex: 1,
  },
  divider: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLine: {
    width: 2,
    height: '100%',
    position: 'absolute',
  },
  vsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.cardBackground,
  },
  vsText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
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
  },
  difficulty: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  readTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default ComparisonCard;
