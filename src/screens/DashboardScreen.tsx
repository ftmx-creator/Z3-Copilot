import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useVehicleStore } from '../store/useVehicleStore';
import { colors, spacing, typography } from '../theme/colors';
import { GlassCard } from '../components/common/GlassCard';
import { MaintenanceGauge } from '../components/common/MaintenanceGauge';
import { Car, Fuel, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MAINTENANCE_SCHEMA } from '../utils/maintenanceSchema';

import * as Notifications from 'expo-notifications';
import { MileageModal } from '../components/common/MileageModal';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const profile = useVehicleStore((state) => state.profile);
  const expenses = useVehicleStore((state) => state.expenses);
  const getTCO = useVehicleStore((state) => state.getTCO);

  const [mileageModalVisible, setMileageModalVisible] = React.useState(false);
  const [suggestedKms, setSuggestedKms] = React.useState(0);

  React.useEffect(() => {
    // Écouteur pour les clics sur les notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      
      if (data.type === 'mileage_update') {
        setSuggestedKms(data.suggestedKms || 0);
        setMileageModalVisible(true);
      }
    });

    return () => subscription.remove();
  }, []);

  if (!profile) return null;

  const currentMileage = profile.mileage;

  // Calcul de la jauge Oil Service (Indépendante)
  const oilSchema = MAINTENANCE_SCHEMA.find(m => m.id === 'oil')!;
  const lastOilExpense = expenses.find(e => e.label.toLowerCase().includes('oil') || e.label.toLowerCase().includes('vidange'));
  const oilStartMileage = lastOilExpense ? (expenses.indexOf(lastOilExpense) > -1 ? 0 : 0) : 0; // Simplifié pour démo, à affiner avec de vraies données
  const oilProgress = (currentMileage % oilSchema.intervalKm);

  // Calcul de la jauge Entretien Consolidée (Pneus, Freins, etc.)
  const maintenanceItems = MAINTENANCE_SCHEMA.filter(m => m.id !== 'oil');
  
  const maintenanceStatus = maintenanceItems.map(item => {
    const initialWear = profile.initialWearKm?.[item.id] || 0;
    // On considère que l'usure initiale s'ajoute au kilométrage de départ "virtuel"
    const effectiveMileage = currentMileage + initialWear;
    const progress = (effectiveMileage % item.intervalKm);
    const percentage = (progress / item.intervalKm) * 100;
    
    return {
      ...item,
      progress,
      percentage,
      remaining: item.intervalKm - progress
    };
  });

  // On prend l'item le plus "urgent" (pourcentage le plus élevé)
  const mostUrgent = maintenanceStatus.sort((a, b) => b.percentage - a.percentage)[0];

  const isHealthy = oilProgress < (oilSchema.intervalKm * 0.8) && mostUrgent.percentage < 80;

  const navigateToHistory = () => {
    navigation.navigate('History');
  };

  const navigateToStats = () => {
    navigation.navigate('Stats');
  };

  // Calcul de la consommation entre deux pleins
  const fuelExpenses = expenses
    .filter(e => e.category === 'fuel' && e.liters && e.mileage)
    .sort((a, b) => (b.mileage || 0) - (a.mileage || 0));

  const consumption = useMemo(() => {
    if (fuelExpenses.length >= 2) {
      const last = fuelExpenses[0];
      const prev = fuelExpenses[1];
      const distance = (last.mileage || 0) - (prev.mileage || 0);
      const ltrs = last.liters || 0;
      
      if (distance > 0 && ltrs > 0) {
        return ((ltrs / distance) * 100).toFixed(1);
      }
    }
    return null;
  }, [fuelExpenses]);

  const StatItem = ({ label, value, subValue, icon: Icon, color }: any) => (
    <View style={styles.statItem}>
      <Icon size={20} color={color || colors.textSecondary} />
      <View style={styles.statContent}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text style={styles.statValue}>{value}</Text>
          {subValue && <Text style={{ fontSize: 10, color: colors.textMuted }}>• {subValue}</Text>}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Image 
            source={require('../../assets/z3_hero.png')} 
            style={styles.heroImage}
            resizeMode="contain"
          />
          <View style={styles.badgeContainer}>
            <Text style={styles.chromeBadge}>Z3</Text>
          </View>
        </View>

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour, Passionné</Text>
            <Text style={styles.modelName}>{profile.model} {profile.year}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: isHealthy ? colors.success + '20' : colors.warning + '20' }]}>
            {isHealthy ? <CheckCircle2 size={16} color={colors.success} /> : <AlertTriangle size={16} color={colors.warning} />}
            <Text style={[styles.statusText, { color: isHealthy ? colors.success : colors.warning }]}>
              {isHealthy ? 'Optimal' : 'Entretien'}
            </Text>
          </View>
        </View>

        <GlassCard style={styles.mainCard} variant="glass">
          <View style={styles.mileageSection}>
            <Text style={styles.mileageLabel}>Kilométrage Actuel</Text>
            <Text style={styles.mileageValue}>{currentMileage.toLocaleString()} km</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.gaugesRow}>
            <MaintenanceGauge 
              label="Oil Service" 
              currentValue={oilProgress} 
              maxValue={oilSchema.intervalKm}
              size={110}
            />
            <MaintenanceGauge 
              label={`Prochain : ${mostUrgent.label}`} 
              currentValue={mostUrgent.progress} 
              maxValue={mostUrgent.intervalKm}
              size={110}
              onPress={navigateToHistory}
            />
          </View>
        </GlassCard>

        <View style={styles.statsRow}>
          <GlassCard style={styles.halfCard}>
            <StatItem 
              label="Carburant" 
              value={`${expenses.filter(e => e.category === 'fuel').length} Pleins`} 
              subValue={consumption ? `${consumption} l/100km` : undefined}
              icon={Fuel} 
              color={colors.secondary}
            />
          </GlassCard>
          <GlassCard style={styles.halfCard}>
            <StatItem 
              label="Assurance" 
              value={`${profile.insuranceCost.toLocaleString()} € / an`} 
              icon={Shield} 
              color={colors.success}
            />
          </GlassCard>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.tcoCardContainer} onPress={navigateToStats}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tcoCard}
          >
            <View>
              <Text style={styles.tcoLabel}>Coût de Revient Total (TCO)</Text>
              <Text style={styles.tcoValue}>{getTCO().toLocaleString()} €</Text>
            </View>
            <Text style={styles.tcoSubText}>Détails des frais {'>'}</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>

      <MileageModal 
        visible={mileageModalVisible} 
        onClose={() => setMileageModalVisible(false)} 
        suggestedKms={suggestedKms} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    marginTop: -spacing.md,
  },
  heroImage: {
    width: '100%',
    height: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  badgeContainer: {
    marginTop: -40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chromeBadge: {
    fontSize: 48,
    fontWeight: '900',
    color: '#E0E0E0',
    fontStyle: 'italic',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  modelName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  mainCard: {
    marginBottom: spacing.lg,
  },
  mileageSection: {
    alignItems: 'center',
  },
  mileageLabel: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  mileageValue: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    gap: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  gaugesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  halfCard: {
    flex: 1,
    padding: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  tcoCardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  tcoCard: {
    padding: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tcoLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  tcoValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  tcoSubText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
});
