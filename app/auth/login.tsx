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
      if (data.user.role_type === "ADMIN") {
        router.replace("/(admin)");
      } else {
        router.replace("/(tabs)");
      }
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