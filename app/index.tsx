
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Icon from '../components/Icon';

// Global death rate statistics (approximate)
const DEATHS_PER_SECOND = 1.8; // Approximately 1.8 deaths per second globally
const DEATHS_PER_MINUTE = DEATHS_PER_SECOND * 60;
const DEATHS_PER_HOUR = DEATHS_PER_MINUTE * 60;
const DEATHS_PER_DAY = DEATHS_PER_HOUR * 24;
const DEATHS_PER_MONTH = DEATHS_PER_DAY * 30.44; // Average days per month
const DEATHS_PER_YEAR = DEATHS_PER_DAY * 365.25; // Including leap years

interface DeathCounter {
  label: string;
  value: number;
  unit: string;
  icon: string;
}

export default function MainScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate deaths since start of current period
  const getDeathsSinceStartOf = (period: string): number => {
    const now = currentTime;
    let startTime: Date;

    switch (period) {
      case 'second':
        startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        return Math.floor((now.getTime() - startTime.getTime()) / 1000 * DEATHS_PER_SECOND);
      case 'minute':
        startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0);
        return Math.floor((now.getTime() - startTime.getTime()) / 1000 * DEATHS_PER_SECOND);
      case 'hour':
        startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0);
        return Math.floor((now.getTime() - startTime.getTime()) / 1000 * DEATHS_PER_SECOND);
      case 'day':
        startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        return Math.floor((now.getTime() - startTime.getTime()) / 1000 * DEATHS_PER_SECOND);
      case 'month':
        startTime = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        return Math.floor((now.getTime() - startTime.getTime()) / 1000 * DEATHS_PER_SECOND);
      case 'year':
        startTime = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
        return Math.floor((now.getTime() - startTime.getTime()) / 1000 * DEATHS_PER_SECOND);
      default:
        return 0;
    }
  };

  const deathCounters: DeathCounter[] = [
    {
      label: 'Deaths This Second',
      value: getDeathsSinceStartOf('second'),
      unit: 'deaths',
      icon: 'time-outline'
    },
    {
      label: 'Deaths This Minute',
      value: getDeathsSinceStartOf('minute'),
      unit: 'deaths',
      icon: 'timer-outline'
    },
    {
      label: 'Deaths This Hour',
      value: getDeathsSinceStartOf('hour'),
      unit: 'deaths',
      icon: 'hourglass-outline'
    },
    {
      label: 'Deaths Today',
      value: getDeathsSinceStartOf('day'),
      unit: 'deaths',
      icon: 'calendar-outline'
    },
    {
      label: 'Deaths This Month',
      value: getDeathsSinceStartOf('month'),
      unit: 'deaths',
      icon: 'calendar-number-outline'
    },
    {
      label: 'Deaths This Year',
      value: getDeathsSinceStartOf('year'),
      unit: 'deaths',
      icon: 'calendar-clear-outline'
    }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const renderDeathCounter = (counter: DeathCounter, index: number) => (
    <View key={index} style={commonStyles.statsCard}>
      <Icon 
        name={counter.icon as any} 
        size={32} 
        color={colors.danger} 
        style={{ marginBottom: 12 }}
      />
      <Text style={{
        fontSize: 32,
        fontWeight: '700',
        color: colors.danger,
        marginBottom: 4,
      }}>
        {formatNumber(counter.value)}
      </Text>
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        textAlign: 'center',
      }}>
        {counter.label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={commonStyles.title}>Global Death Statistics</Text>
          <Text style={commonStyles.textSecondary}>
            Real-time mortality data worldwide
          </Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            Live Death Counters
          </Text>
          
          {deathCounters.map((counter, index) => renderDeathCounter(counter, index))}
        </View>

        <View style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          elevation: 4,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 12,
            textAlign: 'center',
          }}>
            Global Death Rates
          </Text>
          <View style={{ gap: 8 }}>
            <Text style={commonStyles.textSecondary}>
              • {DEATHS_PER_SECOND.toFixed(1)} deaths per second
            </Text>
            <Text style={commonStyles.textSecondary}>
              • {Math.round(DEATHS_PER_MINUTE)} deaths per minute
            </Text>
            <Text style={commonStyles.textSecondary}>
              • {Math.round(DEATHS_PER_HOUR).toLocaleString()} deaths per hour
            </Text>
            <Text style={commonStyles.textSecondary}>
              • {Math.round(DEATHS_PER_DAY).toLocaleString()} deaths per day
            </Text>
            <Text style={commonStyles.textSecondary}>
              • {Math.round(DEATHS_PER_YEAR).toLocaleString()} deaths per year
            </Text>
          </View>
        </View>

        <View style={{ gap: 12, marginBottom: 20 }}>
          <Link href="/countries" asChild>
            <TouchableOpacity style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Icon 
                name="earth-outline" 
                size={24} 
                color={colors.backgroundAlt} 
                style={{ marginRight: 8 }}
              />
              <Text style={{
                color: colors.backgroundAlt,
                fontSize: 16,
                fontWeight: '600',
              }}>
                View Countries by Death Rate
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/statistics" asChild>
            <TouchableOpacity style={{
              backgroundColor: colors.secondary,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Icon 
                name="analytics-outline" 
                size={24} 
                color={colors.backgroundAlt} 
                style={{ marginRight: 8 }}
              />
              <Text style={{
                color: colors.backgroundAlt,
                fontSize: 16,
                fontWeight: '600',
              }}>
                Detailed Statistics
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderLeftWidth: 4,
          borderLeftColor: colors.warning,
        }}>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
          }}>
            Data is based on global mortality statistics and provides approximate real-time estimates. 
            Actual numbers may vary based on various factors including natural disasters, pandemics, and regional conflicts.
          </Text>
        </View>

        <Link href="/about" asChild>
          <TouchableOpacity style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 20,
          }}>
            <Icon 
              name="information-circle-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={{ marginRight: 8 }}
            />
            <Text style={{
              color: colors.textSecondary,
              fontSize: 16,
              fontWeight: '500',
            }}>
              About This App
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
