
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Icon from '../components/Icon';

interface CountryData {
  name: string;
  deathRate: number; // Deaths per 1000 people per year
  population: number; // In millions
  flag: string;
  region: string;
}

// Sample data based on real world statistics (approximate)
const countriesData: CountryData[] = [
  { name: 'Bulgaria', deathRate: 15.4, population: 6.9, flag: '🇧🇬', region: 'Europe' },
  { name: 'Ukraine', deathRate: 14.8, population: 43.8, flag: '🇺🇦', region: 'Europe' },
  { name: 'Latvia', deathRate: 14.6, population: 1.9, flag: '🇱🇻', region: 'Europe' },
  { name: 'Lithuania', deathRate: 14.5, population: 2.8, flag: '🇱🇹', region: 'Europe' },
  { name: 'Serbia', deathRate: 14.3, population: 8.7, flag: '🇷🇸', region: 'Europe' },
  { name: 'Croatia', deathRate: 13.2, population: 4.0, flag: '🇭🇷', region: 'Europe' },
  { name: 'Romania', deathRate: 13.0, population: 19.1, flag: '🇷🇴', region: 'Europe' },
  { name: 'Hungary', deathRate: 12.8, population: 9.7, flag: '🇭🇺', region: 'Europe' },
  { name: 'Estonia', deathRate: 12.7, population: 1.3, flag: '🇪🇪', region: 'Europe' },
  { name: 'Russia', deathRate: 12.4, population: 144.1, flag: '🇷🇺', region: 'Europe/Asia' },
  { name: 'Germany', deathRate: 11.8, population: 83.2, flag: '🇩🇪', region: 'Europe' },
  { name: 'Italy', deathRate: 11.7, population: 59.1, flag: '🇮🇹', region: 'Europe' },
  { name: 'Japan', deathRate: 11.6, population: 125.8, flag: '🇯🇵', region: 'Asia' },
  { name: 'Greece', deathRate: 11.4, population: 10.7, flag: '🇬🇷', region: 'Europe' },
  { name: 'Portugal', deathRate: 11.2, population: 10.3, flag: '🇵🇹', region: 'Europe' },
  { name: 'Finland', deathRate: 10.1, population: 5.5, flag: '🇫🇮', region: 'Europe' },
  { name: 'Slovenia', deathRate: 10.0, population: 2.1, flag: '🇸🇮', region: 'Europe' },
  { name: 'Czech Republic', deathRate: 10.0, population: 10.7, flag: '🇨🇿', region: 'Europe' },
  { name: 'Denmark', deathRate: 9.5, population: 5.8, flag: '🇩🇰', region: 'Europe' },
  { name: 'Austria', deathRate: 9.4, population: 9.0, flag: '🇦🇹', region: 'Europe' },
  { name: 'Belgium', deathRate: 9.3, population: 11.6, flag: '🇧🇪', region: 'Europe' },
  { name: 'Sweden', deathRate: 9.2, population: 10.4, flag: '🇸🇪', region: 'Europe' },
  { name: 'United Kingdom', deathRate: 9.1, population: 67.9, flag: '🇬🇧', region: 'Europe' },
  { name: 'France', deathRate: 9.0, population: 68.0, flag: '🇫🇷', region: 'Europe' },
  { name: 'Spain', deathRate: 8.9, population: 47.4, flag: '🇪🇸', region: 'Europe' },
  { name: 'Poland', deathRate: 8.8, population: 37.8, flag: '🇵🇱', region: 'Europe' },
  { name: 'South Korea', deathRate: 8.7, population: 51.8, flag: '🇰🇷', region: 'Asia' },
  { name: 'Netherlands', deathRate: 8.6, population: 17.4, flag: '🇳🇱', region: 'Europe' },
  { name: 'Canada', deathRate: 8.5, population: 38.2, flag: '🇨🇦', region: 'North America' },
  { name: 'United States', deathRate: 8.4, population: 331.9, flag: '🇺🇸', region: 'North America' },
  { name: 'China', deathRate: 7.1, population: 1412.0, flag: '🇨🇳', region: 'Asia' },
  { name: 'Australia', deathRate: 6.8, population: 25.7, flag: '🇦🇺', region: 'Oceania' },
  { name: 'Brazil', deathRate: 6.7, population: 215.3, flag: '🇧🇷', region: 'South America' },
  { name: 'India', deathRate: 6.0, population: 1380.0, flag: '🇮🇳', region: 'Asia' },
  { name: 'Mexico', deathRate: 5.4, population: 128.9, flag: '🇲🇽', region: 'North America' },
];

export default function CountriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Oceania'];

  const filteredCountries = countriesData
    .filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => b.deathRate - a.deathRate);

  const calculateAnnualDeaths = (country: CountryData): number => {
    return Math.round((country.deathRate / 1000) * country.population * 1000000);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  const renderCountryCard = (country: CountryData, index: number) => (
    <View key={country.name} style={{
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    }}>
      <View style={{
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
        minWidth: 40,
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>
          #{index + 1}
        </Text>
      </View>
      
      <Text style={{ fontSize: 24, marginRight: 12 }}>
        {country.flag}
      </Text>
      
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 2,
        }}>
          {country.name}
        </Text>
        <Text style={{
          fontSize: 12,
          color: colors.textSecondary,
          marginBottom: 4,
        }}>
          {country.region} • Pop: {country.population}M
        </Text>
        <Text style={{
          fontSize: 14,
          color: colors.textSecondary,
        }}>
          ~{formatNumber(calculateAnnualDeaths(country))} deaths/year
        </Text>
      </View>
      
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '700',
          color: colors.danger,
        }}>
          {country.deathRate}
        </Text>
        <Text style={{
          fontSize: 12,
          color: colors.textSecondary,
          textAlign: 'center',
        }}>
          per 1000
        </Text>
      </View>
    </View>
  );

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
          Countries by Death Rate
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        }}>
          <Icon name="search" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: colors.text,
            }}
            placeholder="Search countries..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        >
          {regions.map((region) => (
            <TouchableOpacity
              key={region}
              onPress={() => setSelectedRegion(region)}
              style={{
                backgroundColor: selectedRegion === region ? colors.primary : colors.card,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selectedRegion === region ? colors.primary : colors.border,
              }}
            >
              <Text style={{
                color: selectedRegion === region ? colors.backgroundAlt : colors.text,
                fontSize: 14,
                fontWeight: '500',
              }}>
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderLeftWidth: 4,
          borderLeftColor: colors.danger,
        }}>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 18,
          }}>
            Death rates shown as deaths per 1,000 people per year. 
            Data is approximate and based on recent global health statistics.
          </Text>
        </View>

        {filteredCountries.map((country, index) => renderCountryCard(country, index))}

        {filteredCountries.length === 0 && (
          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 32,
            alignItems: 'center',
          }}>
            <Icon name="search" size={48} color={colors.textSecondary} style={{ marginBottom: 16 }} />
            <Text style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
            }}>
              No countries found matching your search criteria.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
