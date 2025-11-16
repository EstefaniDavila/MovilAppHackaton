import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/colors';
import partidosData, { PartidoPolitico } from '../../data/partidos';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

// Importa tu imagen local de aforo - AJUSTA LA RUTA SEGÚN TU PROYECTO
import aforoImage from '../../assets/images/CuyPresidente.jpeg';

// Función para generar color basado en el nombre del partido
const generatePartyColor = (partyName: string): string => {
  const colors = [
    Colors.primary,
    '#2E86AB',
    '#A23B72',
    '#F18F01',
    '#C73E1D',
    '#3BB273',
    '#7768AE',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA62B',
    '#8FBC94',
    '#C44536',
    '#6A0572',
    '#1A936F'
  ];
  
  const hash = partyName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

// Función para generar slogan basado en el nombre del partido
const generateSlogan = (partyName: string): string => {
  const slogans = [
    "Por un Perú mejor",
    "Juntos hacia el futuro",
    "La fuerza del cambio",
    "Unidos por el progreso",
    "Trabajo y desarrollo",
    "Innovación y tradición",
    "Justicia y equidad",
    "Libertad y responsabilidad",
    "Patria y progreso",
    "Educación y valores"
  ];
  
  const hash = partyName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return slogans[Math.abs(hash) % slogans.length];
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78;
const CARD_GAP = 16;
const SPACER = (width - CARD_WIDTH) / 2;

interface CandidateCardProps {
  party: PartidoPolitico;
  scrollX?: Animated.Value;
  index?: number;
  onViewProposals: (party: PartidoPolitico) => void;
  onViewPlan: (party: PartidoPolitico) => void;
}

// Componente para cada tarjeta de candidato/partido
const CandidateCard: React.FC<CandidateCardProps> = ({ 
  party, 
  scrollX, 
  index,
  onViewProposals,
  onViewPlan
}) => {
  const partyColor = generatePartyColor(party.name);
  const slogan = generateSlogan(party.name);

  // Animación para la tarjeta centrada
  const inputRange = [
    ((index || 0) - 2) * (CARD_WIDTH + CARD_GAP),
    ((index || 0) - 1) * (CARD_WIDTH + CARD_GAP),
    (index || 0) * (CARD_WIDTH + CARD_GAP),
  ];

  const scale = scrollX?.interpolate({
    inputRange,
    outputRange: [0.92, 1, 0.92],
    extrapolate: 'clamp',
  });

  const opacity = scrollX?.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{ 
      transform: [{ scale: scale || 1 }],
      opacity: opacity || 1,
    }}>
      <View style={styles.card}>
        {/* Sección de aforo de votación - MISMA IMAGEN PARA TODOS */}
        <View style={[styles.aforoContainer, { backgroundColor: partyColor }]}>
          <Image 
            source={aforoImage} 
            style={styles.aforoImage}
            resizeMode="cover"
          />
          <View style={styles.aforoOverlay}>
            <ThemedText style={styles.aforoTitle}>Aforo de Sufragio</ThemedText>
            <ThemedText style={styles.aforoSubtitle}>Elecciones 2024</ThemedText>
          </View>
        </View>
        
        {/* Información del partido */}
        <View style={styles.cardContent}>
          <ThemedText style={styles.partyName}>{party.name}</ThemedText>
          <ThemedText style={styles.candidateName}>
            {party.president}
          </ThemedText>
          
          {/* Línea divisora */}
          <View style={[styles.divider, { backgroundColor: partyColor }]} />
          
          <ThemedText style={styles.slogan}>
            "{slogan}"
          </ThemedText>

          {/* Botones de acción */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: partyColor }]}
              onPress={() => onViewProposals(party)}
            >
              <ThemedText style={styles.actionButtonText}>
                Propuestas ({party.propuestas.length})
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { borderColor: partyColor, backgroundColor: Colors.pearl }]}
              onPress={() => onViewPlan(party)}
            >
              <ThemedText style={[styles.actionButtonText, { color: partyColor }]}>
                Plan de Gobierno ({party.planes.length})
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Borde inferior decorativo */}
        <View style={[styles.cardBorder, { backgroundColor: partyColor }]} />
      </View>
    </Animated.View>
  );
};

// Componente Modal para Propuestas
const PropuestasModal: React.FC<{
  visible: boolean;
  party: PartidoPolitico | null;
  onClose: () => void;
}> = ({ visible, party, onClose }) => {
  if (!party) return null;

  const partyColor = generatePartyColor(party.name);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <ThemedText style={styles.modalTitle}>Propuestas</ThemedText>
          <ThemedText style={styles.modalSubtitle}>{party.name}</ThemedText>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={[styles.sectionHeader, { backgroundColor: partyColor }]}>
            <ThemedText style={styles.sectionTitle}>
              Principales Propuestas ({party.propuestas.length})
            </ThemedText>
          </View>
          
          {party.propuestas.map((propuesta, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: partyColor }]} />
              <ThemedText style={styles.listText}>{propuesta}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

// Componente Modal para Plan de Gobierno
const PlanModal: React.FC<{
  visible: boolean;
  party: PartidoPolitico | null;
  onClose: () => void;
}> = ({ visible, party, onClose }) => {
  if (!party) return null;

  const partyColor = generatePartyColor(party.name);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <ThemedText style={styles.modalTitle}>Plan de Gobierno</ThemedText>
          <ThemedText style={styles.modalSubtitle}>{party.name}</ThemedText>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={[styles.sectionHeader, { backgroundColor: partyColor }]}>
            <ThemedText style={styles.sectionTitle}>
              Planes de Gobierno ({party.planes.length})
            </ThemedText>
          </View>
          
          {party.planes.map((plan, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: partyColor }]} />
              <ThemedText style={styles.listText}>{plan}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

interface CandidatesScreenProps {
  onViewProposals?: (party: PartidoPolitico) => void;
  onViewPlan?: (party: PartidoPolitico) => void;
}

export default function CandidatesScreen({ 
  onViewProposals, 
  onViewPlan 
}: CandidatesScreenProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parties, setParties] = useState<PartidoPolitico[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para modales
  const [propuestasModalVisible, setPropuestasModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState<PartidoPolitico | null>(null);

  // Cargar datos desde el archivo TypeScript
  useEffect(() => {
    const loadParties = () => {
      try {
        setParties(partidosData);
        setLoading(false);
        console.log(`✅ Cargados ${partidosData.length} partidos desde TypeScript`);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadParties();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Agregar elementos espaciadores al inicio y final para centrado
  const DATA_WITH_SPACERS: ((PartidoPolitico & { id: string }) | { id: string; isSpacer: boolean })[] = parties.length > 0 
    ? [
        { 
          id: 'left-spacer', 
          isSpacer: true 
        },
        ...parties.map((party, index) => ({
          ...party,
          id: `party-${index}`
        })),
        { 
          id: 'right-spacer', 
          isSpacer: true 
        }
      ]
    : [];

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_GAP));
        setCurrentIndex(Math.max(0, index));
      }
    }
  );

  const handleViewProposals = (party: PartidoPolitico) => {
    setSelectedParty(party);
    setPropuestasModalVisible(true);
    onViewProposals?.(party);
  };

  const handleViewPlan = (party: PartidoPolitico) => {
    setSelectedParty(party);
    setPlanModalVisible(true);
    onViewPlan?.(party);
  };

  const closePropuestasModal = () => {
    setPropuestasModalVisible(false);
    setSelectedParty(null);
  };

  const closePlanModal = () => {
    setPlanModalVisible(false);
    setSelectedParty(null);
  };

  // Pantalla de carga
  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <ThemedText style={styles.loadingText}>
          Cargando partidos políticos...
        </ThemedText>
        <ThemedText style={styles.offlineText}>
          Datos locales cargados
        </ThemedText>
      </ThemedView>
    );
  }

  // Pantalla sin datos
  if (parties.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyTitle}>No hay partidos políticos</ThemedText>
        <ThemedText style={styles.emptyText}>
          No se encontraron partidos políticos en la base de datos.
        </ThemedText>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => window.location.reload()}
        >
          <ThemedText style={styles.retryButtonText}>Reintentar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header mejorado */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.mainTitle}>
            Partidos Políticos 2024
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Conoce los partidos, sus candidatos y planes de gobierno
          </ThemedText>
          <View style={styles.offlineBadge}>
            <ThemedText style={styles.offlineBadgeText}>
              📱 Datos Locales - {parties.length} partidos cargados
            </ThemedText>
          </View>
        </View>

        {/* Indicador de progreso */}
        <View style={styles.progressIndicator}>
          {parties.map((party, index) => (
            <View 
              key={index}
              style={[
                styles.progressDot,
                currentIndex === index && styles.progressDotActive,
                currentIndex === index && { backgroundColor: generatePartyColor(party.name) }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Carrusel con animaciones */}
      <View style={styles.carouselWrapper}>
        <Animated.FlatList
          data={DATA_WITH_SPACERS}
          renderItem={({ item, index }) => (
            'isSpacer' in item && item.isSpacer ? 
              <View style={{ width: SPACER - CARD_GAP }} /> :
              <CandidateCard 
                party={item as PartidoPolitico} 
                scrollX={scrollX}
                index={index}
                onViewProposals={handleViewProposals}
                onViewPlan={handleViewPlan}
              />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={onScroll}
          snapToAlignment="center"
        />
      </View>

      {/* Información del candidato actual */}
      <View style={styles.currentInfo}>
        <ThemedText style={styles.currentInfoText}>
          {currentIndex + 1} de {parties.length}
        </ThemedText>
        <ThemedText style={styles.currentCandidateText}>
          {parties[currentIndex]?.president}
        </ThemedText>
        <ThemedText style={styles.currentPartyText}>
          {parties[currentIndex]?.name}
        </ThemedText>
      </View>

      {/* Indicador de scroll mejorado */}
      <View style={styles.scrollIndicator}>
        <View style={styles.scrollDots}>
          <View style={[styles.scrollDot, { backgroundColor: Colors.primary }]} />
          <View style={[styles.scrollDot, { backgroundColor: Colors.primary }]} />
          <View style={[styles.scrollDot, { backgroundColor: Colors.primary }]} />
        </View>
        <ThemedText style={styles.scrollText}>
          Desliza para explorar {parties.length} partidos
        </ThemedText>
      </View>

      {/* Modales */}
      <PropuestasModal
        visible={propuestasModalVisible}
        party={selectedParty}
        onClose={closePropuestasModal}
      />
      
      <PlanModal
        visible={planModalVisible}
        party={selectedParty}
        onClose={closePlanModal}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pearl,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pearl,
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
  offlineText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pearl,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.night,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.pearl,
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  titleSection: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.night,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  offlineBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
  },
  offlineBadgeText: {
    fontSize: 12,
    color: Colors.night,
    fontWeight: '600',
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
  },
  progressDotActive: {
    width: 24,
  },
  carouselWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 480,
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: CARD_GAP / 2,
    backgroundColor: Colors.pearl,
    elevation: 8,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  // Nuevos estilos para la sección de aforo
  aforoContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  aforoImage: {
    width: '50%',
    height: '100%',
    opacity: 0.8,
  },
  aforoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  aforoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.pearl,
    textAlign: 'center',
    marginBottom: 8,
  },
  aforoSubtitle: {
    fontSize: 16,
    color: Colors.pearl,
    textAlign: 'center',
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  partyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.night,
    marginBottom: 8,
    textAlign: 'center',
  },
  candidateName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 16,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
    alignSelf: 'center',
  },
  slogan: {
    fontSize: 14,
    color: Colors.gray,
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  currentInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  currentInfoText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentCandidateText: {
    fontSize: 16,
    color: Colors.night,
    fontWeight: '700',
  },
  currentPartyText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  scrollIndicator: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 24,
  },
  scrollDots: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  scrollDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    opacity: 0.6,
  },
  scrollText: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: '500',
  },
  // Estilos para modales
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.pearl,
  },
  modalHeader: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.night,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.night,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.pearl,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: Colors.night,
    lineHeight: 22,
  },
});