import { Text, type TextProps } from 'react-native';
import { useAppTheme } from './useAppTheme';

type Props = TextProps & { type?: 'title' | 'body' | 'small' | 'error' };

export function AppText({ type = 'body', style, ...rest }: Props) {
  const { colors, fonts } = useAppTheme();
  const fontSize =
    type === 'title' ? 28 : type === 'small' ? 12 : type === 'error' ? 14 : 16;
  const color = type === 'error' ? '#ef4444' : colors.text;
  return <Text style={[{ fontSize, color, fontFamily: fonts.sans }, style]} {...rest} />;
}