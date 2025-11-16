import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/colors';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

// IconSymbol component para los íconos
interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = Colors.night, style }) => {
  const icons: { [key: string]: string } = {
    'user': '👤',
    'email': '📧',
    'document': '📄',
    'gender': '⚧️',
    'lock': '🔒',
    'check': '✅',
    'warning': '⚠️',
    'arrow-right': '➡️',
  };
  
  return (
    <Text style={[{ fontSize: size * 0.6, color }, style]}>
      {icons[name] || '👤'}
    </Text>
  );
};

export default function RegisterScreen() {
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [gender, setGender] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleRegister(): Promise<void> {
    setLoading(true);
    setErrorMsg('');

    if (!email || !document || !first_name || !last_name) {
      setLoading(false);
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

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
          { text: "Ok", onPress: () => router.replace("/auth/login") }
        ]
      );
    } catch (error) {
      setLoading(false);
      setErrorMsg("Error de conexión");
      console.log("Register error:", error);
    }
  }

  const isFormValid = email && document && first_name && last_name;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={[Colors.pearl, Colors.lightGray + '20']} 
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.keyboard}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.iconContainer}>
                  <IconSymbol name="user" size={32} color={Colors.pearl} />
                </View>
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Crear Cuenta
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Completa tus datos para registrarte en la plataforma
              </ThemedText>
            </View>

            {/* Form Container */}
            <ThemedView style={styles.formContainer}>
              {/* First Name */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <IconSymbol name="user" size={16} color={Colors.primary} />
                  <ThemedText style={styles.inputLabel}>Nombres</ThemedText>
                </View>
                <TextInput
                  placeholder="Ej. Juan Carlos"
                  placeholderTextColor={Colors.gray}
                  autoCapitalize="words"
                  value={first_name}
                  onChangeText={setFirstName}
                  style={styles.input}
                />
              </View>

              {/* Last Name */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <IconSymbol name="user" size={16} color={Colors.primary} />
                  <ThemedText style={styles.inputLabel}>Apellidos</ThemedText>
                </View>
                <TextInput
                  placeholder="Ej. Pérez García"
                  placeholderTextColor={Colors.gray}
                  autoCapitalize="words"
                  value={last_name}
                  onChangeText={setLastName}
                  style={styles.input}
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <IconSymbol name="email" size={16} color={Colors.primary} />
                  <ThemedText style={styles.inputLabel}>Correo Electrónico</ThemedText>
                </View>
                <TextInput
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor={Colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
              </View>

              {/* Document */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <IconSymbol name="document" size={16} color={Colors.primary} />
                  <ThemedText style={styles.inputLabel}>Número de Documento</ThemedText>
                </View>
                <TextInput
                  placeholder="Ingresa tu DNI o documento"
                  placeholderTextColor={Colors.gray}
                  value={document}
                  onChangeText={setDocument}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>

              {/* Gender */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <IconSymbol name="gender" size={16} color={Colors.primary} />
                  <ThemedText style={styles.inputLabel}>Género</ThemedText>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={gender}
                    onValueChange={(value: number) => setGender(value)}
                    style={styles.picker}
                    dropdownIconColor={Colors.primary}
                  >
                    <Picker.Item 
                      label="Selecciona tu género" 
                      value={null} 
                      color={Colors.gray}
                    />
                    <Picker.Item 
                      label="Masculino" 
                      value={0} 
                      color={Colors.night}
                    />
                    <Picker.Item 
                      label="Femenino" 
                      value={1} 
                      color={Colors.night}
                    />
                    <Picker.Item 
                      label="Prefiero no decirlo" 
                      value={2} 
                      color={Colors.night}
                    />
                  </Picker>
                </View>
              </View>

              {/* Error Message */}
              {errorMsg !== '' && (
                <View style={styles.errorContainer}>
                  <IconSymbol name="warning" size={16} color="#ef4444" />
                  <ThemedText style={styles.errorText}>{errorMsg}</ThemedText>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity 
                style={[
                  styles.button,
                  !isFormValid && styles.buttonDisabled
                ]}
                onPress={handleRegister} 
                disabled={loading || !isFormValid}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.pearl} size="small" />
                  ) : (
                    <>
                      <ThemedText style={styles.buttonText}>Crear Cuenta</ThemedText>
                      <IconSymbol name="arrow-right" size={18} color={Colors.pearl} />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <ThemedText style={styles.loginText}>¿Ya tienes una cuenta? </ThemedText>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                  <ThemedText style={styles.loginLink}>Iniciar Sesión</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <ThemedText style={styles.infoTitle}>🔒 Tus datos están seguros</ThemedText>
              <ThemedText style={styles.infoText}>
                La información que proporcionas está protegida y solo se utilizará 
                para fines electorales según la normativa vigente.
              </ThemedText>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.night,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: Colors.pearl,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
  },
  input: {
    backgroundColor: Colors.pearl,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.night,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  pickerContainer: {
    backgroundColor: Colors.pearl,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    paddingHorizontal: 16,
    color: Colors.night,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  buttonText: {
    color: Colors.pearl,
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: Colors.gray,
  },
  loginLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: Colors.primary + '08',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.night,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
});