import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    'building': '🏫',
    'floor': '🏢',
    'classroom': '🚪',
    'entrance': '🚶‍♂️',
    'stairs': '📶',
    'elevator': '🛗',
    'restroom': '🚻',
    'parking': '🅿️',
    'info': 'ℹ️',
    'zoom-in': '🔍',
    'zoom-out': '🔎',
    'navigate': '🧭',
    'time': '⏰',
  };
  
  return (
    <Text style={[{ fontSize: size * 0.6, color }, style]}>
      {icons[name] || '📄'}
    </Text>
  );
};

// Interfaces para los tipos
interface FloorPlanProps {
  floor: number;
  userMesa: string;
  onLocationSelect: (location: string) => void;
}

interface LocationStepProps {
  step: number;
  instruction: string;
  icon: string;
}

// Componente de mapa integrado
const IntegratedMap: React.FC = () => {
  const { width } = Dimensions.get('window');
  const mapSize = width - 40;

  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapHeader}>
        <IconSymbol name="map" size={20} color={Colors.primary} />
        <ThemedText style={styles.mapTitle}>Ubicación en Google Maps</ThemedText>
      </View>
      
      <View style={[styles.mapPreview, { width: mapSize, height: mapSize * 0.6 }]}>
        {/* Simulación de mapa estático */}
        <View style={styles.mapImage}>
          <Text style={styles.mapPlaceholder}>🗺️</Text>
          <ThemedText style={styles.mapText}>Vista previa del mapa</ThemedText>
        </View>
        
        {/* Puntos de interés en el mapa */}
        <View style={[styles.mapPin, { top: '40%', left: '50%' }]}>
          <IconSymbol name="location" size={24} color={Colors.primary} />
          <View style={styles.pinLabel}>
            <ThemedText style={styles.pinLabelText}>Tu ubicación</ThemedText>
          </View>
        </View>
        
        <View style={[styles.mapPin, { top: '30%', left: '30%' }]}>
          <IconSymbol name="building" size={20} color={Colors.secondary} />
          <View style={styles.pinLabel}>
            <ThemedText style={styles.pinLabelText}>Colegio Electoral</ThemedText>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.mapButton}
        onPress={() => Alert.alert(
          'Abrir Mapa',
          'Se abrirá Google Maps con la ubicación del centro electoral',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Abrir Mapa', onPress: () => console.log('Abrir Google Maps') }
          ]
        )}
      >
        <IconSymbol name="navigate" size={20} color={Colors.pearl} />
        <ThemedText style={styles.mapButtonText}>Abrir en Google Maps</ThemedText>
      </TouchableOpacity>
      
      <View style={styles.mapInfo}>
        <ThemedText style={styles.mapInfoText}>
          Av. República de Panamá 3555, San Luis 15021
        </ThemedText>
        <ThemedText style={styles.mapInfoSubtext}>
          Distancia aproximada: 1.2 km • 5 min en auto
        </ThemedText>
      </View>
    </View>
  );
};

// Componente de plano del local de votación
const FloorPlan: React.FC<FloorPlanProps> = ({ floor, userMesa, onLocationSelect }) => {
  const { width } = Dimensions.get('window');
  const planSize = width - 80;
  
  // Datos del plano del local (simulado)
  const floorData = {
    1: {
      name: 'Planta Baja',
      classrooms: [
        { id: 'Mesa 1-10', number: '101', x: 50, y: 150, type: 'voting' },
        { id: 'Mesa 11-20', number: '102', x: 150, y: 150, type: 'voting' },
        { id: 'Oficina Jurado', number: '103', x: 250, y: 50, type: 'office' },
        { id: 'Baños', number: 'WC', x: 50, y: 250, type: 'facility' },
        { id: 'Entrada Principal', number: 'ENT', x: 150, y: 300, type: 'entrance' },
      ]
    },
    2: {
      name: 'Primer Piso',
      classrooms: [
        { id: 'Mesa 21-30', number: '201', x: 50, y: 100, type: 'voting' },
        { id: 'Mesa 31-40', number: '202', x: 150, y: 100, type: 'voting' },
        { id: 'Mesa 41-50', number: '203', x: 250, y: 100, type: 'voting' },
        { id: userMesa, number: '204', x: 150, y: 200, type: 'user-mesa' },
        { id: 'Baños', number: 'WC', x: 50, y: 250, type: 'facility' },
        { id: 'Escaleras', number: 'ESC', x: 250, y: 250, type: 'stairs' },
      ]
    }
  };

  const currentFloor = floorData[floor as keyof typeof floorData];

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'user-mesa': return Colors.primary;
      case 'voting': return Colors.secondary;
      case 'entrance': return Colors.night;
      case 'office': return '#8B4513';
      case 'facility': return Colors.gray;
      case 'stairs': return '#FFA500';
      default: return Colors.lightGray;
    }
  };

  const getLocationSize = (type: string) => {
    switch (type) {
      case 'user-mesa': return 24;
      case 'voting': return 20;
      default: return 16;
    }
  };

  return (
    <View style={styles.floorPlanContainer}>
      <View style={styles.floorPlanHeader}>
        <ThemedText style={styles.floorTitle}>{currentFloor.name}</ThemedText>
        <View style={styles.floorBadge}>
          <ThemedText style={styles.floorBadgeText}>Piso {floor}</ThemedText>
        </View>
      </View>
      
      <View style={[styles.floorPlan, { width: planSize, height: planSize * 0.8 }]}>
        {/* Representación gráfica del plano */}
        <View style={styles.planBackground}>
          {/* Corredores */}
          <View style={[styles.corridor, { top: 130, left: 30, width: planSize - 60, height: 4 }]} />
          <View style={[styles.corridor, { top: 230, left: 30, width: planSize - 60, height: 4 }]} />
          
          {/* Aulas y ubicaciones */}
          {currentFloor.classrooms.map((room, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.locationPin,
                {
                  left: room.x - getLocationSize(room.type) / 2,
                  top: room.y - getLocationSize(room.type) / 2,
                  width: getLocationSize(room.type),
                  height: getLocationSize(room.type),
                  backgroundColor: getLocationColor(room.type),
                  borderWidth: room.type === 'user-mesa' ? 3 : 2,
                  borderColor: room.type === 'user-mesa' ? Colors.primary : Colors.pearl,
                }
              ]}
              onPress={() => onLocationSelect(room.id)}
            >
              <Text style={[
                styles.pinText,
                { 
                  fontSize: room.type === 'user-mesa' ? 8 : 6,
                  color: Colors.pearl,
                  fontWeight: room.type === 'user-mesa' ? 'bold' : 'normal'
                }
              ]}>
                {room.number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.primary }]} />
          <ThemedText style={styles.legendText}>Tu Mesa</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.secondary }]} />
          <ThemedText style={styles.legendText}>Mesas de Votación</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.night }]} />
          <ThemedText style={styles.legendText}>Entrada</ThemedText>
        </View>
      </View>
    </View>
  );
};

// Componente de instrucciones de navegación
const LocationStep: React.FC<LocationStepProps> = ({ step, instruction, icon }) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepNumber}>
        <ThemedText style={styles.stepNumberText}>{step}</ThemedText>
      </View>
      <View style={styles.stepIcon}>
        <IconSymbol name={icon} size={20} color={Colors.primary} />
      </View>
      <ThemedText style={styles.stepInstruction}>{instruction}</ThemedText>
    </View>
  );
};

// Componente principal de ubicación integrada
export default function IntegratedLocationScreen() {
  const [currentFloor, setCurrentFloor] = useState(2);
  const [selectedLocation, setSelectedLocation] = useState<string>('Mesa 45');
  const [userMesa] = useState('Mesa 45');

  const votingCenter = {
    name: 'Colegio Nacional María Parado de Bellido',
    address: 'Av. República de Panamá 3555, San Luis 15021',
    hours: '7:00 AM - 4:00 PM',
    totalMesas: 50,
    userMesa: 'Mesa 45',
    userClassroom: 'Aula 204 - Primer Piso'
  };

  const navigationSteps = [
    {
      step: 1,
      instruction: 'Ingresa por la entrada principal del colegio',
      icon: 'entrance'
    },
    {
      step: 2,
      instruction: 'Dirígete a las escaleras centrales',
      icon: 'stairs'
    },
    {
      step: 3,
      instruction: 'Sube al primer piso',
      icon: 'floor'
    },
    {
      step: 4,
      instruction: 'Gira a la derecha y busca el Aula 204',
      icon: 'navigate'
    },
    {
      step: 5,
      instruction: 'Identifica la Mesa 45 dentro del aula',
      icon: 'classroom'
    }
  ];

  const facilities = [
    { name: 'Baños', location: 'Planta Baja y Primer Piso', icon: 'restroom' },
    { name: 'Estacionamiento', location: 'Zona exterior del colegio', icon: 'parking' },
    { name: 'Área de Espera', location: 'Patio central', icon: 'entrance' },
    { name: 'Oficina del Jurado', location: 'Aula 103 - Planta Baja', icon: 'office' },
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    Alert.alert(
      'Ubicación Seleccionada',
      `Has seleccionado: ${location}`,
      [{ text: 'OK' }]
    );
  };

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ESPACIO EN LA PARTE SUPERIOR - AÑADIDO */}
        <View style={styles.topSpacing} />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={styles.iconTitleContainer}>
              <View style={styles.iconContainer}>
                <IconSymbol name="building" size={28} color={Colors.pearl} />
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Ubicación de Votación
              </ThemedText>
            </View>
            <ThemedText style={styles.subtitle}>
              Encuentra tu mesa de votación dentro del centro electoral
            </ThemedText>
          </View>
        </View>

        {/* Mapa Integrado - NUEVA SECCIÓN */}
        <View style={styles.mapSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="location" size={20} color={Colors.primary} />
            <ThemedText style={styles.sectionTitle}>Ubicación en el Mapa</ThemedText>
          </View>
          <IntegratedMap />
        </View>

        {/* Información del centro */}
        <View style={styles.centerInfoCard}>
          <View style={styles.centerHeader}>
            <IconSymbol name="building" size={24} color={Colors.primary} />
            <ThemedText style={styles.centerName}>{votingCenter.name}</ThemedText>
          </View>
          <View style={styles.centerDetails}>
            <View style={styles.detailItem}>
              <IconSymbol name="location" size={16} color={Colors.gray} />
              <ThemedText style={styles.detailText}>{votingCenter.address}</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <IconSymbol name="time" size={16} color={Colors.gray} />
              <ThemedText style={styles.detailText}>Horario: {votingCenter.hours}</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <IconSymbol name="classroom" size={16} color={Colors.gray} />
              <ThemedText style={styles.detailText}>Tu ubicación: {votingCenter.userClassroom}</ThemedText>
            </View>
          </View>
        </View>

        {/* Selector de pisos */}
        <View style={styles.floorSelector}>
          <TouchableOpacity 
            style={[styles.floorButton, currentFloor === 1 && styles.activeFloor]}
            onPress={() => handleFloorChange(1)}
          >
            <ThemedText style={[styles.floorButtonText, currentFloor === 1 && styles.activeFloorText]}>
              Planta Baja
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.floorButton, currentFloor === 2 && styles.activeFloor]}
            onPress={() => handleFloorChange(2)}
          >
            <ThemedText style={[styles.floorButtonText, currentFloor === 2 && styles.activeFloorText]}>
              Primer Piso
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Plano interactivo */}
        <View style={styles.planSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="map" size={20} color={Colors.primary} />
            <ThemedText style={styles.sectionTitle}>Plano del Centro Electoral</ThemedText>
          </View>
          <FloorPlan 
            floor={currentFloor}
            userMesa={votingCenter.userMesa}
            onLocationSelect={handleLocationSelect}
          />
        </View>

        {/* Instrucciones de navegación */}
        <View style={styles.navigationSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="navigate" size={20} color={Colors.secondary} />
            <ThemedText style={styles.sectionTitle}>Cómo Llegar a Tu Mesa</ThemedText>
          </View>
          
          <View style={styles.stepsContainer}>
            {navigationSteps.map((step, index) => (
              <LocationStep
                key={index}
                step={step.step}
                instruction={step.instruction}
                icon={step.icon}
              />
            ))}
          </View>
        </View>

        {/* Servicios e instalaciones */}
        <View style={styles.facilitiesSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="info" size={20} color={Colors.night} />
            <ThemedText style={styles.sectionTitle}>Servicios Disponibles</ThemedText>
          </View>
          
          <View style={styles.facilitiesGrid}>
            {facilities.map((facility, index) => (
              <View key={index} style={styles.facilityCard}>
                <View style={styles.facilityIcon}>
                  <IconSymbol name={facility.icon} size={20} color={Colors.primary} />
                </View>
                <View style={styles.facilityInfo}>
                  <ThemedText style={styles.facilityName}>{facility.name}</ThemedText>
                  <ThemedText style={styles.facilityLocation}>{facility.location}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Información adicional */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <IconSymbol name="info" size={16} color={Colors.primary} />
            <ThemedText style={styles.infoText}>
              Llega con 30 minutos de anticipación para evitar aglomeraciones
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="info" size={16} color={Colors.primary} />
            <ThemedText style={styles.infoText}>
              Porta solo tu DNI original. No se aceptan fotocopias
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="info" size={16} color={Colors.primary} />
            <ThemedText style={styles.infoText}>
              Si tienes movilidad reducida, solicita asistencia en la entrada
            </ThemedText>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Ubicación integrada - No se requiere aplicación externa
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  topSpacing: {
    height: 50,
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
  // NUEVOS ESTILOS PARA EL MAPA
  mapSection: {
    marginBottom: 20,
  },
  mapContainer: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    marginLeft: 8,
  },
  mapPreview: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  mapPlaceholder: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinLabel: {
    backgroundColor: Colors.pearl,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  pinLabelText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.night,
  },
  mapButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  mapButtonText: {
    color: Colors.pearl,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  mapInfo: {
    alignItems: 'center',
  },
  mapInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    textAlign: 'center',
    marginBottom: 4,
  },
  mapInfoSubtext: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
  },
  // ESTILOS EXISTENTES (se mantienen igual)
  centerInfoCard: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  centerName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
  },
  centerDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  floorSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  floorButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
  },
  activeFloor: {
    backgroundColor: Colors.primary,
  },
  floorButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeFloorText: {
    color: Colors.pearl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    marginLeft: 8,
  },
  planSection: {
    marginBottom: 24,
  },
  floorPlanContainer: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  floorPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  floorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
  },
  floorBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  floorBadgeText: {
    color: Colors.pearl,
    fontSize: 12,
    fontWeight: '600',
  },
  floorPlan: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    marginBottom: 16,
    overflow: 'hidden',
  },
  planBackground: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  corridor: {
    backgroundColor: Colors.lightGray,
    position: 'absolute',
  },
  locationPin: {
    position: 'absolute',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pinText: {
    color: Colors.pearl,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: Colors.gray,
  },
  navigationSection: {
    marginBottom: 24,
  },
  stepsContainer: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: Colors.pearl,
    fontSize: 12,
    fontWeight: '700',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepInstruction: {
    flex: 1,
    fontSize: 14,
    color: Colors.night,
    lineHeight: 20,
  },
  facilitiesSection: {
    marginBottom: 24,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityCard: {
    width: '48%',
    backgroundColor: Colors.pearl,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  facilityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 4,
  },
  facilityLocation: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 16,
  },
  additionalInfo: {
    backgroundColor: Colors.primary + '08',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  footerText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 12,
  },
});