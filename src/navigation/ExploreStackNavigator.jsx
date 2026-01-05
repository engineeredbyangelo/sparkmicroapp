import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import TopicDetailScreen from '../screens/TopicDetailScreen';
import theme from '../styles/theme';

const Stack = createStackNavigator();

export default function ExploreStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontFamily: theme.fonts.heading,
          fontSize: 18,
          letterSpacing: 1.5,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="ExploreMain" 
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TopicDetail" 
        component={TopicDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.topicTitle || 'Topic Details',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}
