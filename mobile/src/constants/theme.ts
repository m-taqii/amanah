import { Platform } from 'react-native';

export const AmanahColors = {
  // Brand greens
  primary: '#144D3D',
  primaryDark: '#0D362B',
  primaryLight: '#E3ECE6',
  primaryBorder: '#C8DBD0',

  // Backgrounds
  background: '#F7F5EE',
  card: '#FFFFFF',
  cardSubtle: '#F2F0E7',
  cardBorder: '#EDEBE2',

  // Text
  text: '#192621',
  textSecondary: '#5C6D63',
  textMuted: '#8D9B92',
  textInverse: '#FFFFFF',

  // Amber / urgency
  amber: '#B5681E',
  amberLight: '#FCF2E5',
  amberBorder: '#F2D5B1',

  // Statuses
  success: '#207A51',
  successLight: '#E5F4EC',

  // Inputs
  inputBorder: '#DDDACE',
  inputBg: '#FFFFFF',
  placeholder: '#9FA9A3',
} as const;

export const Colors = {
  light: {
    text: AmanahColors.text,
    background: AmanahColors.background,
    backgroundElement: AmanahColors.primaryLight,
    backgroundSelected: '#D2E3D8',
    textSecondary: AmanahColors.textSecondary,
    tint: AmanahColors.primary,
  },
  dark: {
    text: '#FFFFFF',
    background: '#121816',
    backgroundElement: '#1C2723',
    backgroundSelected: '#25352F',
    textSecondary: '#A2B1A9',
    tint: '#52B788',
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, serif',
    rounded: 'system-ui, sans-serif',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 26,
  full: 9999,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
