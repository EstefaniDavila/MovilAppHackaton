import React, { useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  View,
  Text 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

// IconSymbol component para los íconos
interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = Colors.night, style }) => {
  const icons: { [key: string]: string } = {
    'lock': '🔒',
    'eye': '👁️',
    'eye-closed': '🙈',
    'shield': '🛡️',
    'check': '✅',
    'warning': '⚠️',
  };
  
  return (
    <Text style={[{ fontSize: size, color }, style]}>
      {icons[name] || '🔒'}
    </Text>
  );
};

export default function ChangePasswordScreen() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function submit() {
    if (!current || !newPass || !confirm) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (newPass !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (newPass.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Simular cambio de contraseña
    Alert.alert(
      'Éxito',
      'Tu contraseña ha sido actualizada correctamente',
      [{ text: 'OK' }]
    );
    
    // Limpiar campos
    setCurrent('');
    setNewPass('');
    setConfirm('');
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: Colors.lightGray };
    if (password.length < 6) return { strength: 1, text: 'Débil', color: '#ef4444' };
    if (password.length < 8) return { strength: 2, text: 'Media', color: '#f59e0b' };
    return { strength: 3, text: 'Fuerte', color: Colors.primary };
  };

  const passwordStrength = getPasswordStrength(newPass);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={[Colors.pearl, Colors.lightGray + '20']} 
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconTitleContainer}>
              <View style={styles.iconContainer}>
                <IconSymbol name="shield" size={28} color={Colors.pearl} />
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Cambiar Contraseña
              </ThemedText>
            </View>
            <ThemedText style={styles.subtitle}>
              Actualiza tu contraseña para mantener tu cuenta segura
            </ThemedText>
          </View>

          {/* Form Container */}
          <ThemedView style={styles.formContainer}>
            {/* Current Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Contraseña Actual</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput 
                  placeholder="Ingresa tu contraseña actual"
                  placeholderTextColor={Colors.gray}
                  secureTextEntry={!showCurrent}
                  style={styles.input}
                  value={current}
                  onChangeText={setCurrent}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowCurrent(!showCurrent)}
                >
                  <IconSymbol 
                    name={showCurrent ? "eye-closed" : "eye"} 
                    size={18} 
                    color={Colors.gray} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Nueva Contraseña</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput 
                  placeholder="Crea una nueva contraseña"
                  placeholderTextColor={Colors.gray}
                  secureTextEntry={!showNew}
                  style={styles.input}
                  value={newPass}
                  onChangeText={setNewPass}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowNew(!showNew)}
                >
                  <IconSymbol 
                    name={showNew ? "eye-closed" : "eye"} 
                    size={18} 
                    color={Colors.gray} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Password Strength Indicator */}
              {newPass.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBars}>
                    {[1, 2, 3].map((level) => (
                      <View
                        key={level}
                        style={[
                          styles.strengthBar,
                          {
                            backgroundColor: level <= passwordStrength.strength 
                              ? passwordStrength.color 
                              : Colors.lightGray
                          }
                        ]}
                      />
                    ))}
                  </View>
                  <ThemedText style={[styles.strengthText, { color: passwordStrength.color }]}>
                    {passwordStrength.text}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Confirmar Contraseña</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput 
                  placeholder="Repite tu nueva contraseña"
                  placeholderTextColor={Colors.gray}
                  secureTextEntry={!showConfirm}
                  style={styles.input}
                  value={confirm}
                  onChangeText={setConfirm}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <IconSymbol 
                    name={showConfirm ? "eye-closed" : "eye"} 
                    size={18} 
                    color={Colors.gray} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Match Indicator */}
              {confirm.length > 0 && newPass.length > 0 && (
                <View style={styles.matchContainer}>
                  <IconSymbol 
                    name={newPass === confirm ? "check" : "warning"} 
                    size={14} 
                    color={newPass === confirm ? Colors.primary : '#ef4444'} 
                  />
                  <ThemedText style={[
                    styles.matchText, 
                    { color: newPass === confirm ? Colors.primary : '#ef4444' }
                  ]}>
                    {newPass === confirm ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Requirements */}
            <View style={styles.requirementsCard}>
              <ThemedText style={styles.requirementsTitle}>Requisitos de seguridad:</ThemedText>
              <View style={styles.requirementItem}>
                <IconSymbol 
                  name={newPass.length >= 6 ? "check" : "warning"} 
                  size={12} 
                  color={newPass.length >= 6 ? Colors.primary : Colors.gray} 
                />
                <ThemedText style={[
                  styles.requirementText,
                  newPass.length >= 6 && styles.requirementMet
                ]}>
                  Mínimo 6 caracteres
                </ThemedText>
              </View>
              <View style={styles.requirementItem}>
                <IconSymbol 
                  name={newPass.length >= 8 ? "check" : "warning"} 
                  size={12} 
                  color={newPass.length >= 8 ? Colors.primary : Colors.gray} 
                />
                <ThemedText style={[
                  styles.requirementText,
                  newPass.length >= 8 && styles.requirementMet
                ]}>
                  Recomendado 8 caracteres o más
                </ThemedText>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={submit} 
              style={[
                styles.button,
                (!current || !newPass || !confirm || newPass !== confirm) && styles.buttonDisabled
              ]}
              disabled={!current || !newPass || !confirm || newPass !== confirm}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol name="lock" size={18} color={Colors.pearl} />
                <ThemedText style={styles.buttonText}>Actualizar Contraseña</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </ThemedView>

          {/* Security Tips */}
          <View style={styles.tipsCard}>
            <ThemedText style={styles.tipsTitle}>💡 Consejos de seguridad</ThemedText>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipText}>
                • Usa una combinación de letras, números y símbolos
              </ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipText}>
                • Evita usar información personal fácil de adivinar
              </ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipText}>
                • No reutilices contraseñas de otras cuentas
              </ThemedText>
            </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.night,
    flex: 1,
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
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pearl,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.night,
  },
  eyeButton: {
    padding: 12,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  requirementsCard: {
    backgroundColor: Colors.primary + '08',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  requirementText: {
    fontSize: 12,
    color: Colors.gray,
  },
  requirementMet: {
    color: Colors.primary,
    fontWeight: '500',
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
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
  tipsCard: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.night,
    marginBottom: 12,
  },
  tipItem: {
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
});