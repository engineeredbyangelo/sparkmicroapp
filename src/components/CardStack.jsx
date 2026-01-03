import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Text,
} from 'react-native';
import { colors, spacing, typography, animations } from '../styles/theme';
import LearningCard from './LearningCard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = animations.swipeThreshold;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.75;

const CardStack = ({ cards, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        
        // Rotate card based on horizontal movement
        const rotateValue = gesture.dx / SCREEN_WIDTH;
        rotation.setValue(rotateValue);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe right - Next card
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe left - Previous card
          if (currentIndex > 0) {
            forceSwipe('left');
          } else {
            resetPosition();
          }
        } else {
          // Reset to center
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    
    Animated.parallel([
      Animated.spring(position.x, {
        toValue: x,
        useNativeDriver: false,
        speed: 20,
        bounciness: 0,
      }),
      Animated.spring(rotation, {
        toValue: direction === 'right' ? 1 : -1,
        useNativeDriver: false,
      }),
    ]).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    position.setValue({ x: 0, y: 0 });
    rotation.setValue(0);

    if (direction === 'right') {
      // Move to next card
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete && onComplete();
      }
    } else if (direction === 'left') {
      // Move to previous card
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        friction: 5,
      }),
      Animated.spring(rotation, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const getCardStyle = (index) => {
    const isCurrentCard = index === currentIndex;
    
    if (isCurrentCard) {
      const rotate = rotation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-30deg', '0deg', '30deg'],
      });

      return {
        ...styles.card,
        transform: [
          ...position.getTranslateTransform(),
          { rotate },
        ],
        zIndex: 10,
      };
    }

    // Cards in the back
    const offset = index - currentIndex;
    if (offset > 0 && offset <= 2) {
      return {
        ...styles.card,
        transform: [
          { scale: 1 - offset * 0.05 },
          { translateY: offset * 10 },
        ],
        opacity: 1 - offset * 0.3,
        zIndex: 10 - offset,
      };
    }

    return {
      ...styles.card,
      opacity: 0,
      zIndex: 0,
    };
  };

  const renderSwipeIndicators = () => {
    const x = position.x;
    
    const leftOpacity = x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const rightOpacity = x.interpolate({
      inputRange: [0, SCREEN_WIDTH / 2],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <>
        {currentIndex > 0 && (
          <Animated.View style={[styles.swipeIndicator, styles.leftIndicator, { opacity: leftOpacity }]}>
            <Text style={styles.indicatorText}>← PREVIOUS</Text>
          </Animated.View>
        )}
        <Animated.View style={[styles.swipeIndicator, styles.rightIndicator, { opacity: rightOpacity }]}>
          <Text style={styles.indicatorText}>NEXT →</Text>
        </Animated.View>
      </>
    );
  };

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No cards available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / cards.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {cards.length}
        </Text>
      </View>

      {/* Card Stack */}
      <View style={styles.cardContainer}>
        {cards.map((card, index) => {
          if (index < currentIndex - 1 || index > currentIndex + 2) {
            return null;
          }

          const isCurrentCard = index === currentIndex;

          return (
            <Animated.View
              key={card.id}
              style={getCardStyle(index)}
              {...(isCurrentCard ? panResponder.panHandlers : {})}
            >
              <LearningCard card={card} />
            </Animated.View>
          );
        })}

        {/* Swipe Indicators */}
        {renderSwipeIndicators()}
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          ← Swipe to navigate →
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0, 150, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primaryBlue,
    borderRadius: 4,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - spacing.xl * 2,
    height: CARD_HEIGHT,
  },
  swipeIndicator: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.primaryBlue + '20',
    borderWidth: 2,
    borderColor: colors.primaryBlue,
  },
  leftIndicator: {
    left: spacing.xl,
  },
  rightIndicator: {
    right: spacing.xl,
  },
  indicatorText: {
    ...typography.caption,
    color: colors.primaryBlue,
    fontWeight: '700',
    letterSpacing: 1,
  },
  instructions: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  instructionText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});

export default CardStack;
