import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useVehicleStore, Expense } from '../../store/useVehicleStore';
import { colors, spacing, typography } from '../../theme/colors';
import { GlassCard } from './GlassCard';
import { Wrench, Fuel, Sparkles, MoreHorizontal, X, Save, Trash2 } from 'lucide-react-native';

type Category = 'maintenance' | 'fuel' | 'aesthetic' | 'other';

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  expense?: Expense; // If provided, we are in edit mode
  initialCategory?: Category;
}

export const ExpenseModal = ({ visible, onClose, expense, initialCategory }: ExpenseModalProps) => {
  const { addExpense, updateExpense, deleteExpense, profile } = useVehicleStore();
  
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [liters, setLiters] = useState('');
  const [mileage, setMileage] = useState('');
  const [category, setCategory] = useState<Category>('maintenance');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (expense) {
      setLabel(expense.label);
      setAmount(expense.amount.toString());
      setLiters(expense.liters?.toString() || '');
      setMileage(expense.mileage?.toString() || '');
      setCategory(expense.category);
      setDate(expense.date);
    } else {
      setLabel('');
      setAmount('');
      setLiters('');
      setMileage(profile?.mileage?.toString() || '');
      setCategory(initialCategory || 'maintenance');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [expense, visible, profile?.mileage, initialCategory]);

  // Auto-fill label for fuel
  useEffect(() => {
    if (!expense && category === 'fuel' && !label) {
      setLabel('Plein de Carburant');
    }
  }, [category]);

  const handleSave = () => {
    if (!label || !amount) return;

    const expenseData = {
      label,
      amount: parseFloat(amount.replace(',', '.')),
      category,
      date,
      liters: liters ? parseFloat(liters.replace(',', '.')) : undefined,
      mileage: mileage ? parseInt(mileage) : undefined,
    };

    if (expense) {
      updateExpense(expense.id, expenseData);
    } else {
      addExpense(expenseData);
    }
    onClose();
  };

  const pricePerLiter = useMemo(() => {
    const amt = parseFloat(amount.replace(',', '.'));
    const ltr = parseFloat(liters.replace(',', '.'));
    if (amt && ltr && ltr > 0) return (amt / ltr).toFixed(3);
    return null;
  }, [amount, liters]);

  const handleDelete = () => {
    if (expense) {
      deleteExpense(expense.id);
      onClose();
    }
  };

  const CategoryOption = ({ id, label, icon: Icon }: { id: Category, label: string, icon: any }) => (
    <TouchableOpacity 
      style={[
        styles.categoryOption, 
        category === id && styles.categoryOptionActive
      ]}
      onPress={() => setCategory(id)}
    >
      <Icon size={20} color={category === id ? '#FFF' : colors.textSecondary} />
      <Text style={[
        styles.categoryLabel, 
        category === id && styles.categoryLabelActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <GlassCard style={styles.modalContent} variant="glass">
            <View style={styles.header}>
              <Text style={styles.title}>
                {expense ? 'Modifier l\'élément' : 'Ajouter un entretien'}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Titre / Description</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ex: Vidange moteur"
                    placeholderTextColor={colors.textMuted}
                    value={label}
                    onChangeText={setLabel}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
                    <Text style={styles.inputLabel}>Montant (€)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="0.00"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="decimal-pad"
                      value={amount}
                      onChangeText={setAmount}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Date (AAAA-MM-JJ)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="2024-04-10"
                      placeholderTextColor={colors.textMuted}
                      value={date}
                      onChangeText={setDate}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Kilométrage (Compteur)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ex: 125000"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="numeric"
                    value={mileage}
                    onChangeText={setMileage}
                  />
                </View>

                {category === 'fuel' && (
                  <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
                      <Text style={styles.inputLabel}>Volume (Litres)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="ex: 45.5"
                        placeholderTextColor={colors.textMuted}
                        keyboardType="decimal-pad"
                        value={liters}
                        onChangeText={setLiters}
                      />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1, justifyContent: 'center', paddingTop: 20 }]}>
                      {pricePerLiter && (
                        <Text style={{ color: colors.success, fontWeight: '700' }}>
                          {pricePerLiter} € / L
                        </Text>
                      )}
                    </View>
                  </View>
                )}

                <Text style={styles.inputLabel}>Catégorie</Text>
                <View style={styles.categoryGrid}>
                  <CategoryOption id="maintenance" label="Réparation" icon={Wrench} />
                  <CategoryOption id="aesthetic" label="Polish" icon={Sparkles} />
                  <CategoryOption id="fuel" label="Carburant" icon={Fuel} />
                  <CategoryOption id="other" label="Autre" icon={MoreHorizontal} />
                </View>

                <View style={styles.actionRow}>
                  {expense && (
                    <TouchableOpacity 
                      style={[styles.button, styles.deleteButton]} 
                      onPress={handleDelete}
                    >
                      <Trash2 color="#FFF" size={20} />
                      <Text style={styles.buttonText}>Supprimer</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={[styles.button, styles.saveButton, !expense && { width: '100%' }]} 
                    onPress={handleSave}
                  >
                    <Save color="#FFF" size={20} />
                    <Text style={styles.buttonText}>
                      {expense ? 'Enregistrer' : 'Ajouter'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </GlassCard>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    maxHeight: '90%',
  },
  modalContent: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
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
  row: {
    flexDirection: 'row',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryLabelActive: {
    color: '#FFF',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
