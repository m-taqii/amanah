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
import { login as loginApi } from '@/lib/api';
import { useApp } from '@/context/AppContext';

interface LoginScreenProps {
  onNavigateToRegister?: () => void;
}

export function LoginScreen({ onNavigateToRegister }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<'donor' | 'volunteer'>('donor');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login: setAuthToken } = useApp();
  
  const handleLogin = async () => {
    const trimmedId = identifier.trim();
    if (!trimmedId || !password) {
      Alert.alert('Required Fields', 'Please enter your email or phone number and password');
      return;
    }

    try {
      setLoading(true);
      const res = await loginApi(trimmedId, password, selectedRole);

      if (res?.token) {
        const userRole = (res.user?.role === 'donor' || res.user?.role === 'volunteer')
          ? res.user.role
          : selectedRole;
        await setAuthToken(res.token, userRole, res.user);
      } else {
        Alert.alert('Login Failed', res?.message || 'Invalid credentials');
      }
    } catch (error: any) {
      console.log('Login error:', error);
      let errorMsg = 'Could not connect to the API server. Please check your network connection and server status.';
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error?.message && !error.message.includes('Network Error')) {
        errorMsg = error.message;
      }
      Alert.alert('Login Error', errorMsg);
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
            <Text style={styles.headline}>Good food.</Text>
            <Text style={styles.headline}>A shared trust.</Text>
            <Text style={styles.subGreeting}>
              Sign in to manage surplus meals, coordinate food rescues, or dispatch to community kitchens in Lahore.
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
                size={17}
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

          {/* Login Form Card */}
          <View style={styles.formCard}>
            {/* Email / Phone Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                {selectedRole === 'donor' ? 'Email or Business Phone' : 'Email or Mobile Number'}
              </Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={AmanahColors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder={
                    selectedRole === 'donor'
                      ? 'e.g. ayesha@barkatcatering.pk'
                      : 'e.g. hamza@amanah.pk'
                  }
                  placeholderTextColor={AmanahColors.placeholder}
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={AmanahColors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your password"
                  placeholderTextColor={AmanahColors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
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

            {/* Remember Me Checkbox */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.checkboxRow}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxText}>Keep me signed in on this device</Text>
            </TouchableOpacity>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
              style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    {selectedRole === 'donor' ? 'Sign In as Donor' : 'Sign In as Volunteer'}
                  </Text>
                  <Feather name="arrow-right" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign Up Footer Link */}
          <View style={styles.signupFooter}>
            <Text style={styles.signupPrompt}>Don&apos;t have an Amanah account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToRegister}>
              <Text style={styles.signupLink}>Register here</Text>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  logoSquare: {
    width: 32,
    height: 32,
    borderRadius: Radius.md,
    backgroundColor: AmanahColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: AmanahColors.primary,
    letterSpacing: -0.5,
  },
  heroSection: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: AmanahColors.text,
    lineHeight: 33,
  },
  subGreeting: {
    fontSize: 13,
    color: AmanahColors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
  roleTabsContainer: {
    flexDirection: 'row',
    backgroundColor: AmanahColors.cardSubtle,
    borderRadius: Radius.full,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AmanahColors.cardBorder,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: Radius.full,
  },
  roleTabActive: {
    backgroundColor: AmanahColors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  roleTabText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: AmanahColors.textSecondary,
  },
  roleTabTextActive: {
    fontWeight: '700',
    color: AmanahColors.primary,
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
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AmanahColors.text,
    marginBottom: 6,
  },
  forgotPasswordText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: AmanahColors.primary,
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
    paddingVertical: 11,
    fontSize: 13.5,
    color: AmanahColors.text,
  },
  eyeIconButton: {
    padding: 6,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 2,
    marginBottom: 18,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: AmanahColors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AmanahColors.card,
  },
  checkboxActive: {
    backgroundColor: AmanahColors.primary,
    borderColor: AmanahColors.primary,
  },
  checkboxText: {
    fontSize: 12,
    color: AmanahColors.textSecondary,
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
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  signupFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  signupPrompt: {
    fontSize: 12.5,
    color: AmanahColors.textSecondary,
  },
  signupLink: {
    fontSize: 12.5,
    fontWeight: '700',
    color: AmanahColors.primary,
  },
  trustFooterBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: AmanahColors.primaryLight,
    borderRadius: Radius.md,
    padding: 12,
  },
  trustFooterText: {
    flex: 1,
    fontSize: 11,
    color: AmanahColors.primary,
    lineHeight: 16,
  },
});
