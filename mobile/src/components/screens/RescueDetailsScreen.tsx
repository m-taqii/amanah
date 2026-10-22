import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp, RescueItem } from '@/context/AppContext';

interface RescueDetailsScreenProps {
  rescue: RescueItem;
  onBack: () => void;
  onClaimSuccess: () => void;
}

export function RescueDetailsScreen({
  rescue,
  onBack,
  onClaimSuccess,
}: RescueDetailsScreenProps) {
  const { claimRescue } = useApp();

  const handleClaim = () => {
    claimRescue(rescue.id);
    Alert.alert(
      'Rescue Claimed!',
      'This donation is now exclusively reserved for you. Please head to Barkat Catering for pickup.',
      [{ text: 'Start Pickup', onPress: onClaimSuccess }]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Hero Image */}
      <Image
        source={rescue.imageUri || require('@/assets/images/biryani_trays.jpg')}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* Badges Row */}
      <View style={styles.badgeRow}>
        <View style={styles.availableBadge}>
          <Ionicons name="cube-outline" size={13} color={AmanahColors.primary} />
          <Text style={styles.availableBadgeText}>Available to claim</Text>
        </View>
        <View style={styles.urgentBadge}>
          <Ionicons name="time-outline" size={13} color={AmanahColors.amber} />
          <Text style={styles.urgentBadgeText}>75 min left</Text>
        </View>
      </View>

      {/* Titles */}
      <Text style={styles.title}>{rescue.title}</Text>
      <Text style={styles.subtitle}>{rescue.subtitle}</Text>

      {/* Collect deadline row */}
      <View style={styles.deadlineContainer}>
        <Ionicons name="time-outline" size={15} color={AmanahColors.amber} />
        <Text style={styles.deadlineLabel}>Collect today before 20:00</Text>
      </View>

      {/* Logistics Details Card */}
      <View style={styles.logisticsCard}>
        {/* Pickup Row */}
        <View style={styles.logisticsItem}>
          <View style={styles.logisticsIconContainer}>
            <Ionicons name="location-outline" size={16} color={AmanahColors.primary} />
          </View>
          <View style={styles.logisticsItemContent}>
            <Text style={styles.logisticsItemTitle}>
              Pickup · {rescue.pickupDistance} away
            </Text>
            <Text style={styles.logisticsItemText}>
              24 Main Boulevard, Gulberg III, Lahore. Use the catering entrance.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Transport Row */}
        <View style={styles.logisticsItem}>
          <View style={styles.logisticsIconContainer}>
            <MaterialCommunityIcons name="car-outline" size={16} color={AmanahColors.primary} />
          </View>
          <View style={styles.logisticsItemContent}>
            <Text style={styles.logisticsItemTitle}>{rescue.vehicleReq}</Text>
            <Text style={styles.logisticsItemText}>{rescue.dietaryNotes}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Donor Contact Preview Row */}
        <View style={styles.logisticsItem}>
          <View style={styles.logisticsItemContent}>
            <Text style={styles.logisticsItemTitle}>Ayesha - Donor contact</Text>
            <Text style={styles.logisticsItemText}>Coordinate access after claiming</Text>
          </View>
          <View style={styles.chatIconPlaceholder}>
            <Ionicons name="chatbubble-outline" size={16} color={AmanahColors.textMuted} />
          </View>
        </View>
      </View>

      {/* Section: Know before you collect */}
      <Text style={styles.sectionHeader}>Know before you collect</Text>

      {/* 2 Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>PREPARED TODAY</Text>
          <Text style={styles.statValue}>17:30</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>FOOD CATEGORY</Text>
          <Text style={styles.statValue}>{rescue.category}</Text>
        </View>
      </View>

      {/* Donor reports text */}
      <Text style={styles.donorReportsText}>
        Donor reports: {rescue.storageNotes}
      </Text>

      {/* Verified Receiving Organization Card */}
      <View style={styles.verifiedCard}>
        <View style={styles.verifiedHeader}>
          <Ionicons name="checkmark-circle-outline" size={14} color={AmanahColors.primary} />
          <Text style={styles.verifiedHeaderText}>VERIFIED RECEIVING ORGANIZATION</Text>
        </View>

        <View style={styles.verifiedBody}>
          <MaterialCommunityIcons
            name="home-heart"
            size={20}
            color={AmanahColors.primary}
            style={{ marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.verifiedOrgName}>{rescue.receiverName}</Text>
            <Text style={styles.verifiedDistance}>{rescue.receiverLocation}</Text>
            <Text style={styles.verifiedCapacity}>{rescue.receiverMaxCapacity}</Text>
          </View>
        </View>

        <Text style={styles.verifiedDisclaimer}>
          Organization verification is not food-safety certification.
        </Text>
      </View>

      {/* General Liability Notice */}
      <View style={styles.liabilityNotice}>
        <Ionicons name="information-circle-outline" size={17} color={AmanahColors.primary} />
        <Text style={styles.liabilityText}>
          Donors and receiving organizations are responsible for food condition and suitability.
          Amanah coordinates; it does not certify food safety.
        </Text>
      </View>

      {/* Big Action CTA */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleClaim}
        style={styles.claimButton}>
        <Text style={styles.claimButtonText}>Claim this rescue</Text>
        <MaterialCommunityIcons name="handshake-outline" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.claimDisclaimer}>
        Claiming reserves this donation for you only. Unclaimed listings close automatically at 20:00.
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
    paddingTop: 4,
    paddingBottom: 28,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: Radius.xl,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  availableBadge: {
    backgroundColor: AmanahColors.primaryLight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  availableBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  urgentBadge: {
    backgroundColor: AmanahColors.amberLight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  urgentBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.amber,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: AmanahColors.text,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    marginBottom: 10,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  deadlineLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AmanahColors.amber,
  },
  logisticsCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 14,
    marginBottom: 18,
  },
  logisticsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  logisticsIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: AmanahColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  logisticsItemContent: {
    flex: 1,
  },
  logisticsItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 2,
  },
  logisticsItemText: {
    fontSize: 11.5,
    color: AmanahColors.textSecondary,
    lineHeight: 16,
  },
  chatIconPlaceholder: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: AmanahColors.cardBorder,
    marginVertical: 12,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 12,
  },
  statLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: AmanahColors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  donorReportsText: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
    lineHeight: 17,
    marginBottom: 16,
  },
  verifiedCard: {
    backgroundColor: '#E7EFEA',
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 14,
  },
  verifiedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  verifiedHeaderText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: AmanahColors.primary,
    letterSpacing: 0.5,
  },
  verifiedBody: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  verifiedOrgName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  verifiedDistance: {
    fontSize: 11.5,
    color: AmanahColors.textSecondary,
    marginTop: 2,
  },
  verifiedCapacity: {
    fontSize: 11.5,
    color: AmanahColors.text,
    marginTop: 2,
  },
  verifiedDisclaimer: {
    fontSize: 10,
    color: AmanahColors.textSecondary,
    fontStyle: 'italic',
  },
  liabilityNotice: {
    backgroundColor: '#EDF3EE',
    borderRadius: Radius.md,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  liabilityText: {
    flex: 1,
    fontSize: 11,
    color: AmanahColors.textSecondary,
    lineHeight: 16,
  },
  claimButton: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  claimButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  claimDisclaimer: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    textAlign: 'center',
    lineHeight: 15,
  },
});
