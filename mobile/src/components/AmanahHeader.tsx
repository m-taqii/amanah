import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface AmanahHeaderProps {
  backTitle?: string;
  onBack?: () => void;
}

export function AmanahHeader({ backTitle, onBack }: AmanahHeaderProps) {
  const { role, toggleRole } = useApp();

  return (
    <View style={styles.container}>
      {/* Top Logo and Role Badge Row */}
      <View style={styles.topRow}>
        <View style={styles.logoGroup}>
          <View style={styles.logoIcon}>
            <Ionicons name="leaf-outline" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>amanah</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleRole}
          style={styles.roleBadge}>
          <Text style={styles.roleText}>{role.toUpperCase()}</Text>
          <Feather name="repeat" size={10} color={AmanahColors.primary} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      {/* Back button row if provided */}
      {backTitle && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backRow}>
          <Feather name="arrow-left" size={16} color={AmanahColors.text} />
          <Text style={styles.backText}>{backTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: AmanahColors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: AmanahColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: AmanahColors.primary,
    letterSpacing: -0.5,
  },
  roleBadge: {
    backgroundColor: AmanahColors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '800',
    color: AmanahColors.primary,
    letterSpacing: 0.8,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: AmanahColors.text,
  },
});
