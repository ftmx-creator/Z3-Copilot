import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useVehicleStore } from '../store/useVehicleStore';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useGPSSimulation = () => {
  const profile = useVehicleStore((state) => state.profile);

  const simulateDriveAlert = async (suggestedKms: number) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Trajet terminé 🚘",
        body: `Vous avez parcouru environ ${suggestedKms} km. Mettre à jour votre compteur ?`,
        data: { type: 'mileage_update', suggestedKms },
      },
      trigger: null,
    });
  };

  const simulateGasStationAlert = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Station service à proximité ⛽",
        body: "Une station TotalEnergies a été détectée. Ajouter un plein ?",
        data: { type: 'fuel_add' },
      },
      trigger: null,
    });
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
      }
    };
    requestPermissions();

    // Simulation de trajet : 
    // PHASE 1 : Détection de mouvement (> 15km/h) - Simulée à 10s après le start
    // PHASE 2 : Détection d'arrêt (< 15km/h) - Simulée à +20s après mouvement
    // PHASE 3 : Notification après 20s d'immobilisation (simulé ici pour les tests)
    
    const driveDetectionTimer = setTimeout(() => {
      console.log('GPS: Mouvement détecté (V > 15km/h)');
      
      const stopDetectionTimer = setTimeout(() => {
        console.log('GPS: Véhicule arrêté (V < 15km/h)');
        
        const notifyTimer = setTimeout(() => {
          simulateDriveAlert(18); // On suggère +18 km pour le test
        }, 15000); // Wait 15s after stop to notify

      }, 10000); // DRIVE duration 10s

    }, 5000); // START driving after 5s

    // Simulation de station : déclenchée à part
    const gasTimer = setTimeout(() => {
      simulateGasStationAlert();
    }, 55000); 

    return () => {
      clearTimeout(driveDetectionTimer);
      clearTimeout(gasTimer);
    };
  }, []);

  return { simulateDriveAlert, simulateGasStationAlert };
};
