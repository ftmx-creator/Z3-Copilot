import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme/colors';
import { GlassCard } from '../components/common/GlassCard';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function LegalNoticeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={colors.textPrimary} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Mentions Légales</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <GlassCard variant="glass" style={styles.card}>
          <Text style={styles.date}>Dernière mise à jour : 16 avril 2026</Text>
          
          <Text style={styles.sectionTitle}>Limitation de Responsabilité</Text>
          <Text style={styles.paragraph}>
            L'application Z3 Copilot est un outil de suivi informatif. Les recommandations d'entretien, de remplacements de pièces et les échéances kilométriques fournies par l'application sont basées sur des principes généraux.
          </Text>

          <Text style={styles.sectionTitle}>1. Recommandations à Titre Indicatif</Text>
          <Text style={styles.paragraph}>
            En aucun cas les informations de Z3 Copilot ne peuvent se substituer à l'avis d'un professionnel qualifié, d'un mécanicien certifié ou aux préconisations officielles de BMW adaptées à l'état réel et précis de votre véhicule.
          </Text>

          <Text style={styles.sectionTitle}>2. Responsabilité de l'Entretien</Text>
          <Text style={styles.paragraph}>
            L'utilisateur reconnaît et accepte qu'il demeure seul et unique responsable de l'entretien, de la sécurité de son véhicule et de la vérification de l'état d'usure des organes vitaux (moteur, freins, pneus, trains roulants, etc.).
          </Text>

          <Text style={styles.sectionTitle}>3. Exclusion de Garantie</Text>
          <Text style={styles.paragraph}>
            Le créateur de l'application decline toute responsabilité en cas de panne, d'accident, de dommages matériels ou corporels directs ou indirects résultant de l'utilisation de l'application ou d'une avarie mécanique non anticipée.
          </Text>

          <Text style={styles.sectionTitle}>4. Acceptation</Text>
          <Text style={styles.paragraph}>
            Ce document récapitule les termes juridiques acceptés lors de l'enregistrement initial de votre véhicule dans l'application. En poursuivant l'utilisation de Z3 Copilot, vous maintenez votre accord avec ces conditions.
          </Text>
        </GlassCard>
      </ScrollView>
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
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  card: {
    padding: spacing.lg,
  },
  date: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  paragraph: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
