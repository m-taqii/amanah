import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export function ProfileScreen() {
  const { role, setRole } = useApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>{role === 'donor' ? 'AK' : 'HM'}</Text>
        </View>
        <Text style={styles.profileName}>
          {role === 'donor' ? 'Ayesha Khan' : 'Hamza Malik'}
        </Text>
        <Text style={styles.profileAffiliation}>
          {role === 'donor'
            ? 'Barkat Catering & Banquet Services'
            : 'Verified Courier · Gulberg Chapter'}
        </Text>

        <View style={styles.verifiedBadge}>
          <Ionicons name="shield-checkmark" size={13} color={AmanahColors.primary} />
          <Text style={styles.verifiedBadgeText}>Verified Identity</Text>
        </View>
      </View>

      {/* Role Switcher */}
      <View style={styles.roleSwitchCard}>
        <Text style={styles.switchTitle}>Switch Perspective</Text>
        <Text style={styles.switchDesc}>
          Experience the Amanah platform as a food donor or volunteer rescue courier.
        </Text>

        <View style={styles.switchButtonGroup}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setRole('donor')}
            style={[
              styles.switchOption,
              role === 'donor' && styles.switchOptionActive,
            ]}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={16}
              color={role === 'donor' ? '#FFFFFF' : AmanahColors.textSecondary}
            />
            <Text
              style={[
                styles.switchOptionText,
                role === 'donor' && styles.switchOptionTextActive,
              ]}>
              Donor Mode
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setRole('volunteer')}
            style={[
              styles.switchOption,
              role === 'volunteer' && styles.switchOptionActive,
            ]}>
            <MaterialCommunityIcons
              name="bike-fast"
              size={16}
              color={role === 'volunteer' ? '#FFFFFF' : AmanahColors.textSecondary}
            />
            <Text
              style={[
                styles.switchOptionText,
                role === 'volunteer' && styles.switchOptionTextActive,
              ]}>
              Volunteer Mode
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings list */}
      <View style={styles.menuGroup}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Saved Locations', 'Barkat Catering (Gulberg III)')}>
          <Ionicons name="location-outline" size={18} color={AmanahColors.text} />
          <Text style={styles.menuLabel}>Saved Locations</Text>
          <Feather name="chevron-right" size={16} color={AmanahColors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Notifications', 'Push alerts enabled for rescues within 5 km.')}>
          <Ionicons name="notifications-outline" size={18} color={AmanahColors.text} />
          <Text style={styles.menuLabel}>Notifications & Alerts</Text>
          <Feather name="chevron-right" size={16} color={AmanahColors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Food Safety Charter', 'Amanah follows Punjab Food Authority surplus handling guidelines.')}>
          <Ionicons name="document-text-outline" size={18} color={AmanahColors.text} />
          <Text style={styles.menuLabel}>Food Safety Guidelines</Text>
          <Feather name="chevron-right" size={16} color={AmanahColors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Help & Dispatch', 'Call 24/7 volunteer hotline at 042-111-AMANAH')}>
          <Ionicons name="help-circle-outline" size={18} color={AmanahColors.text} />
          <Text style={styles.menuLabel}>Help & Courier Support</Text>
          <Feather name="chevron-right" size={16} color={AmanahColors.textMuted} />
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>Amanah v1.0.0 · Lahore, Pakistan</Text>
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
  profileCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AmanahColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: '800',
    color: AmanahColors.primary,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: AmanahColors.text,
  },
  profileAffiliation: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
    marginTop: 3,
    marginBottom: 10,
    textAlign: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AmanahColors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  verifiedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  roleSwitchCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    padding: 16,
    marginBottom: 18,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AmanahColors.text,
  },
  switchDesc: {
    fontSize: 11.5,
    color: AmanahColors.textSecondary,
    marginTop: 2,
    marginBottom: 12,
  },
  switchButtonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  switchOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: AmanahColors.cardSubtle,
  },
  switchOptionActive: {
    backgroundColor: AmanahColors.primary,
  },
  switchOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: AmanahColors.textSecondary,
  },
  switchOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  menuGroup: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AmanahColors.cardBorder,
  },
  menuLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: AmanahColors.text,
    marginLeft: 12,
  },
  versionText: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    textAlign: 'center',
  },
});
