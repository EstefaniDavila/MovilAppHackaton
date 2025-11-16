import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Colors } from '../../constants/colors';

// IconSymbol component para los íconos
interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = Colors.night, style }) => {
  const icons: { [key: string]: string } = {
    'location': '📍',
    'map': '🗺️',
    'document': '📄',
    'shield': '🛡️',
    'scale': '⚖️',
    'chevron-right': '➡️',
    'external-link': '🔗',
    'time': '⏰',
    'info': 'ℹ️',
    'warning': '⚠️',
    'check': '✅',
  };
  
  return (
    <Text style={[{ fontSize: size * 0.6, color }, style]}>
      {icons[name] || '📄'}
    </Text>
  );
};

// Interfaces para los tipos
interface InfoCardProps {
  title: string;
  iconName: string;
  iconColor: string;
  children: React.ReactNode;
  onPress?: () => void;
}

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

// Componente de tarjeta de información
const InfoCard: React.FC<InfoCardProps> = ({ title, iconName, iconColor, children, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.infoCard}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIconContainer, { backgroundColor: iconColor + '20' }]}>
          <IconSymbol name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.cardTitleContainer}>
          <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        </View>
        {onPress && (
          <IconSymbol name="chevron-right" size={16} color={Colors.gray} />
        )}
      </View>
      <View style={styles.cardContent}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

// Componente de paso instructivo
const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => {
  return (
    <View style={styles.stepItem}>
      <View style={styles.stepNumber}>
        <ThemedText style={styles.stepNumberText}>{number}</ThemedText>
      </View>
      <View style={styles.stepContent}>
        <ThemedText style={styles.stepTitle}>{title}</ThemedText>
        <ThemedText style={styles.stepDescription}>{description}</ThemedText>
      </View>
    </View>
  );
};

// Componente principal de votación
export default function VotingScreen() {
  const [userLocation] = useState({
    centerName: 'Colegio Nacional María Parado de Bellido',
    address: 'Av. República de Panamá 3555, San Luis 15021',
    mesa: 'Mesa 45',
    classroom: 'Aula 203 - Segundo Piso',
    votingTime: '8:00 AM - 4:00 PM'
  });

  const handleOpenMaps = () => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(userLocation.address)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir la aplicación de mapas');
    });
  };

  const handleCallEmergency = () => {
    Linking.openURL('tel:105').catch(() => {
      Alert.alert('Error', 'No se pudo realizar la llamada');
    });
  };

  const handleOpenLegalDocs = () => {
    // Simular apertura de documentos legales
    Alert.alert('Documentación Legal', 'Se abrirán los documentos legales relevantes');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={styles.iconTitleContainer}>
              <View style={styles.iconContainer}>
                <IconSymbol name="document" size={28} color={Colors.pearl} />
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Información para Votar
              </ThemedText>
            </View>
            <ThemedText style={styles.subtitle}>
              Todo lo que necesitas saber para ejercer tu derecho al voto
            </ThemedText>
          </View>
        </View>

        {/* Sección de ubicación */}
        <InfoCard
          title="Ubicación de Votación"
          iconName="location"
          iconColor={Colors.primary}
          onPress={handleOpenMaps}
        >
          <View style={styles.locationInfo}>
            <View style={styles.locationItem}>
              <IconSymbol name="location" size={16} color={Colors.primary} />
              <ThemedText style={styles.locationText}>
                {userLocation.centerName}
              </ThemedText>
            </View>
            <View style={styles.locationItem}>
              <IconSymbol name="map" size={16} color={Colors.gray} />
              <ThemedText style={styles.locationAddress}>
                {userLocation.address}
              </ThemedText>
            </View>
            <View style={styles.locationItem}>
              <IconSymbol name="time" size={16} color={Colors.gray} />
              <ThemedText style={styles.locationTime}>
                Horario: {userLocation.votingTime}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMaps}>
            <ThemedText style={styles.mapButtonText}>Abrir en Maps</ThemedText>
            <IconSymbol name="external-link" size={14} color={Colors.pearl} />
          </TouchableOpacity>
        </InfoCard>

        {/* Sección de mesa específica */}
        <InfoCard
          title="Tu Mesa de Votación"
          iconName="map"
          iconColor={Colors.secondary}
        >
          <View style={styles.mesaInfo}>
            <View style={styles.mesaBadge}>
              <ThemedText style={styles.mesaNumber}>{userLocation.mesa}</ThemedText>
            </View>
            <View style={styles.mesaDetails}>
              <ThemedText style={styles.mesaTitle}>Ubicación dentro del centro:</ThemedText>
              <ThemedText style={styles.mesaDescription}>{userLocation.classroom}</ThemedText>
            </View>
          </View>
          <View style={styles.instructions}>
            <ThemedText style={styles.instructionsTitle}>Al llegar al centro:</ThemedText>
            <View style={styles.instructionStep}>
              <IconSymbol name="check" size={14} color={Colors.primary} />
              <ThemedText style={styles.instructionText}>
                Busca los letreros con el número de tu mesa
              </ThemedText>
            </View>
            <View style={styles.instructionStep}>
              <IconSymbol name="check" size={14} color={Colors.primary} />
              <ThemedText style={styles.instructionText}>
                Presenta tu DNI al miembro de mesa
              </ThemedText>
            </View>
            <View style={styles.instructionStep}>
              <IconSymbol name="check" size={14} color={Colors.primary} />
              <ThemedText style={styles.instructionText}>
                Firma el acta de votación
              </ThemedText>
            </View>
          </View>
        </InfoCard>

        {/* Instrucciones de cédula */}
        <InfoCard
          title="Instrucciones para Votar"
          iconName="document"
          iconColor={Colors.primary}
        >
          <View style={styles.stepsContainer}>
            <StepItem
              number={1}
              title="Marca tu voto"
              description="Usa el lapicero proporcionado para marcar claramente tu preferencia en la cédula"
            />
            <StepItem
              number={2}
              title="Doble la cédula"
              description="Dobla la cédula por la mitad para mantener el secreto del voto"
            />
            <StepItem
              number={3}
              title="Deposita en la urna"
              description="Coloca tu cédula doblada en la urna correspondiente"
            />
            <StepItem
              number={4}
              title="Marca tu dedo"
              description="Permite que el miembro de mesa marque tu dedo con tinta indeleble"
            />
          </View>
          
          <View style={styles.importantNote}>
            <IconSymbol name="info" size={16} color={Colors.primary} />
            <ThemedText style={styles.noteText}>
              Recuerda: Tu voto es secreto. Nadie puede obligarte a revelar por quién votaste.
            </ThemedText>
          </View>
        </InfoCard>

        {/* Recomendaciones de seguridad */}
        <InfoCard
          title="Recomendaciones de Seguridad"
          iconName="shield"
          iconColor={Colors.secondary}
        >
          <View style={styles.securityList}>
            <View style={styles.securityItem}>
              <IconSymbol name="warning" size={16} color={Colors.secondary} />
              <ThemedText style={styles.securityText}>
                Lleva solo tu DNI. Evita llevar objetos de valor
              </ThemedText>
            </View>
            <View style={styles.securityItem}>
              <IconSymbol name="warning" size={16} color={Colors.secondary} />
              <ThemedText style={styles.securityText}>
                Respeta las filas y mantén la calma
              </ThemedText>
            </View>
            <View style={styles.securityItem}>
              <IconSymbol name="warning" size={16} color={Colors.secondary} />
              <ThemedText style={styles.securityText}>
                No tomes fotos dentro de la cabina de votación
              </ThemedText>
            </View>
            <View style={styles.securityItem}>
              <IconSymbol name="warning" size={16} color={Colors.secondary} />
              <ThemedText style={styles.securityText}>
                Denuncia cualquier irregularidad a las autoridades
              </ThemedText>
            </View>
          </View>
          
          <TouchableOpacity style={styles.emergencyButton} onPress={handleCallEmergency}>
            <IconSymbol name="shield" size={16} color={Colors.pearl} />
            <ThemedText style={styles.emergencyButtonText}>Llamar a Emergencias (105)</ThemedText>
          </TouchableOpacity>
        </InfoCard>

        {/* Marco legal */}
        <InfoCard
          title="Marco Legal Electoral"
          iconName="scale"
          iconColor={Colors.night}
          onPress={handleOpenLegalDocs}
        >
          <ThemedText style={styles.legalText}>
            Tu voto está protegido por las siguientes normas legales:
          </ThemedText>
          
          <View style={styles.lawsList}>
            <View style={styles.lawItem}>
              <ThemedText style={styles.lawTitle}>Ley Orgánica de Elecciones</ThemedText>
              <ThemedText style={styles.lawDescription}>
                Establece los principios fundamentales del proceso electoral
              </ThemedText>
            </View>
            <View style={styles.lawItem}>
              <ThemedText style={styles.lawTitle}>Código Electoral</ThemedText>
              <ThemedText style={styles.lawDescription}>
                Regula el ejercicio del derecho al sufragio
              </ThemedText>
            </View>
            <View style={styles.lawItem}>
              <ThemedText style={styles.lawTitle}>Ley de Partidos Políticos</ThemedText>
              <ThemedText style={styles.lawDescription}>
                Norma la participación de organizaciones políticas
              </ThemedText>
            </View>
          </View>
          
          <TouchableOpacity style={styles.legalButton} onPress={handleOpenLegalDocs}>
            <ThemedText style={styles.legalButtonText}>Consultar Documentos Legales</ThemedText>
            <IconSymbol name="external-link" size={14} color={Colors.pearl} />
          </TouchableOpacity>
        </InfoCard>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Ejerce tu derecho al voto de manera informada y segura
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Jornada Electoral - {new Date().getFullYear()}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pearl,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 24,
  },
  titleSection: {
    marginBottom: 16,
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    lineHeight: 22,
    marginLeft: 62,
  },
  infoCard: {
    backgroundColor: Colors.pearl,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
  },
  cardContent: {
    // Contenido específico de cada card
  },
  locationInfo: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  locationTime: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    flex: 1,
  },
  mapButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButtonText: {
    color: Colors.pearl,
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  mesaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mesaBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  mesaNumber: {
    color: Colors.pearl,
    fontWeight: '700',
    fontSize: 16,
  },
  mesaDetails: {
    flex: 1,
  },
  mesaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 4,
  },
  mesaDescription: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  instructions: {
    backgroundColor: Colors.primary + '08',
    padding: 16,
    borderRadius: 12,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 8,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  stepsContainer: {
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: Colors.pearl,
    fontWeight: '700',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  importantNote: {
    flexDirection: 'row',
    backgroundColor: Colors.primary + '15',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  noteText: {
    fontSize: 14,
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  securityList: {
    marginBottom: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  securityText: {
    fontSize: 14,
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: {
    color: Colors.pearl,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  legalText: {
    fontSize: 14,
    color: Colors.night,
    marginBottom: 12,
    lineHeight: 20,
  },
  lawsList: {
    marginBottom: 16,
  },
  lawItem: {
    backgroundColor: Colors.night + '08',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  lawTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 4,
  },
  lawDescription: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 18,
  },
  legalButton: {
    flexDirection: 'row',
    backgroundColor: Colors.night,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalButtonText: {
    color: Colors.pearl,
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    marginTop: 8,
  },
  footerText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 4,
  },
  footerSubtext: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 12,
  },
});