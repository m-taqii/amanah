import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp, RescueItem } from '@/context/AppContext';

interface NearbyRescuesScreenProps {
  onSelectRescue: (rescue: RescueItem) => void;
}

export function NearbyRescuesScreen({ onSelectRescue }: NearbyRescuesScreenProps) {
  const { rescues } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'best' | '5km' | 'soon'>('best');

  const mainRescue = rescues.find((r) => r.id === 'AM-0128') || rescues[0];
  const secondRescue = rescues.find((r) => r.id === 'AM-0129') || rescues[1];
  const expiredRescue = rescues.find((r) => r.status === 'expired') || rescues[2];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Hero Headline */}
      <View style={styles.headerSection}>
        <Text style={styles.titleLine}>A little way.</Text>
        <Text style={styles.titleLine}>A lasting difference.</Text>
        <Text style={styles.subtitle}>Find food you can help move in Lahore.</Text>
      </View>

      {/* Location / Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchLeft}>
          <Ionicons name="location-outline" size={17} color={AmanahColors.textSecondary} />
          <Text style={styles.searchLocationText}>Gulberg III, Lahore</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.filterIconButton}>
          <Feather name="sliders" size={15} color={AmanahColors.text} />
        </TouchableOpacity>
      </View>

      {/* Stylized Area Overview Map Card */}
      <View style={styles.mapCard}>
        {/* Background SVG / Map lines approximation */}
        <View style={styles.mapCanvas}>
          <View style={styles.mapRoadHorizontal} />
          <View style={styles.mapRoadDiagonal} />
          <View style={styles.mapRoadVertical} />

          <Text style={styles.mapAreaLabel}>GULBERG III</Text>

          {/* Active Rescue Pin Badge */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelectRescue(mainRescue)}
            style={styles.mapPinPill}>
            <MaterialCommunityIcons name="cube-outline" size={12} color="#FFFFFF" />
            <Text style={styles.mapPinText}>120 meals</Text>
          </TouchableOpacity>

          {/* Secondary Pin Marker */}
          <View style={styles.mapSecondaryPin}>
            <MaterialCommunityIcons name="cube-outline" size={10} color="#FFFFFF" />
          </View>

          {/* Small dot marker */}
          <View style={styles.mapDotMarker} />
        </View>

        <Text style={styles.mapFooterText}>Area overview · 5 km radius</Text>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedFilter('best')}
          style={[
            styles.filterChip,
            selectedFilter === 'best' ? styles.filterChipActive : styles.filterChipInactive,
          ]}>
          <Feather
            name="sliders"
            size={12}
            color={selectedFilter === 'best' ? AmanahColors.primary : AmanahColors.textSecondary}
          />
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'best' && styles.filterChipTextActive,
            ]}>
            Best match
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedFilter('5km')}
          style={[
            styles.filterChip,
            selectedFilter === '5km' ? styles.filterChipActive : styles.filterChipInactive,
          ]}>
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === '5km' && styles.filterChipTextActive,
            ]}>
            Within 5 km
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedFilter('soon')}
          style={[styles.filterChip, styles.filterChipAmber]}>
          <Text style={styles.filterChipTextAmber}>Collect soon</Text>
        </TouchableOpacity>
      </View>

      {/* List Header */}
      <View style={styles.listHeaderRow}>
        <View>
          <Text style={styles.listHeaderTitle}>2 rescues near you</Text>
          <Text style={styles.listHeaderSubtitle}>
            Matched by distance, deadline, quantity & partner capacity.
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.listViewToggle}>List view</Text>
        </TouchableOpacity>
      </View>

      {/* Rescue Card 1 (Main/Hero) */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onSelectRescue(mainRescue)}
        style={styles.heroRescueCard}>
        <Image
          source={mainRescue.imageUri || require('@/assets/images/biryani_trays.jpg')}
          style={styles.heroCardImage}
          resizeMode="cover"
        />

        <View style={styles.heroCardContent}>
          {/* Pills row */}
          <View style={styles.cardBadgesRow}>
            <View style={styles.badgeAvailable}>
              <Text style={styles.badgeAvailableText}>Available</Text>
            </View>
            <View style={styles.badgeUrgent}>
              <Ionicons name="time-outline" size={12} color={AmanahColors.amber} />
              <Text style={styles.badgeUrgentText}>{mainRescue.timeLeft}</Text>
            </View>
          </View>

          <Text style={styles.rescueCardTitle}>{mainRescue.title}</Text>
          <Text style={styles.rescueCardSubtitle}>{mainRescue.subtitle}</Text>

          {/* Logistics meta */}
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={AmanahColors.textSecondary} />
            <Text style={styles.metaText}>
              {mainRescue.pickupDistance} · Gulberg III · {mainRescue.vehicleReq.split('·')[0].trim()}
            </Text>
          </View>

          {/* Receiving Partner */}
          <View style={styles.partnerRow}>
            <Ionicons name="shield-checkmark-outline" size={14} color={AmanahColors.primary} />
            <Text style={styles.partnerText}>
              {mainRescue.receiverName} can receive all {mainRescue.servings} meals
            </Text>
          </View>

          {/* View Details Link */}
          <View style={styles.viewDetailsRow}>
            <Text style={styles.viewDetailsText}>View rescue details</Text>
            <Feather name="arrow-up-right" size={16} color={AmanahColors.primary} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Rescue Card 2 (Bread & Daal) */}
      {secondRescue && (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onSelectRescue(secondRescue)}
          style={styles.compactRescueCard}>
          <Image
            source={secondRescue.imageUri || require('@/assets/images/bread_daal.jpg')}
            style={styles.compactThumb}
            resizeMode="cover"
          />
          <View style={styles.compactDetails}>
            <Text style={styles.compactTitle}>{secondRescue.title}</Text>
            <Text style={styles.compactSubtitle}>{secondRescue.subtitle}</Text>
            <View style={styles.compactActionRow}>
              <Text style={styles.compactDeadline}>Collect by 20:30</Text>
              <Text style={styles.compactDot}>·</Text>
              <Text style={styles.compactLink}>View details →</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Rescue Card 3 (Expired) */}
      {expiredRescue && (
        <View style={styles.expiredCard}>
          <Ionicons name="time-outline" size={16} color={AmanahColors.textMuted} />
          <View style={styles.expiredDetails}>
            <Text style={styles.expiredTitle}>{expiredRescue.title}</Text>
            <Text style={styles.expiredSubtitle}>Expired at 18:00 · No longer claimable</Text>
          </View>
          <Feather name="lock" size={14} color={AmanahColors.textMuted} />
        </View>
      )}
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
  headerSection: {
    marginBottom: 16,
  },
  titleLine: {
    fontSize: 24,
    fontWeight: '800',
    color: AmanahColors.text,
    lineHeight: 29,
  },
  subtitle: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    marginTop: 6,
  },
  searchBar: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchLocationText: {
    fontSize: 13,
    fontWeight: '600',
    color: AmanahColors.text,
  },
  filterIconButton: {
    padding: 4,
  },
  mapCard: {
    backgroundColor: '#E4ECE5',
    borderRadius: Radius.xl,
    padding: 14,
    marginBottom: 14,
    overflow: 'hidden',
  },
  mapCanvas: {
    height: 100,
    position: 'relative',
    justifyContent: 'center',
  },
  mapRoadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 52,
    height: 8,
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    borderRadius: 4,
  },
  mapRoadDiagonal: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: 36,
    height: 6,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    transform: [{ rotate: '18deg' }],
  },
  mapRoadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '32%',
    width: 6,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
  mapAreaLabel: {
    position: 'absolute',
    top: 8,
    left: 10,
    fontSize: 10,
    fontWeight: '700',
    color: AmanahColors.textSecondary,
    letterSpacing: 0.8,
  },
  mapPinPill: {
    position: 'absolute',
    top: 26,
    right: 48,
    backgroundColor: AmanahColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: Radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mapPinText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mapSecondaryPin: {
    position: 'absolute',
    bottom: 8,
    right: 32,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: AmanahColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapDotMarker: {
    position: 'absolute',
    top: 50,
    left: '31%',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AmanahColors.primary,
  },
  mapFooterText: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    marginTop: 6,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.full,
  },
  filterChipActive: {
    backgroundColor: AmanahColors.primaryLight,
  },
  filterChipInactive: {
    backgroundColor: AmanahColors.card,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
  },
  filterChipAmber: {
    backgroundColor: AmanahColors.amberLight,
  },
  filterChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AmanahColors.textSecondary,
  },
  filterChipTextActive: {
    color: AmanahColors.primary,
  },
  filterChipTextAmber: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AmanahColors.amber,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  listHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  listHeaderSubtitle: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    marginTop: 2,
  },
  listViewToggle: {
    fontSize: 12,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  heroRescueCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  heroCardImage: {
    width: '100%',
    height: 140,
  },
  heroCardContent: {
    padding: 14,
  },
  cardBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  badgeAvailable: {
    backgroundColor: AmanahColors.primaryLight,
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: Radius.full,
  },
  badgeAvailableText: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  badgeUrgent: {
    backgroundColor: AmanahColors.amberLight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: Radius.full,
  },
  badgeUrgentText: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.amber,
  },
  rescueCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 2,
  },
  rescueCardSubtitle: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  partnerText: {
    fontSize: 12,
    fontWeight: '500',
    color: AmanahColors.text,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AmanahColors.cardBorder,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  compactRescueCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  compactThumb: {
    width: 60,
    height: 60,
    borderRadius: Radius.md,
  },
  compactDetails: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  compactSubtitle: {
    fontSize: 11.5,
    color: AmanahColors.textSecondary,
    marginTop: 2,
  },
  compactActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  compactDeadline: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.text,
  },
  compactDot: {
    fontSize: 11,
    color: AmanahColors.textMuted,
  },
  compactLink: {
    fontSize: 11,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  expiredCard: {
    backgroundColor: AmanahColors.cardSubtle,
    borderRadius: Radius.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
  },
  expiredDetails: {
    flex: 1,
  },
  expiredTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: AmanahColors.textMuted,
  },
  expiredSubtitle: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    marginTop: 1,
  },
});
