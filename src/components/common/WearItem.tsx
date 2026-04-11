import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Platform } from 'react-native';
import { colors, spacing, typography } from '../../theme/colors';

interface WearItemProps {
  id: string;
  label: string;
  icon: any;
  wear: Record<string, { isNew: boolean, km: string }>;
  setWear: (wear: any) => void;
}

export const WearItem = ({ id, label, icon: Icon, wear, setWear }: WearItemProps) => (
  <View style={styles.wearItem}>
    <View style={styles.wearHeader}>
      <View style={styles.wearLabelGroup}>
        <Icon size={20} color={colors.textPrimary} />
        <Text style={styles.wearLabel}>{label}</Text>
      </View>
      <View style={styles.switchGroup}>
        <Text style={[styles.switchLabel, wear[id].isNew && { color: colors.success }]}>
          {wear[id].isNew ? 'Neuf' : 'Usé'}
        </Text>
        <Switch 
          value={wear[id].isNew} 
          onValueChange={(val) => setWear({ ...wear, [id]: { ...wear[id], isNew: val }})}
          trackColor={{ false: colors.border, true: colors.success }}
          thumbColor={Platform.OS === 'android' ? (wear[id].isNew ? colors.success : colors.textMuted) : undefined}
        />
      </View>
    </View>
    {!wear[id].isNew && (
      <View style={styles.wearInputWrapper}>
        <Text style={styles.wearSubLabel}>Kilomètres parcourus depuis changement :</Text>
        <TextInput
          style={styles.wearInput}
          value={wear[id].km}
          onChangeText={(t) => setWear({ ...wear, [id]: { ...wear[id], km: t }})}
          keyboardType="numeric"
          placeholder="ex: 5000"
          placeholderTextColor={colors.textMuted}
        />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  wearItem: {
    paddingVertical: spacing.md,
  },
  wearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wearLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  wearLabel: {
    ...typography.h3,
    fontSize: 16,
    color: colors.textPrimary,
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  wearInputWrapper: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceHighlight,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  wearSubLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  wearInput: {
    height: 40,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
