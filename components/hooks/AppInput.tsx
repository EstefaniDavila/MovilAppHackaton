import { TextInput, type TextInputProps, View } from 'react-native';
import { useAppTheme } from './useAppTheme';

export function AppInput(props: TextInputProps) {
  const { colors } = useAppTheme();
  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        placeholderTextColor={colors.icon}
        {...props}
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.icon,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          ...props.style,
        }}
      />
    </View>
  );
}