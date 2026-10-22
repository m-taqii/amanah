import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export function ImpactScreen() {
  const { role } = useApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Your Community Impact</Text>
      <Text style={styles.subtitle}>
        Every portion moved brings dignity and stops landfill waste in Lahore.
      </Text>

      {/* Main KPI */}
      <View style={styles.kpiCard}>
        <MaterialCommunityIcons name="heart-pulse" size={32} color="#FFFFFF" />
        <Text style={styles.kpiNumber}>{role === 'donor' ? '760' : '380'}</Text>
        <Text style={styles.kpiLabel}>Meals shared with families</Text>
        <Text style={styles.kpiSub}>100% verified through local welfare kitchens</Text>
      </View>

      {/* Secondary Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Ionicons name="leaf-outline" size={20} color={AmanahColors.primary} />
          <Text style={styles.metricValue}>320 kg</Text>
          <Text style={styles.metricLabel}>CO2 Emissions Prevented</Text>
        </View>

        <View style={styles.metricCard}>
          <Feather name="award" size={20} color={AmanahColors.amber} />
          <Text style={styles.metricValue}>{role === 'donor' ? '8' : '5'}</Text>
          <Text style={styles.metricLabel}>Successful Rescues</Text>
        </View>
      </View>

      {/* Distribution Centers */}
      <Text style={styles.sectionTitle}>Partner Distribution Centers</Text>

      <View style={styles.partnerItem}>
        <View style={styles.partnerIcon}>
          <MaterialCommunityIcons name="home-heart" size={18} color={AmanahColors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.partnerName}>Rehmat Community Kitchen</Text>
          <Text style={styles.partnerDetail}>Model Town · 520 meals distributed</Text>
        </View>
        <Ionicons name="checkmark-circle" size={16} color={AmanahColors.success} />
      </View>

      <View style={styles.partnerItem}>
        <View style={styles.partnerIcon}>
          <MaterialCommunityIcons name="home-heart" size={18} color={AmanahColors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.partnerName}>Edhi Foundation Gulberg</Text>
          <Text style={styles.partnerDetail}>Main Market · 240 meals distributed</Text>
        </View>
        <Ionicons name="checkmark-circle" size={16} color={AmanahColors.success} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmanahColors.background,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: AmanahColors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  kpiCard: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.xl,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  kpiNumber: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 6,
  },
  kpiLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E0EDE6',
    marginTop: 2,
  },
  kpiSub: {
    fontSize: 11,
    color: '#B5D3C2',
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 14,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: AmanahColors.text,
    marginTop: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 10,
  },
  partnerItem: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  partnerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AmanahColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerName: {
    fontSize: 13,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  partnerDetail: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    marginTop: 1,
  },
});
