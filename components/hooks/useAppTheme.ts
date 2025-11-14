import { Colors, Fonts } from '@/constants/theme'; // tus colores
import { useColorScheme } from 'react-native';

export function useAppTheme() {
  const scheme = useColorScheme() ?? 'light';
  return {
    colors: Colors[scheme],
    fonts: Fonts,
    isDark: scheme === 'dark',
  };
}