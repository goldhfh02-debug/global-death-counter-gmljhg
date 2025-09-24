
import React from 'react';
import { View, Text } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function StatisticsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = colors.primary,
  trend 
}: StatisticsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'remove';
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return colors.danger;
      case 'down':
        return '#10b981'; // Green
      case 'stable':
        return colors.textSecondary;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[commonStyles.statsCard, { minHeight: 120 }]}>
      {icon && (
        <Icon 
          name={icon as any} 
          size={28} 
          color={color} 
          style={{ marginBottom: 8 }}
        />
      )}
      
      <Text style={{
        fontSize: 28,
        fontWeight: '700',
        color: color,
        marginBottom: 4,
        textAlign: 'center',
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Text>
      
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        textAlign: 'center',
        marginBottom: subtitle ? 4 : 0,
      }}>
        {title}
      </Text>
      
      {subtitle && (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {trend && getTrendIcon() && (
            <Icon 
              name={getTrendIcon() as any} 
              size={14} 
              color={getTrendColor()} 
              style={{ marginRight: 4 }}
            />
          )}
          <Text style={{
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'center',
          }}>
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  );
}
