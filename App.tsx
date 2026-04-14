import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { colors } from './src/theme/colors';
import './src/services/LocationTask';
import { useLocationTracker } from './src/hooks/useLocationTracker';

const DarkTheme: Theme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    primary: colors.primary,
    border: colors.border,
    notification: colors.primary,
  },
};

export default function App() {
  // Activate real-time tracking
  useLocationTracker();

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      <MainNavigator />
    </NavigationContainer>
  );
}
