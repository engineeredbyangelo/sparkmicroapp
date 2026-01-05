import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import SparkOrb from '../components/SparkOrb';
import CardStack from '../components/CardStack';
import { StandardModuleCard, TechnicalModuleCard, PracticalModuleCard } from '../components/ModuleCard';
import learningCardsData from '../data/learningCards.json';
import learningModulesData from '../data/learningModules.json';
import { getModuleProgress, saveModuleProgress } from '../utils/progressStorage';

const DiscoverScreen = ({ navigation, route }) => {
  const [activeModule, setActiveModule] = useState(null);
  const [modulesProgress, setModulesProgress] = useState({});
  const [startCardIndex, setStartCardIndex] = useState(0);

  // Load progress for all modules
  useEffect(() => {
    loadAllProgress();
  }, []);

  // Handle navigation params (when coming from HomeScreen)
  useEffect(() => {
    if (route?.params?.moduleId && route?.params?.startIndex !== undefined) {
      const module = learningModulesData.find(m => m.id === route.params.moduleId);
      if (module) {
        setActiveModule(module);
        setStartCardIndex(route.params.startIndex);
      }
    }
  }, [route?.params]);

  const loadAllProgress = async () => {
    const progress = {};
    for (const module of learningModulesData) {
      const moduleProgress = await getModuleProgress(module.id);
      if (moduleProgress) {
        progress[module.id] = moduleProgress;
      }
    }
    setModulesProgress(progress);
  };

  const handleModulePress = async (module) => {
    const progress = await getModuleProgress(module.id);
    const startIndex = progress?.currentCardIndex || 0;
    setStartCardIndex(startIndex);
    setActiveModule(module);
  };

  const handleCardProgress = async (cardIndex) => {
    if (activeModule) {
      await saveModuleProgress(
        activeModule.id,
        cardIndex,
        activeModule.totalCards,
        cardIndex >= activeModule.totalCards - 1
      );
      await loadAllProgress();
    }
  };

  const handleModuleComplete = async () => {
    if (activeModule) {
      await saveModuleProgress(
        activeModule.id,
        activeModule.totalCards,
        activeModule.totalCards,
        true
      );
      await loadAllProgress();
    }
    setActiveModule(null);
    setStartCardIndex(0);
  };

  // Show CardStack if a module is active
  if (activeModule) {
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
        
        <CardStack 
          cards={learningCardsData}
          startIndex={startCardIndex}
          onComplete={handleModuleComplete}
          onProgressUpdate={handleCardProgress}
        />
      </SafeAreaView>
    );
  }

  // Module selection view
  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={globalStyles.gradientOverlay}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Spark Orb */}
        <View style={styles.header}>
          <View style={styles.orbHeader}>
            <SparkOrb size={80} animate={true} />
          </View>
          <Text style={styles.title}>AI Discovery Hub</Text>
          <Text style={styles.subtitle}>
            Experience intelligent micro-learning
          </Text>
        </View>

        {/* Modules Section */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Featured Modules</Text>
          
          {/* Module 1 - Standard Layout */}
          <StandardModuleCard
            module={learningModulesData[0]}
            progress={modulesProgress[learningModulesData[0].id]}
            onPress={() => handleModulePress(learningModulesData[0])}
          />

          {/* Module 2 - Technical Layout */}
          <TechnicalModuleCard
            module={learningModulesData[1]}
            progress={modulesProgress[learningModulesData[1].id]}
            onPress={() => handleModulePress(learningModulesData[1])}
          />

          {/* Module 3 - Practical Layout */}
          <PracticalModuleCard
            module={learningModulesData[2]}
            progress={modulesProgress[learningModulesData[2].id]}
            onPress={() => handleModulePress(learningModulesData[2])}
          />
        </View>

        {/* Coming Soon Section */}
        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonTitle}>More Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            New modules added weekly. Stay tuned!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  orbHeader: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modulesSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  comingSoonSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  comingSoonTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  comingSoonText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default DiscoverScreen;
