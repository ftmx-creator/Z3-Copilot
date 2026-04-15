import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/navigation/MainNavigator';
import { colors } from './src/theme/colors';
import './src/services/LocationTask';
import { useLocationTracker } from './src/hooks/useLocationTracker';
import * as Notifications from 'expo-notifications';
import { NavigationContainer, DefaultTheme, Theme, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

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

  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      if (data && data.type === 'mileage_update' && data.suggestedKms) {
        if (navigationRef.isReady()) {
          navigationRef.navigate('AddMileage' as any, { suggestedKms: data.suggestedKms });
        }
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <StatusBar style="light" />
      <MainNavigator />
    </NavigationContainer>
  );
}
