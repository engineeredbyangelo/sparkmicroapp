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

import userProgressData from '../data/userProgress.json';

const ProfileScreen = () => {
  const xpProgress = (userProgressData.experiencePoints / userProgressData.nextLevelXP) * 100;

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[colors.primaryBlue, colors.accentCyan]}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>
                {userProgressData.userName.split(' ').map(n => n[0]).join('')}
              </Text>
            </LinearGradient>
          </View>
          <Text style={styles.userName}>{userProgressData.userName}</Text>
          <Text style={styles.userEmail}>{userProgressData.userEmail}</Text>
          
          {/* Level Badge */}
          <View style={[globalStyles.card, styles.levelBadge]}>
            <Text style={styles.levelText}>Level {userProgressData.level}</Text>
            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>
                {userProgressData.experiencePoints} / {userProgressData.nextLevelXP} XP
              </Text>
            </View>
            <View style={styles.xpBarContainer}>
              <LinearGradient
                colors={[colors.primaryBlue, colors.accentCyan]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.xpBarFill, { width: `${xpProgress}%` }]}
              />
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={[globalStyles.card, styles.statCard]}>
              <Text style={styles.statNumber}>{userProgressData.totalUnitsCompleted}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={[globalStyles.card, styles.statCard]}>
              <Text style={styles.statNumber}>{userProgressData.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={[globalStyles.card, styles.statCard]}>
              <Text style={styles.statNumber}>{userProgressData.totalTimeSpent}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={[globalStyles.card, styles.statCard]}>
              <Text style={styles.statNumber}>{userProgressData.longestStreak}</Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.badgesContainer}>
            {userProgressData.badges.map(badge => (
              <View key={badge.id} style={[globalStyles.glowCard, styles.badgeCard]}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                <Text style={styles.badgeDate}>
                  Earned {new Date(badge.earnedDate).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={[globalStyles.card, styles.weeklyCard]}>
            <View style={styles.weeklyRow}>
              <View style={styles.weeklyItem}>
                <Text style={styles.weeklyNumber}>{userProgressData.weeklyStats.lessonsCompleted}</Text>
                <Text style={styles.weeklyLabel}>Lessons</Text>
              </View>
              <View style={styles.weeklyDivider} />
              <View style={styles.weeklyItem}>
                <Text style={styles.weeklyNumber}>{userProgressData.weeklyStats.timeSpent}</Text>
                <Text style={styles.weeklyLabel}>Minutes</Text>
              </View>
              <View style={styles.weeklyDivider} />
              <View style={styles.weeklyItem}>
                <Text style={styles.weeklyNumber}>{userProgressData.weeklyStats.daysActive}</Text>
                <Text style={styles.weeklyLabel}>Days Active</Text>
              </View>
            </View>
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
    padding: spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...globalStyles.blueGlow,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  userName: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.bodySecondary,
    marginBottom: spacing.lg,
  },
  levelBadge: {
    width: '100%',
    padding: spacing.lg,
    alignItems: 'center',
  },
  levelText: {
    ...typography.h3,
    color: colors.primaryBlue,
    marginBottom: spacing.sm,
  },
  xpContainer: {
    marginBottom: spacing.sm,
  },
  xpText: {
    ...typography.bodySecondary,
  },
  xpBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  section: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '100%',
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  badgeName: {
    ...typography.h3,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  badgeDescription: {
    ...typography.bodySecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  badgeDate: {
    ...typography.caption,
    color: colors.accentCyan,
  },
  weeklyCard: {
    padding: spacing.lg,
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weeklyItem: {
    alignItems: 'center',
  },
  weeklyNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accentCyan,
    marginBottom: spacing.xs,
  },
  weeklyLabel: {
    ...typography.caption,
  },
  weeklyDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.primaryBlue,
    opacity: 0.3,
  },
});

export default ProfileScreen;
