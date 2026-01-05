import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = '@spark_learning_queue';
const MAX_QUEUE_SIZE = 15;

/**
 * Get the current learning queue
 * @returns {Promise<Array>} Array of queue items with topicId, title, timestamp
 */
export const getQueue = async () => {
  try {
    const queueData = await AsyncStorage.getItem(QUEUE_KEY);
    return queueData ? JSON.parse(queueData) : [];
  } catch (error) {
    console.error('Error getting queue:', error);
    return [];
  }
};

/**
 * Add a topic to the learning queue
 * @param {Object} topic - Topic object with id, title, icon, etc.
 * @returns {Promise<Object>} Result object with success status and message
 */
export const addToQueue = async (topic) => {
  try {
    const queue = await getQueue();
    
    // Check if already in queue
    const existingIndex = queue.findIndex(item => item.topicId === topic.id);
    if (existingIndex !== -1) {
      return { 
        success: false, 
        message: 'Already in queue',
        code: 'ALREADY_EXISTS'
      };
    }
    
    // Check queue size limit
    if (queue.length >= MAX_QUEUE_SIZE) {
      return { 
        success: false, 
        message: `Queue is full (max ${MAX_QUEUE_SIZE} topics)`,
        code: 'QUEUE_FULL'
      };
    }
    
    // Add to queue with timestamp
    const queueItem = {
      topicId: topic.id,
      title: topic.title,
      icon: topic.icon,
      color: topic.color,
      articlesCount: topic.articlesCount,
      addedAt: new Date().toISOString(),
    };
    
    queue.push(queueItem);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    
    return { 
      success: true, 
      message: 'Added to queue',
      queueSize: queue.length,
      isNearLimit: queue.length >= 12
    };
  } catch (error) {
    console.error('Error adding to queue:', error);
    return { 
      success: false, 
      message: 'Failed to add to queue',
      code: 'ERROR'
    };
  }
};

/**
 * Remove a topic from the learning queue
 * @param {string} topicId - ID of the topic to remove
 * @returns {Promise<boolean>} Success status
 */
export const removeFromQueue = async (topicId) => {
  try {
    const queue = await getQueue();
    const filteredQueue = queue.filter(item => item.topicId !== topicId);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(filteredQueue));
    return true;
  } catch (error) {
    console.error('Error removing from queue:', error);
    return false;
  }
};

/**
 * Check if a topic is in the queue
 * @param {string} topicId - ID of the topic to check
 * @returns {Promise<boolean>} Whether topic is in queue
 */
export const isInQueue = async (topicId) => {
  try {
    const queue = await getQueue();
    return queue.some(item => item.topicId === topicId);
  } catch (error) {
    console.error('Error checking queue:', error);
    return false;
  }
};

/**
 * Get queue size and status
 * @returns {Promise<Object>} Queue size, isNearLimit, isFull
 */
export const getQueueStatus = async () => {
  try {
    const queue = await getQueue();
    return {
      size: queue.length,
      isNearLimit: queue.length >= 12,
      isFull: queue.length >= MAX_QUEUE_SIZE,
      remaining: MAX_QUEUE_SIZE - queue.length,
    };
  } catch (error) {
    console.error('Error getting queue status:', error);
    return {
      size: 0,
      isNearLimit: false,
      isFull: false,
      remaining: MAX_QUEUE_SIZE,
    };
  }
};

/**
 * Clear entire queue
 * @returns {Promise<boolean>} Success status
 */
export const clearQueue = async () => {
  try {
    await AsyncStorage.removeItem(QUEUE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing queue:', error);
    return false;
  }
};
