import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface ActiveRescueScreenProps {
  onBack: () => void;
}

export function ActiveRescueScreen({ onBack }: ActiveRescueScreenProps) {
  const { activeRescueStage, confirmCollected, confirmDelivered } = useApp();

  const handlePhoneCall = (name: string, phone: string) => {
    Alert.alert(`Call ${name}`, `Calling ${phone}...`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Linking.openURL(`tel:${phone}`).catch(() => {}) },
    ]);
  };

  const handleMessage = (name: string) => {
    Alert.alert(`Message ${name}`, `Opening secure courier chat with ${name}...`, [
      { text: 'OK' },
    ]);
  };

  const handleDirections = () => {
    Alert.alert(
      'Pickup Directions',
      'Opening navigation to Barkat Catering (24 Main Blvd, Gulberg III, Lahore). Catering entrance is on back street.',
      [{ text: 'Start Route' }]
    );
  };

  const handleCollection = () => {
    Alert.alert(
      'Confirm Collection',
      'Have you inspected the 120 meal portions and loaded the 6 insulated crates into your vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Food Collected',
          onPress: () => {
            confirmCollected();
            Alert.alert('Status Updated', 'Collection confirmed. Now proceed to Rehmat Community Kitchen.');
          },
        },
      ]
    );
  };

  const handleDelivery = () => {
    Alert.alert(
      'Confirm Delivery',
      'Has Sana Ahmed at Rehmat Community Kitchen received the 120 meal portions?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Drop-off',
          onPress: () => {
            confirmDelivered();
            Alert.alert('Mission Complete!', 'JazakAllah! 120 people will receive a warm meal tonight.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Hero Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>You&apos;re the connection.</Text>
        <Text style={styles.subtitle}>Rescue AM-0128 · 120 meal portions</Text>
      </View>

      {/* Reserved Green Banner */}
      <View style={styles.reservedBanner}>
        <View style={styles.reservedTopRow}>
          <Feather name="lock" size={14} color="#FFFFFF" />
          <Text style={styles.reservedTitle}>Reserved for you, Hamza</Text>
        </View>
        <Text style={styles.reservedSubtext}>
          This donation is assigned only to you. Other volunteers can no longer claim it.
        </Text>
      </View>

      {/* Stepper Progress Bar */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepBar, styles.stepBarActive]} />
          <Text style={[styles.stepText, styles.stepTextActive]}>Claimed</Text>
        </View>
        <View style={styles.stepItem}>
          <View
            style={[
              styles.stepBar,
              activeRescueStage !== 'claimed' ? styles.stepBarActive : styles.stepBarInactive,
            ]}
          />
          <Text
            style={[
              styles.stepText,
              activeRescueStage !== 'claimed' ? styles.stepTextActive : styles.stepTextInactive,
            ]}>
            Collection
          </Text>
        </View>
        <View style={styles.stepItem}>
          <View
            style={[
              styles.stepBar,
              activeRescueStage === 'delivered' ? styles.stepBarActive : styles.stepBarInactive,
            ]}
          />
          <Text
            style={[
              styles.stepText,
              activeRescueStage === 'delivered' ? styles.stepTextActive : styles.stepTextInactive,
            ]}>
            Delivery
          </Text>
        </View>
      </View>

      {/* Current Objective Header */}
      <View style={styles.objectiveHeaderRow}>
        <Text style={styles.objectiveTitle}>
          {activeRescueStage === 'claimed'
            ? 'Next: collect the meals'
            : activeRescueStage === 'collected'
            ? 'Next: deliver to Rehmat Kitchen'
            : 'Completed: delivered successfully'}
        </Text>
        <View style={styles.inProgressBadge}>
          <Text style={styles.inProgressText}>
            {activeRescueStage === 'delivered' ? 'Completed' : 'In progress'}
          </Text>
        </View>
      </View>

      {/* Step 1 Card: Pickup Barkat Catering */}
      <View style={styles.card}>
        <View style={styles.cardHeaderBadge}>
          <MaterialCommunityIcons
            name="cube-outline"
            size={14}
            color={AmanahColors.primary}
          />
          <Text style={styles.cardHeaderBadgeText}>
            {activeRescueStage === 'claimed' ? 'COLLECTION · PENDING' : 'COLLECTION · COMPLETED'}
          </Text>
        </View>

        <Text style={styles.cardTitle}>Barkat Catering</Text>
        <Text style={styles.cardAddress}>24 Main Blvd, Gulberg III, Lahore</Text>
        <Text style={styles.cardSubAddress}>Catering entrance · 1.2 km away</Text>

        <View style={styles.cardTimeRow}>
          <Ionicons name="time-outline" size={14} color={AmanahColors.amber} />
          <Text style={styles.cardTimeText}>Collect by 20:00 · ETA 19:10</Text>
        </View>

        {/* Contact Row */}
        <View style={styles.contactRow}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Ayesha Khan</Text>
            <Text style={styles.contactRole}>Donor · Barkat Catering</Text>
          </View>
          <View style={styles.actionButtonsGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handlePhoneCall('Ayesha Khan', '+92 300 1234567')}
              style={styles.iconCircleButton}>
              <Ionicons name="call-outline" size={16} color={AmanahColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMessage('Ayesha Khan')}
              style={styles.iconCircleButton}>
              <Ionicons name="chatbubble-outline" size={16} color={AmanahColors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pickup directions button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDirections}
          style={styles.directionsButton}>
          <Text style={styles.directionsButtonText}>Open pickup directions</Text>
          <Feather name="navigation" size={15} color={AmanahColors.primary} />
        </TouchableOpacity>
      </View>

      {/* Step 2 Card: Delivery Rehmat Community Kitchen */}
      <View style={styles.card}>
        <View style={styles.cardHeaderBadge}>
          <MaterialCommunityIcons
            name="home-outline"
            size={14}
            color={AmanahColors.textSecondary}
          />
          <Text style={styles.cardHeaderBadgeTextMuted}>
            {activeRescueStage === 'claimed'
              ? 'DELIVERY · AWAITING COLLECTION'
              : activeRescueStage === 'collected'
              ? 'DELIVERY · EN ROUTE'
              : 'DELIVERY · COMPLETED'}
          </Text>
        </View>

        <Text style={styles.cardTitle}>Rehmat Community Kitchen</Text>

        <View style={styles.verifiedTag}>
          <Ionicons name="checkmark-circle-outline" size={13} color={AmanahColors.primary} />
          <Text style={styles.verifiedTagText}>Verified organization</Text>
        </View>

        <Text style={styles.cardAddress}>12 C Block, Model Town · 3.8 km onward</Text>
        <Text style={styles.cardSubAddress}>Receiving 120 meals · Open until 21:00</Text>

        {/* Coordinator Contact Row */}
        <View style={styles.contactRow}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Sana Ahmed</Text>
            <Text style={styles.contactRole}>Receiving coordinator</Text>
          </View>
          <View style={styles.actionButtonsGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handlePhoneCall('Sana Ahmed', '+92 321 9876543')}
              style={styles.iconCircleButton}>
              <Ionicons name="call-outline" size={16} color={AmanahColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMessage('Sana Ahmed')}
              style={styles.iconCircleButton}>
              <Ionicons name="chatbubble-outline" size={16} color={AmanahColors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Checklist Reminder Notice */}
      <View style={styles.reminderBox}>
        <Ionicons name="checkbox-outline" size={18} color={AmanahColors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.reminderTitle}>Before confirming collection</Text>
          <Text style={styles.reminderText}>
            Check quantity and condition with the donor. Keep meals covered in the supplied insulated crates.
          </Text>
        </View>
      </View>

      {/* Main Action CTA */}
      {activeRescueStage === 'claimed' ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleCollection}
          style={styles.mainActionButton}>
          <Text style={styles.mainActionText}>Confirm food collected</Text>
          <Feather name="check" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      ) : activeRescueStage === 'collected' ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleDelivery}
          style={styles.mainActionButton}>
          <Text style={styles.mainActionText}>Confirm food delivered</Text>
          <Feather name="check-circle" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <View style={[styles.mainActionButton, { backgroundColor: AmanahColors.success }]}>
          <Text style={styles.mainActionText}>Rescue Complete!</Text>
          <Feather name="check-circle" size={18} color="#FFFFFF" />
        </View>
      )}

      {/* Footer Support Links */}
      <View style={styles.footerLinksRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Alert.alert('Report Issue', 'Contact Amanah courier dispatch hotline at 042-111-AMANAH')}>
          <Text style={styles.footerLink}>Report an issue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Alert.alert('Cancel Claim', 'If you are unable to complete this rescue, we will re-open it for nearby volunteers.', [{ text: 'Keep Reservation' }, { text: 'Release Rescue', style: 'destructive', onPress: onBack }])}>
          <Text style={styles.footerLink}>Can&apos;t collect?</Text>
        </TouchableOpacity>
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
    paddingTop: 4,
    paddingBottom: 28,
  },
  titleSection: {
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: AmanahColors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
  },
  reservedBanner: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 16,
  },
  reservedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  reservedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reservedSubtext: {
    fontSize: 11.5,
    color: '#D2E2D7',
    lineHeight: 16,
  },
  stepperContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  stepItem: {
    flex: 1,
  },
  stepBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
  },
  stepBarActive: {
    backgroundColor: AmanahColors.primary,
  },
  stepBarInactive: {
    backgroundColor: AmanahColors.inputBorder,
  },
  stepText: {
    fontSize: 10.5,
  },
  stepTextActive: {
    fontWeight: '700',
    color: AmanahColors.text,
  },
  stepTextInactive: {
    fontWeight: '500',
    color: AmanahColors.textMuted,
  },
  objectiveHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  objectiveTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  inProgressBadge: {
    backgroundColor: AmanahColors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: Radius.full,
  },
  inProgressText: {
    fontSize: 11,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  card: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  cardHeaderBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: AmanahColors.primary,
    letterSpacing: 0.5,
  },
  cardHeaderBadgeTextMuted: {
    fontSize: 10,
    fontWeight: '800',
    color: AmanahColors.textSecondary,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 3,
  },
  cardAddress: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
  },
  cardSubAddress: {
    fontSize: 11.5,
    color: AmanahColors.textMuted,
    marginTop: 1,
    marginBottom: 8,
  },
  cardTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  cardTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: AmanahColors.amber,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AmanahColors.cardSubtle,
    borderRadius: Radius.md,
    padding: 10,
    marginBottom: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  contactRole: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
  },
  actionButtonsGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconCircleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AmanahColors.card,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionsButton: {
    backgroundColor: AmanahColors.primaryLight,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  directionsButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: AmanahColors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    marginTop: 4,
    marginBottom: 8,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: AmanahColors.primary,
  },
  reminderBox: {
    backgroundColor: '#EDF3EE',
    borderRadius: Radius.md,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  reminderTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 2,
  },
  reminderText: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
    lineHeight: 16,
  },
  mainActionButton: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  mainActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  footerLink: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AmanahColors.textSecondary,
  },
});
