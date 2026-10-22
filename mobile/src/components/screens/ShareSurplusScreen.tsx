import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface ShareSurplusScreenProps {
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export function ShareSurplusScreen({ onBack, onSubmitSuccess }: ShareSurplusScreenProps) {
  const { addDonation } = useApp();

  const [title, setTitle] = useState('Untouched chicken biryani meals');
  const [category] = useState('Cooked meals');
  const [servings, setServings] = useState('120');
  const [location, setLocation] = useState('Barkat Catering, 24 Main Blvd, Gulberg III, Lahore');
  const [preparedAt, setPreparedAt] = useState('Today, 17:30');
  const [collectBy, setCollectBy] = useState('Today, 20:00');
  const [storage] = useState('Hot-held in covered catering warmers');
  const [notes, setNotes] = useState(
    'Untouched, individually packed. Contains dairy. Bring a car; 6 insulated crates provided.'
  );
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = () => {
    if (!agreed) {
      Alert.alert('Agreement required', 'Please confirm the details are accurate before submitting.');
      return;
    }

    addDonation({
      title,
      category,
      servings: parseInt(servings, 10) || 100,
      pickupLocation: location,
      preparedTime: preparedAt,
      collectDeadline: collectBy,
      storageNotes: storage,
      dietaryNotes: notes,
    });

    Alert.alert(
      'Donation Posted!',
      'Your surplus listing has been broadcast to verified volunteer couriers in Gulberg.',
      [{ text: 'View Status', onPress: onSubmitSuccess }]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Title & Subtitle */}
      <Text style={styles.screenTitle}>Share your surplus</Text>
      <Text style={styles.screenSubtitle}>
        A few details help the right people collect it in time.
      </Text>

      {/* Stepper badge */}
      <View style={styles.stepperRow}>
        <View style={styles.stepBadgeActive}>
          <Text style={styles.stepBadgeText}>1. Food & collection</Text>
        </View>
        <Text style={styles.nextStepText}>Next: review & post</Text>
      </View>

      {/* Photo Container */}
      <View style={styles.photoContainer}>
        <Image
          source={require('@/assets/images/biryani_trays.jpg')}
          style={styles.photo}
          resizeMode="cover"
        />
        <View style={styles.photoMetaRow}>
          <Text style={styles.photoMetaText}>Photo added · untouched meal trays</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.changePhotoText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Donation Title Field */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Donation title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Fresh cooked biryani"
          placeholderTextColor={AmanahColors.placeholder}
        />
      </View>

      {/* 2-column: Category and Servings */}
      <View style={styles.twoColumnRow}>
        <View style={[styles.fieldGroup, { flex: 1.4 }]}>
          <Text style={styles.fieldLabel}>Food category</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.dropdownInput}>
            <Text style={styles.dropdownValue}>{category}</Text>
            <Feather name="chevron-down" size={16} color={AmanahColors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>Est. servings</Text>
          <TextInput
            style={styles.textInput}
            value={servings}
            onChangeText={setServings}
            keyboardType="number-pad"
            placeholder="120"
            placeholderTextColor={AmanahColors.placeholder}
          />
        </View>
      </View>

      {/* Pickup Location */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Pickup location</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.textInput, styles.inputFlex]}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter venue or kitchen address"
            placeholderTextColor={AmanahColors.placeholder}
          />
          <Ionicons
            name="location-outline"
            size={18}
            color={AmanahColors.textSecondary}
            style={styles.rightIcon}
          />
        </View>
      </View>

      {/* 2-column: Prepared at & Collect by */}
      <View style={styles.twoColumnRow}>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>Prepared at</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.textInput, styles.inputFlex]}
              value={preparedAt}
              onChangeText={setPreparedAt}
            />
            <Ionicons
              name="time-outline"
              size={16}
              color={AmanahColors.textSecondary}
              style={styles.rightIcon}
            />
          </View>
        </View>

        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>Collect by</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.textInput, styles.inputFlex]}
              value={collectBy}
              onChangeText={setCollectBy}
            />
            <Ionicons
              name="time-outline"
              size={16}
              color={AmanahColors.textSecondary}
              style={styles.rightIcon}
            />
          </View>
        </View>
      </View>

      {/* Deadline Notice */}
      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={15} color={AmanahColors.amber} />
        <Text style={styles.infoText}>The listing closes at your collection deadline.</Text>
      </View>

      {/* Storage conditions */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Storage conditions</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.dropdownInput}>
          <Text style={styles.dropdownValue}>{storage}</Text>
          <Feather name="chevron-down" size={16} color={AmanahColors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Handling & dietary notes */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Handling & dietary notes</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          placeholder="Details on food packaging, allergen notes, vehicle requirements..."
          placeholderTextColor={AmanahColors.placeholder}
        />
      </View>

      {/* Confirmation Checkbox */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setAgreed(!agreed)}
        style={styles.checkboxRow}>
        <View style={[styles.checkboxBox, agreed && styles.checkboxChecked]}>
          {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
        </View>
        <Text style={styles.checkboxLabel}>
          I confirm the details are accurate and the food is suitable for donation at collection.
        </Text>
      </TouchableOpacity>

      {/* Safety Notice Box */}
      <View style={styles.safetyBox}>
        <Ionicons name="information-circle-outline" size={18} color={AmanahColors.primary} />
        <Text style={styles.safetyText}>
          Donors and receiving organizations are responsible for food condition and suitability.
          Amanah coordinates; it does not certify food safety.
        </Text>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleSubmit}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Review donation</Text>
        <Feather name="arrow-right" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Footer restriction */}
      <Text style={styles.subtextFooter}>
        Only suitable volunteers and verified partners can claim.
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
    paddingTop: 8,
    paddingBottom: 28,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: AmanahColors.text,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    marginBottom: 14,
    lineHeight: 18,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  stepBadgeActive: {
    backgroundColor: AmanahColors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  nextStepText: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    fontWeight: '500',
  },
  photoContainer: {
    marginBottom: 18,
  },
  photo: {
    width: '100%',
    height: 140,
    borderRadius: Radius.lg,
    marginBottom: 6,
  },
  photoMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  photoMetaText: {
    fontSize: 11,
    color: AmanahColors.textSecondary,
  },
  changePhotoText: {
    fontSize: 11,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: AmanahColors.card,
    borderWidth: 1,
    borderColor: AmanahColors.inputBorder,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: AmanahColors.text,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dropdownInput: {
    backgroundColor: AmanahColors.card,
    borderWidth: 1,
    borderColor: AmanahColors.inputBorder,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownValue: {
    fontSize: 13,
    color: AmanahColors.text,
    fontWeight: '500',
  },
  inputWithIcon: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputFlex: {
    paddingRight: 38,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -4,
    marginBottom: 14,
  },
  infoText: {
    fontSize: 11,
    color: AmanahColors.amber,
    fontWeight: '500',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
    lineHeight: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: 10,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: AmanahColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: AmanahColors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: AmanahColors.text,
    lineHeight: 17,
  },
  safetyBox: {
    backgroundColor: '#E7EFEA',
    borderRadius: Radius.md,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  safetyText: {
    flex: 1,
    fontSize: 11,
    color: AmanahColors.textSecondary,
    lineHeight: 16,
  },
  submitButton: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    marginBottom: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtextFooter: {
    fontSize: 11,
    color: AmanahColors.textMuted,
    textAlign: 'center',
  },
});
