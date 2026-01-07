import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import SparkOrb from '../components/SparkOrb';
import CardStack from '../components/CardStack';
import { StandardModuleCard, TechnicalModuleCard, PracticalModuleCard } from '../components/ModuleCard';
import neuralNetworksCards from '../data/learningCards.json';
import quantumCards from '../data/quantumCards.json';
import reactNativeCards from '../data/reactNativeCards.json';
import pythonCards from '../data/pythonCards.json';
import uiDesignCards from '../data/uiDesignCards.json';
import learningModulesData from '../data/learningModules.json';
import { getModuleProgress, saveModuleProgress } from '../utils/progressStorage';

// Map module IDs to their card data
const MODULE_CARDS = {
  'neural-networks-101': neuralNetworksCards,
  'quantum-computing-basics': quantumCards,
  'react-native-fundamentals': reactNativeCards,
  'python-essentials': pythonCards,
  'ui-design-principles': uiDesignCards,
};

// Configuration constants
const MAX_MODULES_DISPLAYED = 5;
const MAX_MINUTES_QUICK_LEARN = 5;

// Filter and limit modules for Quick Learn section
const getQuickLearnModules = (modules) => {
  return modules
    .filter(m => m.quickLearn && m.estimatedMinutes <= MAX_MINUTES_QUICK_LEARN)
    .slice(0, MAX_MODULES_DISPLAYED);
};

// Get card layout component based on module index (cycles through 3 layouts)
const getModuleCardComponent = (index) => {
  const layouts = [StandardModuleCard, TechnicalModuleCard, PracticalModuleCard];
  return layouts[index % layouts.length];
};

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
    const moduleCards = MODULE_CARDS[activeModule.id] || neuralNetworksCards;
    
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
          cards={moduleCards}
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Learn</Text>
            <View style={styles.badgeContainer}>
              <Ionicons name="flash" size={14} color="#FFD700" />
              <Text style={styles.badgeText}>≤5 min each</Text>
            </View>
          </View>
          
          {/* Dynamic Module Rendering */}
          {getQuickLearnModules(learningModulesData).map((module, index) => {
            const ModuleCardComponent = getModuleCardComponent(index);
            return (
              <ModuleCardComponent
                key={module.id}
                module={module}
                progress={modulesProgress[module.id]}
                onPress={() => handleModulePress(module)}
              />
            );
          })}
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
    color: '#FFFFFF',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    ...typography.caption,
    color: '#FFD700',
    fontWeight: '600',
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
