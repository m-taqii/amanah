import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AmanahColors } from '@/constants/theme';
import { useApp, RescueItem } from '@/context/AppContext';
import { AmanahHeader } from '@/components/AmanahHeader';
import { BottomNavBar } from '@/components/BottomNavBar';

import { DonorHomeScreen } from '@/components/screens/DonorHomeScreen';
import { ShareSurplusScreen } from '@/components/screens/ShareSurplusScreen';
import { NearbyRescuesScreen } from '@/components/screens/NearbyRescuesScreen';
import { RescueDetailsScreen } from '@/components/screens/RescueDetailsScreen';
import { ActiveRescueScreen } from '@/components/screens/ActiveRescueScreen';
import { ImpactScreen } from '@/components/screens/ImpactScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';
import { DonationsListScreen } from '@/components/screens/DonationsListScreen';

export default function AppMainScreen() {
  const { role, activeTab, setActiveTab, rescues } = useApp();

  // Sub-navigation state within tabs
  const [donorSubScreen, setDonorSubScreen] = useState<'share' | 'activeRescue' | null>(null);
  const [volunteerSubScreen, setVolunteerSubScreen] = useState<'details' | 'activeRescue' | null>(null);
  const [selectedRescue, setSelectedRescue] = useState<RescueItem>(rescues[0]);

  // Determine back navigation configuration
  let backTitle: string | undefined;
  let onBack: (() => void) | undefined;

  if (role === 'donor') {
    if (donorSubScreen === 'share') {
      backTitle = 'Home';
      onBack = () => setDonorSubScreen(null);
    } else if (donorSubScreen === 'activeRescue') {
      backTitle = 'Home';
      onBack = () => setDonorSubScreen(null);
    }
  } else {
    if (volunteerSubScreen === 'details') {
      backTitle = 'Nearby rescues';
      onBack = () => setVolunteerSubScreen(null);
    } else if (volunteerSubScreen === 'activeRescue') {
      backTitle = 'My rescues';
      onBack = () => setVolunteerSubScreen(null);
    }
  }

  // Handle switching tabs
  const handleTabChange = (tab: string) => {
    setDonorSubScreen(null);
    setVolunteerSubScreen(null);
    setActiveTab(tab);
  };

  // Render appropriate screen
  const renderScreen = () => {
    if (role === 'donor') {
      if (donorSubScreen === 'share') {
        return (
          <ShareSurplusScreen
            onBack={() => setDonorSubScreen(null)}
            onSubmitSuccess={() => setDonorSubScreen('activeRescue')}
          />
        );
      }
      if (donorSubScreen === 'activeRescue') {
        return <ActiveRescueScreen onBack={() => setDonorSubScreen(null)} />;
      }
      if (activeTab === 'donations') {
        return (
          <DonationsListScreen
            onOpenDonate={() => setDonorSubScreen('share')}
            onSelectRescue={() => setDonorSubScreen('activeRescue')}
          />
        );
      }
      if (activeTab === 'impact') {
        return <ImpactScreen />;
      }
      if (activeTab === 'profile') {
        return <ProfileScreen />;
      }
      // Default: Donor Home Screen (Screen 1)
      return (
        <DonorHomeScreen
          onOpenDonate={() => setDonorSubScreen('share')}
          onTrackDonation={() => setDonorSubScreen('activeRescue')}
        />
      );
    }

    // Volunteer Mode
    if (volunteerSubScreen === 'details') {
      return (
        <RescueDetailsScreen
          rescue={selectedRescue}
          onBack={() => setVolunteerSubScreen(null)}
          onClaimSuccess={() => setVolunteerSubScreen('activeRescue')}
        />
      );
    }
    if (volunteerSubScreen === 'activeRescue') {
      return <ActiveRescueScreen onBack={() => setVolunteerSubScreen(null)} />;
    }
    if (activeTab === 'rescues') {
      return <ActiveRescueScreen onBack={() => setActiveTab('nearby')} />;
    }
    if (activeTab === 'impact') {
      return <ImpactScreen />;
    }
    if (activeTab === 'profile') {
      return <ProfileScreen />;
    }

    // Default: Nearby Rescues Screen (Screen 3)
    return (
      <NearbyRescuesScreen
        onSelectRescue={(rescue) => {
          setSelectedRescue(rescue);
          setVolunteerSubScreen('details');
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <AmanahHeader backTitle={backTitle} onBack={onBack} />
        <View style={styles.screenContainer}>{renderScreen()}</View>
        <BottomNavBar currentTab={activeTab} onSelectTab={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AmanahColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: AmanahColors.background,
  },
  screenContainer: {
    flex: 1,
  },
});
