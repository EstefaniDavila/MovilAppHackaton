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

    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/v1/general/users/sign_in`, {
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

      // Guardar tokens y datos del usuario
      await SecureStore.setItemAsync("access_token", data.access_token);
      await SecureStore.setItemAsync("refresh_token", data.refresh_token);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));

      // Guardar flag si marcó "mantener sesión"
      if (keepLoggedIn) {
        await SecureStore.setItemAsync("keep_logged_in", "true");
      }

      setLoading(false);
      
      // ----------------------------------------------------------------------
      // ✅ LÓGICA DE REDIRECCIÓN BASADA EN EL ROL DE LA API REAL
      // ----------------------------------------------------------------------
      const user = data.user;

      // Usar member_role directamente desde la respuesta de la API
      const memberRole = user.member_role;

      switch (memberRole) {
        case 'citizen':
          router.replace('/(citizen)'); 
          break;
        case 'mesa_member':
          router.replace('/(mesa-member)');
          break;
        default:
          // Fallback si el rol no se reconoce
          router.replace('/auth/login');
          break;
      }
      // ----------------------------------------------------------------------
      
    } catch (error) {
      setLoading(false);
      setErrorMsg("Error de conexión. Verifica tu conexión a internet.");
      console.log("Login error:", error);
    }
  }

  // Función para modo offline - navega directamente a la pantalla de ciudadano
  function handleOfflineMode() {
    console.log('🔌 Modo offline activado');
    router.replace('/(modoofline)');
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
              <Text style={styles.label}>Documento</Text>
              <TextInput
                placeholder="Ingresa tu documento"
                value={document}
                onChangeText={setDocument}
                style={styles.input}
                placeholderTextColor={Colors.gray}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                secureTextEntry
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholderTextColor={Colors.gray}
                autoCapitalize="none"
                autoCorrect={false}
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

              {/* Botón de modo offline */}
              <TouchableOpacity 
                style={[styles.offlineButton, loading && styles.buttonDisabled]} 
                onPress={handleOfflineMode} 
                disabled={loading}
              >
                <Text style={styles.offlineButtonText}>📱 Modo Offline</Text>
                <Text style={styles.offlineButtonSubtext}>Acceder sin conexión</Text>
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
    marginBottom: 12,
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
  // Estilos para el botón de modo offline
  offlineButton: { 
    backgroundColor: Colors.pearl, 
    borderRadius: 12, 
    paddingVertical: 14, 
    alignItems: 'center', 
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  offlineButtonText: { 
    color: Colors.primary, 
    fontWeight: 'bold', 
    fontSize: 16,
    marginBottom: 2,
  },
  offlineButtonSubtext: { 
    color: Colors.gray, 
    fontSize: 12,
    fontWeight: '500',
  },
  link: { 
    textAlign: 'center', 
    color: Colors.primary, 
    fontSize: 14,
    fontWeight: '600',
  },
});