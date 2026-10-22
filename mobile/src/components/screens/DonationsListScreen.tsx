import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp, RescueItem } from '@/context/AppContext';

interface DonationsListScreenProps {
  onOpenDonate?: () => void;
  onSelectRescue?: (rescue: RescueItem) => void;
}

export function DonationsListScreen({
  onOpenDonate,
  onSelectRescue,
}: DonationsListScreenProps) {
  const { role, rescues, activeRescueStage } = useApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>
            {role === 'donor' ? 'Your Donations' : 'Rescue Log'}
          </Text>
          <Text style={styles.subtitle}>
            {role === 'donor'
              ? 'Past and active food surplus contributions'
              : 'Claimed and completed surplus food pickups'}
          </Text>
        </View>

        {role === 'donor' && onOpenDonate && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onOpenDonate}
            style={styles.addButton}>
            <Feather name="plus" size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>New</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List items */}
      {rescues.map((item) => {
        const isCurrentActive = item.id === 'AM-0128';
        const displayStatus = isCurrentActive
          ? activeRescueStage === 'delivered'
            ? 'Delivered'
            : activeRescueStage === 'collected'
            ? 'In Transit'
            : 'Claimed'
          : item.status === 'expired'
          ? 'Expired'
          : 'Available';

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onSelectRescue && onSelectRescue(item)}
            style={styles.itemCard}>
            <View style={styles.itemTopRow}>
              <View
                style={[
                  styles.statusTag,
                  item.status === 'expired'
                    ? styles.statusTagExpired
                    : styles.statusTagActive,
                ]}>
                <Text
                  style={[
                    styles.statusTagText,
                    item.status === 'expired'
                      ? styles.statusTagTextExpired
                      : styles.statusTagTextActive,
                  ]}>
                  {displayStatus}
                </Text>
              </View>
              <Text style={styles.itemId}>{item.id}</Text>
            </View>

            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>

            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={14} color={AmanahColors.textSecondary} />
              <Text style={styles.metaText}>{item.pickupLocation}</Text>
            </View>

            <View style={styles.footerRow}>
              <View style={styles.servingsPill}>
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={12}
                  color={AmanahColors.primary}
                />
                <Text style={styles.servingsText}>{item.servings} portions</Text>
              </View>

              <Text style={styles.detailsLink}>View details →</Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: AmanahColors.text,
  },
  subtitle: {
    fontSize: 12.5,
    color: AmanahColors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AmanahColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.full,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 14,
    marginBottom: 12,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  statusTagActive: {
    backgroundColor: AmanahColors.primaryLight,
  },
  statusTagExpired: {
    backgroundColor: AmanahColors.cardSubtle,
  },
  statusTagText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  statusTagTextActive: {
    color: AmanahColors.primary,
  },
  statusTagTextExpired: {
    color: AmanahColors.textMuted,
  },
  itemId: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    fontWeight: '600',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 11.5,
    color: AmanahColors.textSecondary,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AmanahColors.cardBorder,
  },
  servingsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  servingsText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  detailsLink: {
    fontSize: 11.5,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
});
