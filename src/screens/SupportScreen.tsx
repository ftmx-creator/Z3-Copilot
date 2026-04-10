import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Linking 
} from 'react-native';
import { colors, spacing, typography } from '../theme/colors';
import { GlassCard } from '../components/common/GlassCard';
import { ChevronLeft, Mail, ExternalLink, HelpCircle, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SupportScreen() {
  const navigation = useNavigation();

  const handleContact = () => {
    Linking.openURL('mailto:fortumaxx@gmail.com?subject=Z3 Partner Support');
  };

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={colors.textPrimary} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Support</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TouchableOpacity onPress={handleContact}>
          <GlassCard style={styles.contactCard} variant="glass">
            <View style={styles.contactContent}>
              <View style={styles.iconBox}>
                <Mail color={colors.primary} size={24} />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Envoyer un email</Text>
                <Text style={styles.contactEmail}>fortumaxx@gmail.com</Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Questions Fréquentes</Text>
        <GlassCard style={styles.faqCard}>
          <FAQItem 
            question="Comment ajouter un entretien ?" 
            answer="Rendez-vous dans l'onglet 'Entretien' et appuyez sur le bouton '+' en haut à droite." 
          />
          <View style={styles.divider} />
          <FAQItem 
            question="Qu'est-ce que le TCO ?" 
            answer="Le Total Cost of Ownership représente le coût total de possession (Prix d'achat + Entretien + Carburant + Assurance)." 
          />
          <View style={styles.divider} />
          <FAQItem 
            question="Où sont stockées mes données ?" 
            answer="Toutes vos données restent localement sur votre téléphone pour une confidentialité totale." 
          />
        </GlassCard>

        <Text style={styles.sectionTitle}>Communauté Z3</Text>
        <GlassCard style={styles.linkCard}>
          <TouchableOpacity 
            style={styles.linkRow} 
            onPress={() => handleLink('https://www.z3-france.com')}
          >
            <View style={styles.linkInfo}>
              <HelpCircle color={colors.textSecondary} size={20} />
              <Text style={styles.linkText}>Z3 Club France</Text>
            </View>
            <ExternalLink color={colors.textMuted} size={16} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.linkRow} 
            onPress={() => handleLink('https://www.bimmerforums.com/forum/forumdisplay.php?137-Z3-Roadster-Coupe-M-Roadster-M-Coupe-(Z3)')}
          >
            <View style={styles.linkInfo}>
              <HelpCircle color={colors.textSecondary} size={20} />
              <Text style={styles.linkText}>Bimmerforums Z3</Text>
            </View>
            <ExternalLink color={colors.textMuted} size={16} />
          </TouchableOpacity>
        </GlassCard>

        <View style={styles.credits}>
          <View style={styles.heartBox}>
            <Heart color={colors.error} size={16} fill={colors.error} />
          </View>
          <Text style={styles.creditsText}>Z3 Partner v1.1.0</Text>
          <Text style={styles.subCredits}>Développé par un passionné pour des passionnés</Text>
        </View>
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
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  contactCard: {
    padding: spacing.md,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  faqCard: {
    paddingHorizontal: spacing.lg,
  },
  faqItem: {
    paddingVertical: spacing.lg,
  },
  question: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  answer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  linkCard: {
    paddingHorizontal: spacing.lg,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  linkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  linkText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  credits: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  heartBox: {
    marginBottom: spacing.md,
  },
  creditsText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subCredits: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
});
