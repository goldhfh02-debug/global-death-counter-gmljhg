
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Icon from '../components/Icon';

export default function AboutScreen() {
  const dataSource = [
    {
      title: 'World Health Organization (WHO)',
      description: 'Global health statistics and mortality data',
      icon: 'medical-outline'
    },
    {
      title: 'United Nations Population Division',
      description: 'World population prospects and demographic data',
      icon: 'people-outline'
    },
    {
      title: 'World Bank',
      description: 'Country-specific death rates and health indicators',
      icon: 'bar-chart-outline'
    },
    {
      title: 'Our World in Data',
      description: 'Research and data on global health trends',
      icon: 'analytics-outline'
    }
  ];

  const features = [
    {
      title: 'Real-time Counters',
      description: 'Live death statistics updated every second',
      icon: 'time-outline'
    },
    {
      title: 'Country Rankings',
      description: 'Compare death rates across different nations',
      icon: 'earth-outline'
    },
    {
      title: 'Detailed Analytics',
      description: 'In-depth statistics and demographic insights',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Causes of Death',
      description: 'Breakdown by leading causes of mortality',
      icon: 'list-outline'
    }
  ];

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
          About This App
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          alignItems: 'center',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          elevation: 4,
        }}>
          <Icon name="pulse-outline" size={48} color={colors.primary} style={{ marginBottom: 16 }} />
          <Text style={{
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8,
          }}>
            Global Death Statistics
          </Text>
          <Text style={{
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24,
          }}>
            A comprehensive app providing real-time insights into global mortality statistics, 
            helping users understand demographic trends and health patterns worldwide.
          </Text>
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
            Key Features
          </Text>
          
          {features.map((feature, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: index < features.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}>
              <Icon 
                name={feature.icon as any} 
                size={24} 
                color={colors.primary} 
                style={{ marginRight: 16 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 2,
                }}>
                  {feature.title}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 18,
                }}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
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
            Data Sources
          </Text>
          
          {dataSource.map((source, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: index < dataSource.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}>
              <Icon 
                name={source.icon as any} 
                size={24} 
                color={colors.accent} 
                style={{ marginRight: 16 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 2,
                }}>
                  {source.title}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 18,
                }}>
                  {source.description}
                </Text>
              </View>
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
            fontSize: 16,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Important Disclaimer
          </Text>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
          }}>
            All statistics presented in this app are estimates based on available global health data. 
            Actual numbers may vary due to reporting delays, data collection methods, and extraordinary 
            circumstances such as pandemics, natural disasters, or conflicts. This app is intended for 
            educational and informational purposes only.
          </Text>
        </View>

        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
          }}>
            Version 1.0.0 • Built with React Native & Expo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
