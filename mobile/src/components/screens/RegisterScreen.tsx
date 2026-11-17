import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AmanahColors, Radius } from '@/constants/theme';
import { register as registerApi, API_BASE_URL } from '@/lib/api';
import { useApp, UserRole } from '@/context/AppContext';

interface RegisterScreenProps {
  onNavigateToLogin?: () => void;
}

export function RegisterScreen({ onNavigateToLogin }: RegisterScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useApp();

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      Alert.alert('Required Field', 'Please enter your full name or organization name.');
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      Alert.alert('Required Field', 'Please enter a valid email address.');
      return;
    }
    if (!trimmedPhone) {
      Alert.alert('Required Field', 'Please enter your phone number.');
      return;
    }
    if (!trimmedAddress) {
      Alert.alert('Required Field', 'Please enter your address or pickup area.');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and Confirm Password do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await registerApi(
        trimmedName,
        trimmedEmail,
        trimmedPhone,
        password,
        selectedRole,
        trimmedAddress
      );

      if (res?.token) {
        const userRole = (res.user?.role === 'donor' || res.user?.role === 'volunteer')
          ? res.user.role
          : selectedRole;
        await login(res.token, userRole, res.user);
      } else {
        Alert.alert('Registration Failed', res?.message || 'Could not complete registration.');
      }
    } catch (error: any) {
      console.log('Registration error:', error);
      let errorMsg = `Could not connect to:\n${API_BASE_URL}\n\nPlease check your network connection and server status.`;
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error?.response?.status) {
        errorMsg = `Server error ${error.response.status}: ${error.response.data?.message || 'Please try again'}`;
      } else if (error?.message && !error.message.includes('Network Error')) {
        errorMsg = error.message;
      }
      Alert.alert('Registration Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* Top Brand Logo */}
          <View style={styles.brandRow}>
            <View style={styles.logoSquare}>
              <Ionicons name="leaf-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.brandText}>Amanah</Text>
          </View>

          {/* Hero Typography */}
          <View style={styles.heroSection}>
            <Text style={styles.headline}>Join Amanah.</Text>
            <Text style={styles.headline}>A shared trust.</Text>
            <Text style={styles.subGreeting}>
              Create an account to manage surplus food donations or volunteer to rescue meals across Lahore.
            </Text>
          </View>

          {/* Role / Persona Selector */}
          <View style={styles.roleTabsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedRole('donor')}
              style={[
                styles.roleTab,
                selectedRole === 'donor' && styles.roleTabActive,
              ]}>
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={16}
                color={selectedRole === 'donor' ? AmanahColors.primary : AmanahColors.textSecondary}
              />
              <Text
                style={[
                  styles.roleTabText,
                  selectedRole === 'donor' && styles.roleTabTextActive,
                ]}>
                Food Donor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedRole('volunteer')}
              style={[
                styles.roleTab,
                selectedRole === 'volunteer' && styles.roleTabActive,
              ]}>
              <MaterialCommunityIcons
                name="bike-fast"
                size={16}
                color={selectedRole === 'volunteer' ? AmanahColors.primary : AmanahColors.textSecondary}
              />
              <Text
                style={[
                  styles.roleTabText,
                  selectedRole === 'volunteer' && styles.roleTabTextActive,
                ]}>
                Volunteer Courier
              </Text>
            </TouchableOpacity>
          </View>

          {/* Registration Form Card */}
          <View style={styles.formCard}>
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                {selectedRole === 'donor' ? 'Organization or Donor Name' : 'Full Name'}
              </Text>
              <View style={styles.inputContainer}>
                <Feather name="user" size={16} color={AmanahColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder={selectedRole === 'donor' ? 'e.g. Barkat Catering' : 'e.g. Hamza Malik'}
                  placeholderTextColor={AmanahColors.placeholder}
                  style={styles.inputField}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Feather name="mail" size={16} color={AmanahColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  placeholderTextColor={AmanahColors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.inputField}
                />
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Feather name="phone" size={16} color={AmanahColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="e.g. 03001234567"
                  placeholderTextColor={AmanahColors.placeholder}
                  keyboardType="phone-pad"
                  style={styles.inputField}
                />
              </View>
            </View>

            {/* Address / Location */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                {selectedRole === 'donor' ? 'Pickup Address' : 'Area / Neighborhood'}
              </Text>
              <View style={styles.inputContainer}>
                <Feather name="map-pin" size={16} color={AmanahColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="e.g. 24 Main Blvd, Gulberg III, Lahore"
                  placeholderTextColor={AmanahColors.placeholder}
                  style={styles.inputField}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={16} color={AmanahColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor={AmanahColors.placeholder}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  style={styles.inputField}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIconButton}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={AmanahColors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <Feather name="shield" size={16} color={AmanahColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Re-enter your password"
                  placeholderTextColor={AmanahColors.placeholder}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  style={styles.inputField}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIconButton}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={AmanahColors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
              style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    {selectedRole === 'donor' ? 'Register as Food Donor' : 'Register as Volunteer'}
                  </Text>
                  <Feather name="arrow-right" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign In Footer Link */}
          <View style={styles.signinFooter}>
            <Text style={styles.signinPrompt}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToLogin}>
              <Text style={styles.signinLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Trust Footnote */}
          <View style={styles.trustFooterBox}>
            <Ionicons name="shield-checkmark-outline" size={15} color={AmanahColors.primary} />
            <Text style={styles.trustFooterText}>
              Amanah coordinates directly with verified welfare kitchens across Lahore. Food condition and dignity first.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AmanahColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: AmanahColors.background,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSquare: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: AmanahColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: AmanahColors.primary,
    letterSpacing: -0.3,
  },
  heroSection: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: AmanahColors.text,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    lineHeight: 19,
    marginTop: 8,
  },
  roleTabsContainer: {
    flexDirection: 'row',
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.lg,
    padding: 4,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 10,
    borderRadius: Radius.md,
  },
  roleTabActive: {
    backgroundColor: AmanahColors.primaryLight,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: AmanahColors.textSecondary,
  },
  roleTabTextActive: {
    color: AmanahColors.primary,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: AmanahColors.card,
    borderRadius: Radius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmanahColors.background,
    borderWidth: 1,
    borderColor: AmanahColors.inputBorder,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13.5,
    color: AmanahColors.text,
  },
  eyeIconButton: {
    padding: 6,
  },
  primaryButton: {
    backgroundColor: AmanahColors.primary,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  signinFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  signinPrompt: {
    fontSize: 12.5,
    color: AmanahColors.textSecondary,
  },
  signinLink: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  trustFooterBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  trustFooterText: {
    flex: 1,
    fontSize: 11,
    color: AmanahColors.textMuted,
    lineHeight: 16,
  },
});
