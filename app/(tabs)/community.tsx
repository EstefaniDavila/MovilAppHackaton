import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={styles.gradient}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Comunidad</ThemedText>
          <ThemedText>Lista de vecinos y últimos reportes vecinales.</ThemedText>
          {/* Aquí: FlatList de vecinos con foto, nombre, último reporte */}
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