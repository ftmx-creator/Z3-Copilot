import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, spacing, typography } from '../../theme/colors';

interface MaintenanceGaugeProps {
  label: string;
  currentValue: number;
  maxValue: number;
  unit?: string;
  size?: number;
}

export const MaintenanceGauge = ({ 
  label, 
  currentValue, 
  maxValue, 
  unit = 'km',
  size = 100,
}: MaintenanceGaugeProps) => {
  const percentage = Math.min((currentValue / maxValue) * 100, 100);
  const remaining = maxValue - currentValue;
  
  const getStatusColor = () => {
    if (percentage > 90) return colors.error;
    if (percentage > 70) return colors.warning;
    return colors.primary;
  };

  const statusColor = getStatusColor();
  
  // SVG circle math
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.gaugeWrapper}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={statusColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
        {/* Center text */}
        <View style={[styles.centerText, { width: size, height: size }]}>
          <Text style={[styles.percentText, { color: statusColor }]}>
            {Math.round(percentage)}%
          </Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.remaining}>
          {remaining > 0 
            ? `${remaining.toLocaleString()} ${unit} restants`
            : 'Dépassé !'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  gaugeWrapper: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  centerText: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  info: {
    alignItems: 'center',
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 9,
  },
  remaining: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 11,
  },
});
