import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronDown, X, Check } from 'lucide-react-native';
import { colors, spacing, typography } from '../../theme/colors';
import * as Haptics from 'expo-haptics';

interface GlassPickerProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  icon: any;
  placeholder?: string;
}

export const GlassPicker = ({ label, value, options, onSelect, icon: Icon, placeholder }: GlassPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setModalVisible(true);
  };

  const handleSelect = (item: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.trigger} 
        onPress={handleOpen}
        activeOpacity={0.7}
      >
        <View style={styles.triggerLeft}>
          <Icon size={20} color={colors.primary} style={styles.icon} />
          <Text style={[styles.valueText, !value && styles.placeholder]}>
            {value || placeholder || `Choisir ${label.toLowerCase()}...`}
          </Text>
        </View>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.dismissOverlay} 
            activeOpacity={1} 
            onPress={() => setModalVisible(false)} 
          />
          <BlurView intensity={70} tint="dark" style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner {label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.optionItem, value === item && styles.optionItemActive]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.optionText, value === item && styles.optionTextActive]}>
                    {item}
                  </Text>
                  {value === item && <Check size={20} color={colors.primary} />}
                </TouchableOpacity>
              )}
            />
            <SafeAreaView />
          </BlurView>
        </View>
      </Modal>
    </View>
  );
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 50,
    paddingHorizontal: spacing.md,
  },
  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: spacing.sm,
  },
  valueText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  placeholder: {
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  dismissOverlay: {
    flex: 1,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
    maxHeight: SCREEN_HEIGHT * 0.7,
    overflow: 'hidden',
    borderColor: colors.border,
    borderTopWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.xs,
  },
  optionItemActive: {
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
  },
  optionText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
