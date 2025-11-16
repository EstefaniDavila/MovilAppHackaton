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
import { Colors } from '@/constants/colors';

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


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={[Colors.pearl, Colors.pearl + 'EE']} 
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scroll} 
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER CON AVATAR */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Avatar uri={avatarUri} onChange={setAvatarUri} />
              <View style={styles.avatarGlow} />
            </View>
            
            <ThemedText type="title" style={styles.name}>
              {user?.full_name ?? '-'}
            </ThemedText>
            
            <View style={[styles.roleBadge, { backgroundColor: Colors.primary + '20' }]}>
              <ThemedText style={[styles.roleText, { color: Colors.primary }]}>
                {user?.role_type ?? '-'}
              </ThemedText>
            </View>
          </View>

          {/* INFORMACIÓN DEL USUARIO */}
          <View style={styles.infoSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Información Personal
            </ThemedText>
            
            <ThemedView style={styles.card}>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Documento:</ThemedText>
                <ThemedText style={styles.infoValue}>{user?.document_number}</ThemedText>
              </View>
              
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Correo:</ThemedText>
                <ThemedText style={styles.infoValue}>{user?.email}</ThemedText>
              </View>
              
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Estado:</ThemedText>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <ThemedText style={styles.statusText}>Activo</ThemedText>
                </View>
              </View>
            </ThemedView>
          </View>

          {/* ACCIONES PRINCIPALES */}
          <View style={styles.actionsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Acciones
            </ThemedText>
            
            <TouchableOpacity 
              onPress={changePassword} 
              style={[styles.button, styles.primaryButton]}
            >
              <View style={styles.buttonContent}>
                <ThemedText style={styles.buttonIcon}>🔒</ThemedText>
                <ThemedText style={styles.buttonText}>Cambiar contraseña</ThemedText>
              </View>
              <ThemedText style={styles.buttonArrow}>→</ThemedText>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              onPress={logout} 
              style={[styles.button, styles.logoutButton]}
            >
              <View style={styles.buttonContent}>
                <ThemedText style={styles.buttonIcon}>🚪</ThemedText>
                <ThemedText style={styles.logoutText}>Cerrar sesión</ThemedText>
              </View>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              App Electoral v1.0
            </ThemedText>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: Colors.pearl,
  },
  gradient: { 
    flex: 1,
  },
  scroll: { 
    flexGrow: 1, 
    paddingHorizontal: 24, 
    paddingTop: 20, 
    paddingBottom: 32,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary + '20',
    top: -5,
  },
  name: { 
    fontSize: 28,
    fontWeight: '800',
    color: Colors.night,
    textAlign: 'center',
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  infoSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.night,
    marginBottom: 8,
  },
  card: {
    backgroundColor: Colors.pearl,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    elevation: 4,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 15,
    color: Colors.gray,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: Colors.night,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  statusText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionsSection: {
    gap: 16,
  },
  button: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  primaryButton: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  adminButton: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  logoutButton: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.night,
    backgroundColor: Colors.night + '05',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.night,
    fontWeight: '600',
    flex: 1,
  },
  buttonArrow: {
    fontSize: 18,
    color: Colors.gray,
    fontWeight: '600',
  },
  logoutText: {
    fontSize: 16,
    color: Colors.night,
    fontWeight: '600',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 8,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
});