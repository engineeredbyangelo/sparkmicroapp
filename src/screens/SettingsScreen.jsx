import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, globalStyles } from '../styles/theme';

const SettingsScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        { label: 'Dark Mode', value: darkMode, onValueChange: setDarkMode },
        { label: 'Push Notifications', value: notifications, onValueChange: setNotifications },
        { label: 'Auto-play Videos', value: autoPlay, onValueChange: setAutoPlay },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', action: true },
        { label: 'Change Password', action: true },
        { label: 'Privacy Settings', action: true },
      ],
    },
    {
      title: 'Learning',
      items: [
        { label: 'Daily Goal', action: true },
        { label: 'Difficulty Level', action: true },
        { label: 'Learning Reminders', action: true },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'Help & Support', action: true },
        { label: 'Terms of Service', action: true },
        { label: 'Privacy Policy', action: true },
        { label: 'App Version 1.0.0', action: false },
      ],
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your learning experience</Text>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={[globalStyles.card, styles.settingsCard]}>
              {section.items.map((item, itemIdx) => (
                <View key={itemIdx}>
                  <TouchableOpacity
                    style={styles.settingItem}
                    activeOpacity={item.action ? 0.7 : 1}
                    disabled={!item.action}
                  >
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.value !== undefined ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: colors.textMuted, true: colors.primaryBlue }}
                        thumbColor={item.value ? colors.accentCyan : colors.textSecondary}
                      />
                    ) : item.action ? (
                      <Text style={styles.arrow}>→</Text>
                    ) : (
                      <Text style={styles.versionText}>{item.label.includes('1.0.0') ? '' : ''}</Text>
                    )}
                  </TouchableOpacity>
                  {itemIdx < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.error + '30', colors.error + '10']}
              style={[globalStyles.card, styles.logoutButton]}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.bodySecondary,
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.textSecondary,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  settingLabel: {
    ...typography.body,
  },
  arrow: {
    ...typography.body,
    color: colors.primaryBlue,
  },
  versionText: {
    ...typography.bodySecondary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 150, 255, 0.1)',
    marginHorizontal: spacing.lg,
  },
  logoutButton: {
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
});

export default SettingsScreen;
