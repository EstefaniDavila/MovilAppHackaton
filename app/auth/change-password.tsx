import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  async function submit() {
    if (newPass !== confirm) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }
    // Aquí: fetch a tu endpoint de cambio de contraseña
    Alert.alert('Contraseña actualizada');
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f3f4f6']} style={styles.gradient}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Cambiar contraseña</ThemedText>

          <TextInput placeholder="Contraseña actual" secureTextEntry style={styles.input} value={current} onChangeText={setCurrent} />
          <TextInput placeholder="Nueva contraseña" secureTextEntry style={styles.input} value={newPass} onChangeText={setNewPass} />
          <TextInput placeholder="Confirmar nueva contraseña" secureTextEntry style={styles.input} value={confirm} onChangeText={setConfirm} />

          <TouchableOpacity onPress={submit} style={styles.button}>
            <ThemedText style={styles.buttonText}>Actualizar contraseña</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, padding: 32, gap: 16 },
  input: { backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 16 },
  button: { backgroundColor: '#3b82f6', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});