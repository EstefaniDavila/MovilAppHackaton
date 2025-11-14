import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRole } from '@/hooks/use-role';
import { useUser } from '@/hooks/use-user';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const user = useUser();
  const role = useRole();
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);

  async function logout() {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("keep_logged_in");
    await SecureStore.deleteItemAsync("user");
    router.replace("/auth/login");
  }

  function changePassword() {
    router.push("/auth/change-password");
  }

  function goAdminPanel() {
    router.push("/admin");
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scroll} bounces={false}>
          {/* CONTENIDO ARRIBA */}
          <View style={styles.top}>
            <View style={{ height: 40 }} />
            <Avatar uri={avatarUri} onChange={setAvatarUri} />
            <ThemedText type="title" style={styles.name}>{user?.full_name ?? '-'}</ThemedText>
            <ThemedText style={styles.role}>{user?.role_type ?? '-'}</ThemedText>

            <ThemedView style={styles.card}>
              <ThemedText>Documento: {user?.document_number}</ThemedText>
              <ThemedText>Correo: {user?.email}</ThemedText>
            </ThemedView>
          </View>

          {/* BOTONES ABAJO */}
          <View style={styles.bottom}>
            <TouchableOpacity onPress={changePassword} style={styles.button}>
              <ThemedText style={styles.buttonText}>Cambiar contraseña</ThemedText>
            </TouchableOpacity>

            {role === 'admin' && (
              <TouchableOpacity onPress={goAdminPanel} style={styles.adminButton}>
                <ThemedText style={styles.buttonText}>Panel de admin</ThemedText>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <ThemedText style={styles.logoutText}>Cerrar sesión</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'space-between', paddingHorizontal: 32, paddingTop: 24, paddingBottom: 32 },
  top: { alignItems: 'center', gap: 12 },
  bottom: { width: '100%', gap: 12 },
  name: { textAlign: 'center', marginTop: 8 },
  role: { textAlign: 'center', color: '#6b7280', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 8, width: '100%' },
  button: { backgroundColor: '#3b82f6', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  adminButton: { backgroundColor: '#10b981', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#ef4444', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});