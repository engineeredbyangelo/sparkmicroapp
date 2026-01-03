import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, globalStyles } from '../styles/theme';
import CardStack from '../components/CardStack';
import learningCardsData from '../data/learningCards.json';

const LearnScreen = ({ navigation }) => {
  const handleComplete = () => {
    // Navigate back or show completion message
    navigation.goBack();
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[
          colors.gradientStart,
          colors.gradientStep1,
          colors.gradientStep2,
          colors.gradientMiddle,
          colors.gradientStep3,
          colors.gradientStep4,
          colors.gradientEnd,
        ]}
        style={globalStyles.gradientOverlay}
      />
      
      <CardStack cards={learningCardsData} onComplete={handleComplete} />
    </SafeAreaView>
  );
};

export default LearnScreen;
