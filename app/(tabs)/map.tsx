import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={styles.gradient}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Mapa de incidentes</ThemedText>
          <ThemedText>Próximamente: mapa interactivo con pins de incidentes.</ThemedText>
          {/* Aquí: react-native-maps + marcadores desde API */}
        </ThemedView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, padding: 32, gap: 16 },
});