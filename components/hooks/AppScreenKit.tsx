// Wrapper accesible + scroll + gradiente
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  title?: string;
  withGradient?: boolean;
};

export function AppScreenKit({ children, title, withGradient = true }: Props) {
  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {title && (
          <ThemedText type="title" style={{ textAlign: 'center', marginBottom: 24 }}>
            {title}
          </ThemedText>
        )}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {withGradient ? (
        <LinearGradient colors={['#ffffff', '#f3f4f6']} style={{ flex: 1 }}>
          <ThemedView style={{ flex: 1 }}>{content}</ThemedView>
        </LinearGradient>
      ) : (
        <ThemedView style={{ flex: 1 }}>{content}</ThemedView>
      )}
    </SafeAreaView>
  );
}