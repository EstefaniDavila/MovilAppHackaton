import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setErrorMsg('');

    // =========================================================
    // 🧪 INICIO DE SIMULACIÓN PARA PRUEBAS (AJUSTADO A TU ESTRUCTURA) 🧪
    // Usa 'frank1', 'frank2', 'frank3' con password '123'
    // =========================================================
    if (password === '123' && (document === 'frank1' || document === 'frank2' || document === 'frank3' || document === 'admin')) {
      let role_member_key = null;

      if (document === 'frank1') {
        role_member_key = 'citizen';
      } else if (document === 'frank2') {
        role_member_key = 'mesa_member';
      } else if (document === 'frank3') {
        role_member_key = 'party_representative';
      } else if (document === 'admin') {
        // Simulación para probar el ADMIN
        role_member_key = 'ADMIN';
      }

      if (role_member_key) {
        
        // Simular un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 800));

        const data = {
          access_token: 'fake-access-token-123',
          refresh_token: 'fake-refresh-token-123',
          user: {
            email: `${document}@test.com`,
            roleable_type: role_member_key === 'ADMIN' ? 'Admin' : 'Member',
            roleable: {
              // Aseguramos que solo los miembros tengan el sub-rol
              role_member: role_member_key === 'ADMIN' ? undefined : role_member_key,
            },
          },
        };

        await SecureStore.setItemAsync('access_token', data.access_token);
        await SecureStore.setItemAsync('refresh_token', data.refresh_token);
        await SecureStore.setItemAsync('user', JSON.stringify(data.user));

        if (keepLoggedIn) {
          await SecureStore.setItemAsync('keep_logged_in', 'true');
        }

        setLoading(false);

        // LÓGICA DE REDIRECCIÓN BASADA EN LA SIMULACIÓN
        const user = data.user;
        
        if (user.roleable_type === 'Admin' || role_member_key === 'ADMIN') {
          router.replace('/(admin)');
        } else {
          const memberRole = user.roleable?.role_member; // Sub-rol del Miembro
          
          switch (memberRole) {
            case 'citizen':
              // ✅ Redirige a la carpeta del rol (que mostrará las tabs y su contenido específico)
              router.replace('/(member)/citizen');
              break;
            case 'mesa_member':
              // ✅ Redirige a la carpeta del rol
              router.replace('/(member)/mesa-member');
              break;
            case 'party_representative':
              // ✅ Redirige a la carpeta del rol
              router.replace('/(member)/party-representative');
              break;
            default:
              // Fallback si el rol no se reconoce
              router.replace('/(tabs)');
              break;
          }
        }
        return; // IMPORTANTE: Termina la función aquí para evitar la llamada a la API real
      }
    }
    // =========================================================
    //  FIN DE SIMULACIÓN PARA PRUEBAS 
    // =========================================================


    // ➜ INICIO DEL CÓDIGO REAL DE LA API
    try {
      const response = await fetch("http://10.0.2.2:3000/api/v1/general/users/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authentication: {
            document_number: document,
            password: password,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrorMsg(data.message || "Credenciales inválidas");
        return;
      }

      await SecureStore.setItemAsync("access_token", data.access_token);
      await SecureStore.setItemAsync("refresh_token", data.refresh_token);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));

      // ➜ Guardar flag si marcó "mantener sesión"
      if (keepLoggedIn) {
        await SecureStore.setItemAsync("keep_logged_in", "true");
      }

      setLoading(false);
      
      // ----------------------------------------------------------------------
      // ✅ LÓGICA DE REDIRECCIÓN BASADA EN EL ROL DE LA API REAL
      // ----------------------------------------------------------------------
      const user = data.user;

      if (user.roleable_type === 'Admin' || user.role_type === 'ADMIN') {
          router.replace('/(admin)');
      } else {
          const memberRole = user.roleable?.role_member; // Sub-rol del Miembro

          switch (memberRole) {
              case 'citizen':
                  router.replace('/(member)/citizen'); 
                  break;
              case 'mesa_member':
                  router.replace('/(member)/mesa-member');
                  break;
              case 'party_representative':
                  router.replace('/(member)/party-representative');
                  break;
              default:
                  // Fallback si el rol no se reconoce
                  router.replace('/(tabs)');
                  break;
          }
      }
      // ----------------------------------------------------------------------
      
    } catch (error) {
      setLoading(false);
      setErrorMsg("Error de conexión");
      console.log("Login error:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={styles.gradient}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            {/* Título y logo */}
            <Text style={styles.title}>Bienvenido</Text>
            {/* Reemplaza con la ruta de tu logo real */}
            <Image source={require('@/assets/images/favicon.png')} style={styles.logo} resizeMode="contain" /> 
            <Text style={styles.subtitle}>Ingresa tus credenciales</Text>

            {/* Formulario */}
            <View style={styles.form}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                placeholder="Ingresa tu documento"
                value={document}
                onChangeText={setDocument}
                style={styles.input}
              />

              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                secureTextEntry
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />

              {/* Mantener sesión */}
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setKeepLoggedIn(!keepLoggedIn)}>
                <View style={[styles.checkbox, keepLoggedIn && styles.checked]} />
                <Text style={styles.checkboxLabel}>Mantener sesión iniciada</Text>
              </TouchableOpacity>

              {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Iniciar sesión</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text style={styles.link}>¿No tienes cuenta?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  keyboard: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: 8 },
  logo: { width: 80, height: 80, alignSelf: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#6b7280', marginBottom: 32 },
  form: { backgroundColor: '#fff', borderRadius: 24, padding: 24, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 16 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#3b82f6', marginRight: 8 },
  checked: { backgroundColor: '#3b82f6' },
  checkboxLabel: { fontSize: 14, color: '#374151' },
  error: { color: '#ef4444', textAlign: 'center', marginBottom: 12 },
  button: { backgroundColor: '#3b82f6', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { textAlign: 'center', color: '#3b82f6', fontSize: 14 },
});