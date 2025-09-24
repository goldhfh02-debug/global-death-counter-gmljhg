
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Icon from '../components/Icon';
import StatisticsCard from '../components/StatisticsCard';

const { width } = Dimensions.get('window');

// Global statistics (approximate)
const GLOBAL_POPULATION = 8000000000; // 8 billion
const BIRTHS_PER_SECOND = 4.3;
const DEATHS_PER_SECOND = 1.8;
const NET_POPULATION_GROWTH_PER_SECOND = BIRTHS_PER_SECOND - DEATHS_PER_SECOND;

export default function StatisticsScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate statistics since start of year
  const startOfYear = new Date(currentTime.getFullYear(), 0, 1);
  const secondsSinceStartOfYear = Math.floor((currentTime.getTime() - startOfYear.getTime()) / 1000);
  
  const deathsThisYear = Math.floor(secondsSinceStartOfYear * DEATHS_PER_SECOND);
  const birthsThisYear = Math.floor(secondsSinceStartOfYear * BIRTHS_PER_SECOND);
  const netGrowthThisYear = birthsThisYear - deathsThisYear;

  // Calculate daily averages
  const deathsPerDay = Math.round(DEATHS_PER_SECOND * 86400);
  const birthsPerDay = Math.round(BIRTHS_PER_SECOND * 86400);

  // Leading causes of death (approximate percentages)
  const causesOfDeath = [
    { cause: 'Cardiovascular Disease', percentage: 31.8, deaths: Math.round(deathsThisYear * 0.318) },
    { cause: 'Cancer', percentage: 17.0, deaths: Math.round(deathsThisYear * 0.17) },
    { cause: 'Respiratory Disease', percentage: 6.8, deaths: Math.round(deathsThisYear * 0.068) },
    { cause: 'Alzheimer\'s & Dementia', percentage: 6.1, deaths: Math.round(deathsThisYear * 0.061) },
    { cause: 'Stroke', percentage: 5.9, deaths: Math.round(deathsThisYear * 0.059) },
    { cause: 'Diabetes', percentage: 3.0, deaths: Math.round(deathsThisYear * 0.03) },
    { cause: 'Accidents', percentage: 4.8, deaths: Math.round(deathsThisYear * 0.048) },
    { cause: 'Other Causes', percentage: 24.6, deaths: Math.round(deathsThisYear * 0.246) },
  ];

  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingVertical: 16,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
        <Link href="/" asChild>
          <TouchableOpacity style={{
            padding: 8,
            marginRight: 12,
            borderRadius: 8,
            backgroundColor: colors.background,
          }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </Link>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          color: colors.text,
          flex: 1,
        }}>
          Detailed Statistics
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 16,
          textAlign: 'center',
        }}>
          Global Population Dynamics {currentTime.getFullYear()}
        </Text>

        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}>
          <View style={{ width: width < 400 ? '100%' : '48%', marginBottom: 12 }}>
            <StatisticsCard
              title="Deaths This Year"
              value={formatLargeNumber(deathsThisYear)}
              subtitle="and counting..."
              icon="skull-outline"
              color={colors.danger}
              trend="up"
            />
          </View>
          
          <View style={{ width: width < 400 ? '100%' : '48%', marginBottom: 12 }}>
            <StatisticsCard
              title="Births This Year"
              value={formatLargeNumber(birthsThisYear)}
              subtitle="new lives"
              icon="heart-outline"
              color="#10b981"
              trend="up"
            />
          </View>
          
          <View style={{ width: width < 400 ? '100%' : '48%', marginBottom: 12 }}>
            <StatisticsCard
              title="Net Growth"
              value={formatLargeNumber(netGrowthThisYear)}
              subtitle="population increase"
              icon="trending-up"
              color={colors.primary}
              trend="up"
            />
          </View>
          
          <View style={{ width: width < 400 ? '100%' : '48%', marginBottom: 12 }}>
            <StatisticsCard
              title="Global Population"
              value={formatLargeNumber(GLOBAL_POPULATION)}
              subtitle="estimated total"
              icon="people-outline"
              color={colors.accent}
            />
          </View>
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
            marginBottom: 16,
            textAlign: 'center',
          }}>
            Daily Averages
          </Text>
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: colors.text }}>Deaths per day:</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.danger }}>
                {deathsPerDay.toLocaleString()}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: colors.text }}>Births per day:</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#10b981' }}>
                {birthsPerDay.toLocaleString()}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: colors.text }}>Net growth per day:</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.primary }}>
                +{(birthsPerDay - deathsPerDay).toLocaleString()}
              </Text>
            </View>
          </View>
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
            marginBottom: 16,
            textAlign: 'center',
          }}>
            Leading Causes of Death ({currentTime.getFullYear()})
          </Text>
          
          {causesOfDeath.map((item, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: index < causesOfDeath.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>
                  {item.cause}
                </Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                  {formatLargeNumber(item.deaths)} deaths
                </Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.danger }}>
                {item.percentage}%
              </Text>
            </View>
          ))}
        </View>

        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: colors.warning,
        }}>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
          }}>
            All statistics are estimates based on global health data and demographic studies. 
            Actual numbers may vary due to reporting delays, regional differences, and extraordinary events.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
