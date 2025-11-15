import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [gender, setGender] = useState();
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleRegister() {
    setLoading(true);
    setErrorMsg('');

    if (!email || !document || !first_name || !last_name) {
      setLoading(false);
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

    // if (password !== confirmPass) {
    //   setLoading(false);
    //   setErrorMsg("Las contraseñas no coinciden");
    //   return;
    // }

    try {
      const response = await fetch("http://10.0.2.2:3000/api/v1/general/users/sign_up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          gender,
          email,
          document_number: document
          // password,
          // password_confirmation: confirmPass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrorMsg(data.message || "Error al registrar");
        return;
      }

      await SecureStore.setItemAsync("access_token", data.access_token);
      await SecureStore.setItemAsync("refresh_token", data.refresh_token);
      setLoading(false);

      Alert.alert(
        "Registro exitoso",
        "No olvides cambiar tu contraseña desde la pestaña Perfil.",
        [
          { text: "Ok", onPress: () => router.replace("/(tabs)") }
        ]
      );
    } catch (error) {
      setLoading(false);
      setErrorMsg("Error de conexión");
      console.log("Register error:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={styles.gradient}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

            {/* Logo */}
            <Image source={require('@/assets/images/favicon.png')} style={styles.logo} resizeMode="contain" />

            {/* Título */}
            <Text style={styles.title}>Crear cuenta</Text>

            {/* Formulario */}
            <View style={styles.form}>

              {/* First Name */}
              <Text style={styles.label}>Nombres</Text>
              <TextInput
                placeholder="Ej. Juan Carlos"
                autoCapitalize="none"
                value={first_name}
                onChangeText={setFirstName}
                style={styles.input}
              />

              {/* Second Name */}
              <Text style={styles.label}>Apellidos</Text>
              <TextInput
                placeholder="Ej. Pérez García"
                autoCapitalize="none"
                value={last_name}
                onChangeText={setLastName}
                style={styles.input}
              />

              {/* Email */}
              <Text style={styles.label}>Correo</Text>
              <TextInput
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />

              {/* Documento */}
              <Text style={styles.label}>Documento</Text>
              <TextInput
                placeholder="Número de documento"
                value={document}
                onChangeText={setDocument}
                style={styles.input}
              />

              {/* Género */}
              <Text style={styles.label}>Género</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(value) => setGender(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona una opción" value={null} />
                  <Picker.Item label="Masculino" value={0} />
                  <Picker.Item label="Femenino" value={1} />
                  <Picker.Item label="Prefiero no decirlo" value={2} />
                </Picker>
              </View>

              {/* Error */}
              {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}

              {/* Botón */}
              <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Registrarme</Text>
                )}
              </TouchableOpacity>

              {/* Volver */}
              <TouchableOpacity onPress={() => router.push('/auth/login')} style={styles.linkButton}>
                <Text style={styles.link}>Ya tengo cuenta</Text>
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
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32, paddingBottom: 40 },

  logo: { width: 60, height: 60, alignSelf: 'center', marginBottom: 16 },

  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: 24 },

  form: { backgroundColor: '#fff', borderRadius: 24, padding: 24, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8 },

  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 16 },

  pickerContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },

  picker: {
    height: 50,
    paddingHorizontal: 16,
  },

  error: { color: '#ef4444', textAlign: 'center', marginBottom: 12 },

  button: { backgroundColor: '#3b82f6', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  linkButton: { alignItems: 'center' },
  link: { color: '#3b82f6', fontSize: 14 },
});