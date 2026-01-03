import { StyleSheet } from 'react-native';

export const fonts = {
  heading: 'Orbitron-Bold',
  headingMedium: 'Orbitron-Medium',
  body: 'Inter-Regular',
  bodySemiBold: 'Inter-SemiBold',
  bodyBold: 'Inter-Bold',
  mono: 'SpaceMono-Regular',
};

export const colors = {
  // Primary colors
  background: '#000000',
  cardBackground: '#0A0A0A',
  primaryBlue: '#0096FF',
  secondaryBlue: '#0066CC',
  darkBlue: '#001F3F',
  accentCyan: '#00D9FF',
  accentPink: '#FF6B9D',
  accentPurple: '#BD00FF',
  accentYellow: '#FFD700',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textMuted: '#666666',
  
  // Status colors
  success: '#00FF88',
  warning: '#FFD700',
  error: '#FF4757',
  
  // Enhanced gradient colors (7 stops for smooth transitions)
  gradientStart: 'rgba(0, 150, 255, 0.4)',
  gradientStep1: 'rgba(0, 130, 220, 0.3)',
  gradientStep2: 'rgba(0, 110, 190, 0.2)',
  gradientMiddle: 'rgba(0, 100, 200, 0.15)',
  gradientStep3: 'rgba(0, 70, 150, 0.1)',
  gradientStep4: 'rgba(0, 50, 100, 0.07)',
  gradientEnd: 'rgba(0, 30, 70, 0.03)',
};

export const animations = {
  // Duration
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
  
  // Easing curves
  easeOut: [0.25, 0.1, 0.25, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  spring: [0.68, -0.55, 0.265, 1.55],
  
  // Common animation values
  swipeThreshold: 120,
  rotationLimit: 30,
  scaleDown: 0.95,
  scaleUp: 1.05,
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
    fontFamily: fonts.heading,
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 1.2,
    lineHeight: 40,
    textTransform: 'uppercase',
  },
  h2: {
    fontFamily: fonts.headingMedium,
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.8,
    lineHeight: 32,
  },
  h3: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.4,
    lineHeight: 28,
  },
  h4: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    lineHeight: 26,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  bodySecondary: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
    letterSpacing: 0.4,
    lineHeight: 18,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 14,
    fontWeight: '400',
    color: colors.accentCyan,
    letterSpacing: 0,
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

export default { fonts, colors, spacing, typography, animations, globalStyles };
