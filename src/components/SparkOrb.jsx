import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SparkOrb = ({ size = 60, animate = true }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animate]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer glow effect */}
      <Animated.View
        style={[
          styles.outerGlow,
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: (size * 1.5) / 2,
            opacity: glowOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(0, 150, 255, 0.3)', 'rgba(0, 100, 200, 0.1)', 'transparent']}
          style={[styles.gradient, { borderRadius: (size * 1.5) / 2 }]}
        />
      </Animated.View>

      {/* Main orb */}
      <Animated.View
        style={[
          styles.orb,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={['#0096FF', '#0066CC', '#001F3F', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { borderRadius: size / 2 }]}
        >
          {/* Inner bright core */}
          <View style={[styles.core, { width: size * 0.3, height: size * 0.3, borderRadius: (size * 0.3) / 2 }]}>
            <LinearGradient
              colors={['rgba(100, 200, 255, 0.9)', 'rgba(0, 150, 255, 0.5)']}
              style={[styles.gradient, { borderRadius: (size * 0.3) / 2 }]}
            />
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Inner shadow/depth */}
      <View style={[styles.shadow, { width: size, height: size, borderRadius: size / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerGlow: {
    position: 'absolute',
  },
  orb: {
    shadowColor: '#0096FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  core: {
    position: 'absolute',
    top: '20%',
    left: '25%',
  },
  shadow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default SparkOrb;
