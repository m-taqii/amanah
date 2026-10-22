import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface BottomNavBarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export function BottomNavBar({ currentTab, onSelectTab }: BottomNavBarProps) {
  const { role } = useApp();

  const donorTabs = [
    { key: 'home', label: 'Home', icon: 'home-outline' },
    { key: 'donations', label: 'Donations', icon: 'cube-outline' },
    { key: 'impact', label: 'Impact', icon: 'trending-up-outline' },
    { key: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const volunteerTabs = [
    { key: 'nearby', label: 'Nearby', icon: 'compass-outline' },
    { key: 'rescues', label: 'Rescues', icon: 'swap-horizontal-outline' },
    { key: 'impact', label: 'Impact', icon: 'trending-up-outline' },
    { key: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const tabs = role === 'donor' ? donorTabs : volunteerTabs;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => onSelectTab(tab.key)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}>
            <Ionicons
              name={tab.icon as any}
              size={19}
              color={isActive ? AmanahColors.primary : AmanahColors.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: AmanahColors.card,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AmanahColors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: Radius.lg,
    minWidth: 70,
  },
  tabButtonActive: {
    backgroundColor: AmanahColors.primaryLight,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  tabLabelInactive: {
    fontWeight: '500',
    color: AmanahColors.textMuted,
  },
});
