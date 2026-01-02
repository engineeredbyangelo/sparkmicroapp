import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../styles/theme';
import SparkOrb from './SparkOrb';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const getIcon = (routeName) => {
    switch (routeName) {
      case 'Home':
        return '🏠';
      case 'Explore':
        return '🔍';
      case 'Discover':
        return '✨'; // Spark Orb will replace this
      case 'Profile':
        return '👤';
      case 'Settings':
        return '⚙️';
      default:
        return '●';
    }
  };

  const getLabel = (routeName) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Explore':
        return 'Explore';
      case 'Discover':
        return 'Discover';
      case 'Profile':
        return 'Profile';
      case 'Settings':
        return 'Settings';
      default:
        return routeName;
    }
  };

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarContent}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isDiscover = route.name === 'Discover';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Render Discover button with Spark orb (center position)
          if (isDiscover) {
            return (
              <View key={route.key} style={styles.orbContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={styles.orbButton}
                >
                  <SparkOrb size={56} animate={true} />
                </TouchableOpacity>
              </View>
            );
          }

          // Render regular tab buttons
          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.tabButton}
            >
              <Text style={[styles.icon, isFocused && styles.iconFocused]}>
                {getIcon(route.name)}
              </Text>
              <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {getLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 150, 255, 0.2)',
    paddingBottom: spacing.lg,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  labelFocused: {
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  orbContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: -spacing.lg,
  },
  orbButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.cardBackground,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default CustomTabBar;
