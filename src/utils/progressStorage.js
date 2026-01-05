import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = '@spark_learning_progress';

/**
 * Progress Storage Utility
 * Manages learning progress persistence using AsyncStorage
 */

/**
 * Get all learning progress
 * @returns {Promise<Object>} Progress object with moduleId as keys
 */
export const getAllProgress = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROGRESS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
};

/**
 * Get progress for a specific module
 * @param {string} moduleId - The module identifier
 * @returns {Promise<Object|null>} Progress object or null
 */
export const getModuleProgress = async (moduleId) => {
  try {
    const allProgress = await getAllProgress();
    return allProgress[moduleId] || null;
  } catch (error) {
    console.error('Error loading module progress:', error);
    return null;
  }
};

/**
 * Save progress for a module
 * @param {string} moduleId - The module identifier
 * @param {number} currentCardIndex - Current card position (0-based)
 * @param {number} totalCards - Total cards in module
 * @param {boolean} completed - Whether module is completed
 * @returns {Promise<boolean>} Success status
 */
export const saveModuleProgress = async (
  moduleId,
  currentCardIndex,
  totalCards,
  completed = false
) => {
  try {
    const allProgress = await getAllProgress();
    
    allProgress[moduleId] = {
      currentCardIndex,
      totalCards,
      completed,
      lastAccessed: new Date().toISOString(),
      progressPercentage: Math.round((currentCardIndex / totalCards) * 100)
    };
    
    const jsonValue = JSON.stringify(allProgress);
    await AsyncStorage.setItem(PROGRESS_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
};

/**
 * Mark a module as completed
 * @param {string} moduleId - The module identifier
 * @param {number} totalCards - Total cards in module
 * @returns {Promise<boolean>} Success status
 */
export const completeModule = async (moduleId, totalCards) => {
  return await saveModuleProgress(moduleId, totalCards, totalCards, true);
};

/**
 * Reset progress for a specific module
 * @param {string} moduleId - The module identifier
 * @returns {Promise<boolean>} Success status
 */
export const resetModuleProgress = async (moduleId) => {
  try {
    const allProgress = await getAllProgress();
    delete allProgress[moduleId];
    
    const jsonValue = JSON.stringify(allProgress);
    await AsyncStorage.setItem(PROGRESS_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error resetting progress:', error);
    return false;
  }
};

/**
 * Clear all progress data
 * @returns {Promise<boolean>} Success status
 */
export const clearAllProgress = async () => {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing progress:', error);
    return false;
  }
};

/**
 * Get in-progress modules
 * @returns {Promise<Array>} Array of module IDs with progress > 0 and not completed
 */
export const getInProgressModules = async () => {
  try {
    const allProgress = await getAllProgress();
    return Object.keys(allProgress).filter(
      moduleId => 
        allProgress[moduleId].progressPercentage > 0 && 
        !allProgress[moduleId].completed
    );
  } catch (error) {
    console.error('Error getting in-progress modules:', error);
    return [];
  }
};

/**
 * Get completed modules
 * @returns {Promise<Array>} Array of completed module IDs
 */
export const getCompletedModules = async () => {
  try {
    const allProgress = await getAllProgress();
    return Object.keys(allProgress).filter(
      moduleId => allProgress[moduleId].completed
    );
  } catch (error) {
    console.error('Error getting completed modules:', error);
    return [];
  }
};
