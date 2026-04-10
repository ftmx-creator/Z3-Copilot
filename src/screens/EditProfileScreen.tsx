import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useVehicleStore } from '../store/useVehicleStore';
import { colors, spacing, typography } from '../theme/colors';
import { GlassCard } from '../components/common/GlassCard';
import { ChevronLeft, Save } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useVehicleStore();

  const [model, setModel] = useState(profile?.model || '');
  const [year, setYear] = useState(profile?.year || '');
  const [mileage, setMileage] = useState(profile?.mileage.toString() || '');
  const [purchasePrice, setPurchasePrice] = useState(profile?.purchasePrice.toString() || '');
  const [insuranceCost, setInsuranceCost] = useState(profile?.insuranceCost.toString() || '');

  const handleSave = () => {
    if (!profile) return;
    
    setProfile({
      ...profile,
      model,
      year,
      mileage: parseInt(mileage) || 0,
      purchasePrice: parseInt(purchasePrice) || 0,
      insuranceCost: parseInt(insuranceCost) || 0,
    });
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={colors.textPrimary} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>Profil Véhicule</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <GlassCard style={styles.card}>
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modèle (ex: 2.8i, M Roadster)</Text>
                <TextInput 
                  style={styles.input}
                  value={model}
                  onChangeText={setModel}
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Année</Text>
                <TextInput 
                  style={styles.input}
                  value={year}
                  onChangeText={setYear}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Kilométrage Actuel</Text>
                <TextInput 
                  style={styles.input}
                  value={mileage}
                  onChangeText={setMileage}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Prix d'achat (€)</Text>
                <TextInput 
                  style={styles.input}
                  value={purchasePrice}
                  onChangeText={setPurchasePrice}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Coût Assurance Annuel (€)</Text>
                <TextInput 
                  style={styles.input}
                  value={insuranceCost}
                  onChangeText={setInsuranceCost}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Save color="#FFF" size={20} />
                <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  scroll: {
    padding: spacing.lg,
  },
  card: {
    padding: spacing.xl,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
  },
  input: {
    height: 50,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: spacing.md,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
