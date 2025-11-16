import { Colors } from '@/constants/colors';
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
    // Usa 'frank1', 'frank2' con password '123'
    // =========================================================
    if (password === '123' && (document === 'frank1' || document === 'frank2')) {
      let role_member_key = null;

      if (document === 'frank1') {
        role_member_key = 'citizen';
      } else if (document === 'frank2') {
        role_member_key = 'mesa_member';
      }

      if (role_member_key) {
        
        // Simular un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 800));

        const data = {
          access_token: 'fake-access-token-123',
          refresh_token: 'fake-refresh-token-123',
          user: {
            email: `${document}@test.com`,
            roleable_type: 'Member',
            roleable: {
              role_member: role_member_key,
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
        
        const memberRole = user.roleable?.role_member; // Sub-rol del Miembro
        
        switch (memberRole) {
          case 'citizen':
            // ✅ Redirige a la carpeta del rol (que mostrará las tabs y su contenido específico)
            router.replace('/(citizen)');
            break;
          case 'mesa_member':
            // ✅ Redirige a la carpeta del rol
            router.replace('/(mesa-member)');
            break;
          default:
            // Fallback si el rol no se reconoce
            router.replace('/auth/login');
            break;
        }
        return; // IMPORTANTE: Termina la función aquí para evitar la llamada a la API real
      }
    }
    // =========================================================
    //  FIN DE SIMULACIÓN PARA PRUEBAS 
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

      const memberRole = user.roleable?.role_member; // Sub-rol del Miembro

      switch (memberRole) {
          case 'citizen':
              router.replace('/(member)/citizen'); 
              break;
          case 'mesa_member':
              router.replace('/(member)/mesa-member');
              break;
          default:
              // Fallback si el rol no se reconoce
              router.replace('/(tabs)');
              break;
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
      <LinearGradient colors={[Colors.pearl, Colors.lightGray]} style={styles.gradient}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            {/* Título y logo */}
            <Text style={styles.title}>Bienvenido</Text>
            {/* Reemplaza con la ruta de tu logo real */}
            <Image 
              source={require('../../assets/images/logoyachay.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            /> 
            <Text style={styles.subtitle}>Ingresa tus credenciales</Text>

            {/* Formulario */}
            <View style={styles.form}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                placeholder="Ingresa tu documento"
                value={document}
                onChangeText={setDocument}
                style={styles.input}
                placeholderTextColor={Colors.gray}
              />

              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                secureTextEntry
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholderTextColor={Colors.gray}
              />

              {/* Mantener sesión */}
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setKeepLoggedIn(!keepLoggedIn)}>
                <View style={[styles.checkbox, keepLoggedIn && styles.checked]} />
                <Text style={styles.checkboxLabel}>Mantener sesión iniciada</Text>
              </TouchableOpacity>

              {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}

              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin} 
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.pearl} />
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
  container: { 
    flex: 1,
    backgroundColor: Colors.pearl,
  },
  gradient: { 
    flex: 1,
  },
  keyboard: { 
    flex: 1,
  },
  scroll: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 32,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: Colors.night, 
    marginBottom: 8,
  },
  logo: { 
    width: 300, 
    height: 300, 
    alignSelf: 'center', 
    marginBottom: 16,
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: Colors.gray, 
    marginBottom: 32,
    fontWeight: '500',
  },
  form: { 
    backgroundColor: Colors.pearl, 
    borderRadius: 24, 
    padding: 24, 
    elevation: 8,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: Colors.night, 
    marginBottom: 6,
  },
  input: { 
    backgroundColor: Colors.lightGray + '40', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    marginBottom: 16,
    color: Colors.night,
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
  },
  checkbox: { 
    width: 20, 
    height: 20, 
    borderRadius: 6, 
    borderWidth: 2, 
    borderColor: Colors.primary, 
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checked: { 
    backgroundColor: Colors.primary,
  },
  checkboxLabel: { 
    fontSize: 14, 
    color: Colors.night,
    fontWeight: '500',
  },
  error: { 
    color: Colors.secondary, 
    textAlign: 'center', 
    marginBottom: 12,
    fontWeight: '500',
    fontSize: 14,
  },
  button: { 
    backgroundColor: Colors.primary, 
    borderRadius: 12, 
    paddingVertical: 16, 
    alignItems: 'center', 
    marginBottom: 16,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: Colors.gray,
    opacity: 0.7,
  },
  buttonText: { 
    color: Colors.pearl, 
    fontWeight: 'bold', 
    fontSize: 16,
  },
  link: { 
    textAlign: 'center', 
    color: Colors.primary, 
    fontSize: 14,
    fontWeight: '600',
  },
});