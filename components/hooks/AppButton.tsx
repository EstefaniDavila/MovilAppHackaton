import { ActivityIndicator, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { AppText } from './AppText';
import { useAppTheme } from './useAppTheme';

type Props = TouchableOpacityProps & { loading?: boolean; title: string };

export function AppButton({ loading, title, ...rest }: Props) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      {...rest}
      style={{
        backgroundColor: colors.tint,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        opacity: rest.disabled ? 0.6 : 1,
        ...rest.style,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <AppText type="body" style={{ color: '#fff', fontWeight: '600' }}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}