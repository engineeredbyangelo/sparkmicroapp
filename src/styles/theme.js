import { StyleSheet } from 'react-native';

export const colors = {
  // Primary colors
  background: '#000000',
  cardBackground: '#0A0A0A',
  primaryBlue: '#0096FF',
  secondaryBlue: '#0066CC',
  darkBlue: '#001F3F',
  accentCyan: '#00D9FF',
  accentPink: '#FF6B9D',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textMuted: '#666666',
  
  // Status colors
  success: '#00FF88',
  warning: '#FFD700',
  error: '#FF4757',
  
  // Gradient colors
  gradientStart: 'rgba(0, 150, 255, 0.3)',
  gradientMiddle: 'rgba(0, 100, 200, 0.15)',
  gradientEnd: 'rgba(0, 50, 100, 0.05)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.1)',
  },
  glowCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    opacity: 0.3,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  blueGlow: {
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default { colors, spacing, typography, globalStyles };
