import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { useVehicleStore, Expense } from '../store/useVehicleStore';
import { colors, spacing, typography } from '../theme/colors';
import { GlassCard } from '../components/common/GlassCard';
import { ExpenseModal } from '../components/common/ExpenseModal';
import { Wrench, Fuel, Sparkles, Plus, MoreHorizontal } from 'lucide-react-native';

export default function HistoryScreen() {
  const expenses = useVehicleStore((state) => state.expenses);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(undefined);

  const getIcon = (category: string) => {
    switch (category) {
      case 'maintenance': return <Wrench size={18} color={colors.primary} />;
      case 'fuel': return <Fuel size={18} color={colors.secondary} />;
      case 'aesthetic': return <Sparkles size={18} color={colors.success} />;
      default: return <MoreHorizontal size={18} color={colors.textSecondary} />;
    }
  };

  const openAddModal = () => {
    setSelectedExpense(undefined);
    setModalVisible(true);
  };

  const openEditModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }: { item: Expense; index: number }) => {
    const dateObj = new Date(item.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase().replace('.', '');
    
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.timelineContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.dateDay}>{day}</Text>
            <Text style={styles.dateMonth}>{month}</Text>
          </View>
          <View style={[
            styles.timelineLine, 
            index === expenses.length - 1 && { backgroundColor: 'transparent' }
          ]} />
          <View style={styles.timelineDot} />
        </View>

        <TouchableOpacity 
          style={styles.cardContainer} 
          onPress={() => openEditModal(item)}
          activeOpacity={0.7}
        >
          <GlassCard style={styles.itemCard} variant="glass">
            <View style={styles.itemHeader}>
              <View style={[styles.iconBox, { backgroundColor: getCategoryColor(item.category) + '15' }]}>
                {getIcon(item.category)}
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel} numberOfLines={1}>{item.label}</Text>
                <Text style={styles.itemCategory}>
                  {getCategoryLabel(item.category)}
                </Text>
              </View>
              <Text style={styles.itemAmount}>{item.amount.toLocaleString()} €</Text>
            </View>
          </GlassCard>
        </TouchableOpacity>
      </View>
    );
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'maintenance': return colors.primary;
      case 'fuel': return colors.secondary;
      case 'aesthetic': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'maintenance': return 'Réparation';
      case 'fuel': return 'Carburant';
      case 'aesthetic': return 'Polish';
      default: return 'Autre';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Entretien</Text>
          <Text style={styles.subtitle}>Historique de votre Roadster</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Plus color="#FFF" size={28} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucun historique enregistré</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={openAddModal}>
              <Text style={styles.emptyButtonText}>Ajouter mon premier entretien</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <ExpenseModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        expense={selectedExpense}
      />
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  itemWrapper: {
    flexDirection: 'row',
    minHeight: 100,
  },
  timelineContainer: {
    width: 60,
    alignItems: 'center',
    position: 'relative',
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHighlight,
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 2,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 20,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  timelineLine: {
    position: 'absolute',
    top: 50,
    bottom: 0,
    width: 2,
    backgroundColor: colors.border,
    zIndex: 1,
  },
  timelineDot: {
    position: 'absolute',
    top: 25,
    left: 55, // Center line
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    zIndex: 3,
    display: 'none', // Removed for cleaner look with dateBox
  },
  cardContainer: {
    flex: 1,
    paddingBottom: spacing.md,
    paddingLeft: spacing.sm,
  },
  itemCard: {
    padding: spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  itemCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  emptyButton: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
