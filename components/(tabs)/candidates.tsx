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

// Importa tu imagen local de aforo
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

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_GAP = 12;
const SPACER = (width - CARD_WIDTH) / 2;

interface CandidateCardProps {
  party: PartidoPolitico;
  scrollX?: Animated.Value;
  index?: number;
  onViewProposals: (party: PartidoPolitico) => void;
  onViewPlan: (party: PartidoPolitico) => void;
}

// Componente para cada tarjeta de candidato/partido - DISEÑO COMPLETAMENTE REDISEÑADO
const CandidateCard: React.FC<CandidateCardProps> = ({ 
  party, 
  scrollX, 
  index,
  onViewProposals,
  onViewPlan
}) => {
  const partyColor = generatePartyColor(party.name);

  // Animación para la tarjeta centrada
  const inputRange = [
    ((index || 0) - 2) * (CARD_WIDTH + CARD_GAP),
    ((index || 0) - 1) * (CARD_WIDTH + CARD_GAP),
    (index || 0) * (CARD_WIDTH + CARD_GAP),
  ];

  const scale = scrollX?.interpolate({
    inputRange,
    outputRange: [0.90, 1, 0.90],
    extrapolate: 'clamp',
  });

  const opacity = scrollX?.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{ 
      transform: [{ scale: scale || 1 }],
      opacity: opacity || 1,
    }}>
      <View style={styles.card}>
        {/* HEADER CON LOGO Y COLOR DEL PARTIDO */}
        <View style={[styles.cardHeader, { backgroundColor: partyColor }]}>
          <View style={styles.headerContent}>
            {/* Logo del partido */}
            <View style={styles.logoContainer}>
              {party.logo ? (
                <Image 
                  source={party.logo} 
                  style={styles.partyLogo}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.fallbackLogo}>
                  <ThemedText style={styles.fallbackLogoText}>
                    {party.name.split(' ').map(word => word[0]).join('').substring(0, 3)}
                  </ThemedText>
                </View>
              )}
            </View>
            
            {/* Información principal */}
            <View style={styles.partyInfo}>
              <ThemedText style={styles.partyName}>{party.name}</ThemedText>
              <ThemedText style={styles.presidentName}>{party.president}</ThemedText>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <ThemedText style={styles.statNumber}>{party.propuestas.length}</ThemedText>
                  <ThemedText style={styles.statLabel}>Propuestas</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <ThemedText style={styles.statNumber}>{party.planes.length}</ThemedText>
                  <ThemedText style={styles.statLabel}>Planes</ThemedText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* CONTENIDO PRINCIPAL */}
        <ScrollView 
          style={styles.cardContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Propuestas destacadas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Propuestas Principales</ThemedText>
              <View style={[styles.sectionIndicator, { backgroundColor: partyColor }]} />
            </View>
            {party.propuestas.slice(0, 3).map((propuesta, idx) => (
              <View key={idx} style={styles.proposalItem}>
                <View style={[styles.proposalBullet, { backgroundColor: partyColor }]} />
                <ThemedText style={styles.proposalText}>{propuesta}</ThemedText>
              </View>
            ))}
            {party.propuestas.length > 3 && (
              <ThemedText style={styles.moreText}>
                +{party.propuestas.length - 3} propuestas más
              </ThemedText>
            )}
          </View>

          {/* Planes de gobierno */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Planes de Gobierno</ThemedText>
              <View style={[styles.sectionIndicator, { backgroundColor: partyColor }]} />
            </View>
            {party.planes.slice(0, 2).map((plan, idx) => (
              <View key={idx} style={styles.planItem}>
                <View style={[styles.planIcon, { backgroundColor: partyColor }]}>
                  <ThemedText style={styles.planIconText}>📋</ThemedText>
                </View>
                <ThemedText style={styles.planText}>{plan}</ThemedText>
              </View>
            ))}
            {party.planes.length > 2 && (
              <ThemedText style={styles.moreText}>
                +{party.planes.length - 2} planes más
              </ThemedText>
            )}
          </View>
        </ScrollView>

        {/* BOTONES DE ACCIÓN */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.proposalsButton, { borderColor: partyColor }]}
            onPress={() => onViewProposals(party)}
          >
            <ThemedText style={[styles.actionButtonText, { color: partyColor }]}>
              Ver Todas las Propuestas
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.planButton, { backgroundColor: partyColor }]}
            onPress={() => onViewPlan(party)}
          >
            <ThemedText style={styles.actionButtonText}>
              Plan de Gobierno Completo
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

// Componente Modal para Propuestas (MEJORADO)
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
        <View style={[styles.modalHeader, { backgroundColor: partyColor }]}>
          <View style={styles.modalHeaderContent}>
            <View>
              <ThemedText style={styles.modalTitle}>Propuestas Detalladas</ThemedText>
              <ThemedText style={styles.modalSubtitle}>{party.name}</ThemedText>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.modalStats}>
            <View style={styles.modalStat}>
              <ThemedText style={styles.modalStatNumber}>{party.propuestas.length}</ThemedText>
              <ThemedText style={styles.modalStatLabel}>Propuestas Totales</ThemedText>
            </View>
          </View>

          {party.propuestas.map((propuesta, index) => (
            <View key={index} style={styles.modalListItem}>
              <View style={[styles.modalNumber, { backgroundColor: partyColor }]}>
                <ThemedText style={styles.modalNumberText}>{index + 1}</ThemedText>
              </View>
              <View style={styles.modalTextContent}>
                <ThemedText style={styles.modalListItemText}>{propuesta}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

// Componente Modal para Plan de Gobierno (MEJORADO)
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
        <View style={[styles.modalHeader, { backgroundColor: partyColor }]}>
          <View style={styles.modalHeaderContent}>
            <View>
              <ThemedText style={styles.modalTitle}>Plan de Gobierno</ThemedText>
              <ThemedText style={styles.modalSubtitle}>{party.name}</ThemedText>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.modalStats}>
            <View style={styles.modalStat}>
              <ThemedText style={styles.modalStatNumber}>{party.planes.length}</ThemedText>
              <ThemedText style={styles.modalStatLabel}>Planes Estratégicos</ThemedText>
            </View>
          </View>

          {party.planes.map((plan, index) => (
            <View key={index} style={styles.modalPlanItem}>
              <View style={[styles.modalPlanIcon, { backgroundColor: partyColor }]}>
                <ThemedText style={styles.modalPlanIconText}>🎯</ThemedText>
              </View>
              <View style={styles.modalPlanContent}>
                <ThemedText style={styles.modalPlanTitle}>Plan Estratégico {index + 1}</ThemedText>
                <ThemedText style={styles.modalPlanText}>{plan}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

// El resto del componente CandidatesScreen se mantiene igual...
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
              📱 {parties.length} partidos cargados
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
  // NUEVOS ESTILOS PARA EL CARD REDISEÑADO
  card: {
    width: CARD_WIDTH,
    height: 520,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: CARD_GAP / 2,
    backgroundColor: Colors.pearl,
    elevation: 12,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  cardHeader: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.pearl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 4,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  partyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  fallbackLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackLogoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.night,
  },
  partyInfo: {
    flex: 1,
  },
  partyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.pearl,
    marginBottom: 4,
  },
  presidentName: {
    fontSize: 14,
    color: Colors.pearl,
    opacity: 0.9,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.pearl,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.pearl,
    opacity: 0.8,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.pearl,
    opacity: 0.3,
    marginHorizontal: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.night,
    marginRight: 8,
  },
  sectionIndicator: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  proposalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  proposalBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 12,
  },
  proposalText: {
    flex: 1,
    fontSize: 13,
    color: Colors.night,
    lineHeight: 18,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  planIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planIconText: {
    fontSize: 14,
  },
  planText: {
    flex: 1,
    fontSize: 13,
    color: Colors.night,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 12,
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  actionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  proposalsButton: {
    backgroundColor: 'transparent',
  },
  planButton: {
    backgroundColor: Colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Estilos para modales mejorados
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.pearl,
  },
  modalHeader: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.pearl,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.pearl,
    opacity: 0.9,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.pearl,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalStats: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalStat: {
    alignItems: 'center',
  },
  modalStatNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.night,
  },
  modalStatLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  modalListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
  },
  modalNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.pearl,
  },
  modalTextContent: {
    flex: 1,
  },
  modalListItemText: {
    fontSize: 14,
    color: Colors.night,
    lineHeight: 20,
  },
  modalPlanItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
  },
  modalPlanIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalPlanIconText: {
    fontSize: 16,
  },
  modalPlanContent: {
    flex: 1,
  },
  modalPlanTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.night,
    marginBottom: 4,
  },
  modalPlanText: {
    fontSize: 14,
    color: Colors.night,
    lineHeight: 20,
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
});