import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'donor' | 'volunteer';
export type RescueStage = 'claimed' | 'collected' | 'delivered';

export interface RescueItem {
  id: string;
  title: string;
  subtitle: string;
  servings: number;
  category: string;
  pickupLocation: string;
  pickupDistance: string;
  vehicleReq: string;
  preparedTime: string;
  collectDeadline: string;
  timeLeft: string;
  storageNotes: string;
  dietaryNotes: string;
  donorName: string;
  donorPhone: string;
  receiverName: string;
  receiverLocation: string;
  receiverContact: string;
  receiverPhone: string;
  receiverMaxCapacity: string;
  status: 'available' | 'claimed' | 'collected' | 'delivered' | 'expired';
  imageUri?: any;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  rescues: RescueItem[];
  activeRescueId: string;
  activeRescueStage: RescueStage;
  claimRescue: (id: string) => void;
  confirmCollected: () => void;
  confirmDelivered: () => void;
  addDonation: (donation: Partial<RescueItem>) => void;
}

const defaultRescues: RescueItem[] = [
  {
    id: 'AM-0128',
    title: '120 untouched meal portions',
    subtitle: 'Barkat Catering · Wedding surplus',
    servings: 120,
    category: 'Cooked meals',
    pickupLocation: 'Barkat Catering, 24 Main Blvd, Gulberg III, Lahore',
    pickupDistance: '1.2 km',
    vehicleReq: 'Car needed · 6 insulated crates',
    preparedTime: 'Today, 17:30',
    collectDeadline: 'Today, 20:00',
    timeLeft: '75 min left · by 20:00',
    storageNotes: 'Hot-held in covered catering warmers. Contains dairy. Keep covered during transport.',
    dietaryNotes: 'Untouched, individually packed chicken biryani. Crates provided by the donor.',
    donorName: 'Ayesha Khan',
    donorPhone: '+92 300 1234567',
    receiverName: 'Rehmat Community Kitchen',
    receiverLocation: '12 C Block, Model Town · 3.8 km onward',
    receiverContact: 'Sana Ahmed',
    receiverPhone: '+92 321 9876543',
    receiverMaxCapacity: 'Capacity confirmed for 120 meals. Receiving until 21:00 today.',
    status: 'claimed',
    imageUri: require('@/assets/images/biryani_trays.jpg'),
  },
  {
    id: 'AM-0129',
    title: '40 bread & daal meals',
    subtitle: 'Jamia Mosque · 2.4 km',
    servings: 40,
    category: 'Cooked meals',
    pickupLocation: 'Jamia Mosque Hall, Ferozepur Rd, Lahore',
    pickupDistance: '2.4 km',
    vehicleReq: 'Bike or Car',
    preparedTime: 'Today, 18:00',
    collectDeadline: 'Today, 20:30',
    timeLeft: '105 min left · by 20:30',
    storageNotes: 'Warm naan and lentil curry in steel containers.',
    dietaryNotes: 'Fresh vegetarian meals, sealed.',
    donorName: 'Tariq Mehmood',
    donorPhone: '+92 333 4567890',
    receiverName: 'Edhi Home Gulberg',
    receiverLocation: 'Main Market, Gulberg II',
    receiverContact: 'Bilal Farooq',
    receiverPhone: '+92 302 7654321',
    receiverMaxCapacity: 'Capacity confirmed for 40 meals.',
    status: 'available',
    imageUri: require('@/assets/images/bread_daal.jpg'),
  },
  {
    id: 'AM-0126',
    title: '25 university lunch boxes',
    subtitle: 'LUMS Cafeteria · DHA Phase 5',
    servings: 25,
    category: 'Cooked meals',
    pickupLocation: 'Opposite Student Center, LUMS, Lahore',
    pickupDistance: '6.5 km',
    vehicleReq: 'Bike or Car',
    preparedTime: 'Today, 13:00',
    collectDeadline: 'Expired at 18:00',
    timeLeft: 'Expired',
    storageNotes: 'Chilled sandwiches and wraps',
    dietaryNotes: 'Packaged cold cuts and fruit.',
    donorName: 'Cafeteria Admin',
    donorPhone: '+92 42 35608000',
    receiverName: 'Al-Khidmat Relief',
    receiverLocation: 'DHA Phase 3, Lahore',
    receiverContact: 'Usman Ghani',
    receiverPhone: '+92 311 2233445',
    receiverMaxCapacity: 'Capacity confirmed for 25 meals.',
    status: 'expired',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('donor');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [rescues, setRescues] = useState<RescueItem[]>(defaultRescues);
  const [activeRescueId, setActiveRescueId] = useState<string>('AM-0128');
  const [activeRescueStage, setActiveRescueStage] = useState<RescueStage>('claimed');

  const toggleRole = () => {
    setRole((prev) => {
      const nextRole = prev === 'donor' ? 'volunteer' : 'donor';
      setActiveTab(nextRole === 'donor' ? 'home' : 'nearby');
      return nextRole;
    });
  };

  const claimRescue = (id: string) => {
    setRescues((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'claimed' } : r))
    );
    setActiveRescueId(id);
    setActiveRescueStage('claimed');
  };

  const confirmCollected = () => {
    setActiveRescueStage('collected');
    setRescues((prev) =>
      prev.map((r) => (r.id === activeRescueId ? { ...r, status: 'collected' } : r))
    );
  };

  const confirmDelivered = () => {
    setActiveRescueStage('delivered');
    setRescues((prev) =>
      prev.map((r) => (r.id === activeRescueId ? { ...r, status: 'delivered' } : r))
    );
  };

  const addDonation = (donation: Partial<RescueItem>) => {
    const newId = `AM-0${Math.floor(130 + Math.random() * 800)}`;
    const newItem: RescueItem = {
      id: newId,
      title: donation.title || 'Surplus Meal Portions',
      subtitle: `${donation.donorName || 'Barkat Catering'} · Surplus donation`,
      servings: donation.servings || 50,
      category: donation.category || 'Cooked meals',
      pickupLocation: donation.pickupLocation || 'Gulberg III, Lahore',
      pickupDistance: '1.2 km',
      vehicleReq: 'Car needed',
      preparedTime: donation.preparedTime || 'Today, 17:30',
      collectDeadline: donation.collectDeadline || 'Today, 20:00',
      timeLeft: '75 min left',
      storageNotes: donation.storageNotes || 'Hot-held in covered warmers.',
      dietaryNotes: donation.dietaryNotes || 'Untouched, packaged food.',
      donorName: donation.donorName || 'Ayesha Khan',
      donorPhone: '+92 300 1234567',
      receiverName: 'Rehmat Community Kitchen',
      receiverLocation: '12 C Block, Model Town',
      receiverContact: 'Sana Ahmed',
      receiverPhone: '+92 321 9876543',
      receiverMaxCapacity: 'Capacity verified for community distribution.',
      status: 'available',
      imageUri: require('@/assets/images/biryani_trays.jpg'),
    };
    setRescues((prev) => [newItem, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        activeTab,
        setActiveTab,
        rescues,
        activeRescueId,
        activeRescueStage,
        claimRescue,
        confirmCollected,
        confirmDelivered,
        addDonation,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
