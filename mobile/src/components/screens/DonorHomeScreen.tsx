import React from 'react';
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
import { useApp } from '@/context/AppContext';

interface DonorHomeScreenProps {
  onOpenDonate: () => void;
  onTrackDonation: () => void;
}

export function DonorHomeScreen({ onOpenDonate, onTrackDonation }: DonorHomeScreenProps) {
  const { activeRescueStage } = useApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Location Bar */}
      <View style={styles.locationRow}>
        <View style={styles.locationLeft}>
          <Ionicons name="location-outline" size={16} color={AmanahColors.textSecondary} />
          <Text style={styles.locationText}>Gulberg, Lahore</Text>
        </View>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={20} color={AmanahColors.text} />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      {/* Greeting Title */}
      <View style={styles.heroTextSection}>
        <Text style={styles.headline}>Good food.</Text>
        <Text style={styles.headline}>A better tomorrow.</Text>
        <Text style={styles.subGreeting}>
          Assalam-o-Alaikum, Ayesha. Let&apos;s put your surplus to good use.
        </Text>
      </View>

      {/* Hero Green Card */}
      <View style={styles.greenBannerCard}>
        <Image
          source={require('@/assets/images/biryani_trays.jpg')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <Text style={styles.bannerTitle}>Too good to go to waste.</Text>
        <Text style={styles.bannerDescription}>
          From wedding tables to community kitchens. Share what&apos;s left, with care.
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenDonate}
          style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate surplus food</Text>
          <Feather name="plus" size={18} color={AmanahColors.primary} />
        </TouchableOpacity>
      </View>

      {/* Active Donation Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your active donation</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onTrackDonation}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.donationCard}>
        {/* Card Header */}
        <View style={styles.cardTopRow}>
          <View style={styles.statusBadge}>
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={14}
              color={AmanahColors.primary}
            />
            <Text style={styles.statusBadgeText}>
              {activeRescueStage === 'collected' ? 'In transit' : 'Pickup arranged'}
            </Text>
          </View>
          <Text style={styles.donationId}>AM-0128</Text>
        </View>

        {/* Donation Details */}
        <Text style={styles.itemTitle}>120 untouched meal portions</Text>
        <Text style={styles.itemSubtitle}>Barkat Catering · Wedding surplus</Text>

        {/* Volunteer Info Block */}
        <View style={styles.volunteerBlock}>
          <View style={styles.volunteerAvatar}>
            <Ionicons name="person-outline" size={16} color={AmanahColors.primary} />
          </View>
          <View style={styles.volunteerDetails}>
            <Text style={styles.volunteerName}>Hamza is collecting your donation</Text>
            <Text style={styles.volunteerStatus}>Volunteer · Pickup expected by 19:10</Text>
          </View>
        </View>

        {/* Collect by notice */}
        <View style={styles.deadlineRow}>
          <Ionicons name="time-outline" size={15} color={AmanahColors.amber} />
          <Text style={styles.deadlineText}>Collect by 20:00 today</Text>
        </View>

        {/* Track donation CTA */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onTrackDonation}
          style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track donation</Text>
          <MaterialCommunityIcons
            name="routes"
            size={18}
            color={AmanahColors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Impact Summary Box */}
      <View style={styles.impactCard}>
        <View style={styles.impactIconContainer}>
          <MaterialCommunityIcons
            name="hand-heart-outline"
            size={22}
            color={AmanahColors.primary}
          />
        </View>
        <View style={styles.impactInfo}>
          <Text style={styles.impactTitle}>760 meals shared so far</Text>
          <Text style={styles.impactSubtitle}>8 completed donations · Illustrative data</Text>
        </View>
      </View>

      {/* Legal / Trust Footer Note */}
      <Text style={styles.trustFooter}>
        Your donations go through verified organizations, never to public individual claims.
      </Text>
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
    paddingBottom: 24,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 16,
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    fontWeight: '500',
  },
  bellButton: {
    position: 'relative',
    padding: 4,
  },
  bellBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AmanahColors.amber,
  },
  heroTextSection: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: AmanahColors.text,
    lineHeight: 31,
  },
  subGreeting: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  greenBannerCard: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.xl,
    padding: 16,
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: 155,
    borderRadius: Radius.lg,
    marginBottom: 14,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AmanahColors.textInverse,
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 12.5,
    color: '#D4E2D9',
    lineHeight: 17,
    marginBottom: 14,
  },
  donateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.full,
    paddingVertical: 13,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  donationCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AmanahColors.primaryLight,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  donationId: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.textMuted,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
    marginBottom: 14,
  },
  volunteerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmanahColors.cardSubtle,
    padding: 10,
    borderRadius: Radius.md,
    gap: 10,
    marginBottom: 12,
  },
  volunteerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AmanahColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerDetails: {
    flex: 1,
  },
  volunteerName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  volunteerStatus: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    marginTop: 1,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  deadlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: AmanahColors.amber,
  },
  trackButton: {
    backgroundColor: AmanahColors.primaryLight,
    borderRadius: Radius.md,
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  impactCard: {
    backgroundColor: '#E7EFEA',
    borderRadius: Radius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  impactIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D7E7DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  impactInfo: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  impactSubtitle: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    marginTop: 2,
  },
  trustFooter: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 12,
  },
});
