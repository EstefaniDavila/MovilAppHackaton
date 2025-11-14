import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from './AppText';

export function AppScreen({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
            {title && <AppText type="title" style={{ marginBottom: 24, textAlign: 'center' }}>{title}</AppText>}
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}