import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const QuizCard = ({ card }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === card.correctAnswer;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{card.title}</Text>
        <View style={[styles.badge, { backgroundColor: card.color + '20' }]}>
          <Text style={styles.badgeText}>Quiz</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{card.question}</Text>

        <View style={styles.options}>
          {card.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === card.correctAnswer;
            
            let optionStyle = styles.option;
            if (showExplanation) {
              if (isCorrectOption) {
                optionStyle = [styles.option, styles.correctOption];
              } else if (isSelected && !isCorrectOption) {
                optionStyle = [styles.option, styles.wrongOption];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
                activeOpacity={0.7}
              >
                <View style={styles.optionIndicator}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={styles.optionText}>{option}</Text>
                {showExplanation && isCorrectOption && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <Text style={styles.crossmark}>✕</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View style={[
            styles.explanation,
            { backgroundColor: isCorrect ? colors.success + '10' : colors.warning + '10' }
          ]}>
            <Text style={[
              styles.resultText,
              { color: isCorrect ? colors.success : colors.warning }
            ]}>
              {isCorrect ? '🎉 Correct!' : '💡 Not quite'}
            </Text>
            <Text style={styles.explanationText}>{card.explanation}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.readTime}>⏱ {card.readTime}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    flex: 1,
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
  content: {
    flex: 1,
  },
  question: {
    ...typography.h4,
    marginBottom: spacing.xl,
    color: colors.textPrimary,
  },
  options: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 150, 255, 0.05)',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.1)',
  },
  correctOption: {
    backgroundColor: colors.success + '10',
    borderColor: colors.success,
  },
  wrongOption: {
    backgroundColor: colors.error + '10',
    borderColor: colors.error,
  },
  optionIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryBlue + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionLetter: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.primaryBlue,
  },
  optionText: {
    ...typography.body,
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: colors.success,
  },
  crossmark: {
    fontSize: 24,
    color: colors.error,
  },
  explanation: {
    borderRadius: 16,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryBlue,
  },
  resultText: {
    ...typography.h4,
    marginBottom: spacing.sm,
  },
  explanationText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footer: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  readTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default QuizCard;
