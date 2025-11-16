import React, { useRef, useState, useEffect } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import { Colors } from '../../constants/colors';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import partidosData from '../../data/partidos.json'; // Importar el JSON

// Interface basada en la nueva estructura JSON
interface PoliticalParty {
  name: string;
  president: string;
  logo: string | null;
  propuestas: string[];
  planes: string[];
}

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
  party: PoliticalParty;
  scrollX?: Animated.Value;
  index?: number;
  onViewProposals: (party: PoliticalParty) => void;
  onViewPlan: (party: PoliticalParty) => void;
}

// Función para generar foto del candidato basado en el nombre
const generateCandidatePhoto = (candidateName: string, partyName: string): string => {
  const text = candidateName?.split(' ').map(n => n[0]).join('') || 
               partyName.split(' ').map(n => n[0]).join('').substring(0, 2);
  return `https://placehold.co/300x400/666666/FFFFFF?text=${encodeURIComponent(text)}`;
};

// Componente para cada tarjeta de candidato/partido
const CandidateCard: React.FC<CandidateCardProps> = ({ 
  party, 
  scrollX, 
  index,
  onViewProposals,
  onViewPlan
}) => {
  const candidatePhoto = generateCandidatePhoto(party.president, party.name);
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
        {/* Fondo con foto del candidato */}
        <Image 
          source={{ uri: candidatePhoto }} 
          style={styles.candidatePhoto} 
        />
        
        {/* Overlay con gradiente */}
        <View style={[styles.photoOverlay, { backgroundColor: partyColor }]} />
        
        {/* Header con logo del partido */}
        <View style={styles.cardHeader}>
          <View style={[styles.partyLogoContainer, { backgroundColor: Colors.pearl }]}>
            {party.logo ? (
              <Image source={{ uri: party.logo }} style={styles.partyLogo} />
            ) : (
              <ThemedText style={[styles.partyLogoText, { color: partyColor }]}>
                {party.name.split(' ').map(word => word[0]).join('').substring(0, 3)}
              </ThemedText>
            )}
          </View>
        </View>
        
        <View style={styles.cardContent}>
          {/* Información del candidato */}
          <View style={styles.candidateInfo}>
            <ThemedText style={styles.candidateName}>
              {party.president}
            </ThemedText>
            <ThemedText style={styles.partyName}>{party.name}</ThemedText>
            
            {/* Línea divisora */}
            <View style={[styles.divider, { backgroundColor: Colors.pearl }]} />
            
            <ThemedText style={styles.slogan}>
              "{slogan}"
            </ThemedText>
          </View>

          {/* Botones de acción */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.proposalsButton, { backgroundColor: partyColor }]}
              onPress={() => onViewProposals(party)}
            >
              <ThemedText style={styles.actionButtonText}>
                Ver Propuestas ({party.propuestas.length})
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.planButton, { borderColor: partyColor }]}
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

interface CandidatesScreenProps {
  onViewProposals?: (party: PoliticalParty) => void;
  onViewPlan?: (party: PoliticalParty) => void;
}

export default function CandidatesScreen({ 
  onViewProposals, 
  onViewPlan 
}: CandidatesScreenProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parties, setParties] = useState<PoliticalParty[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos del JSON
  useEffect(() => {
    const loadParties = () => {
      try {
        // Usar los datos del JSON importado
        setParties(partidosData as PoliticalParty[]);
        setLoading(false);
        
        console.log(`✅ Cargados ${partidosData.length} partidos desde JSON`);
      } catch (error) {
        console.error('Error cargando datos del JSON:', error);
        setLoading(false);
      }
    };

    // Simular un pequeño delay para mejor UX
    const timer = setTimeout(() => {
      loadParties();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Agregar elementos espaciadores al inicio y final para centrado
  const DATA_WITH_SPACERS: (PoliticalParty & { id: string; isSpacer?: boolean })[] = parties.length > 0 
    ? [
        { 
          id: 'left-spacer', 
          name: '', 
          president: '', 
          logo: null, 
          propuestas: [], 
          planes: [], 
          isSpacer: true 
        },
        ...parties.map((party, index) => ({
          ...party,
          id: `party-${index}`
        })),
        { 
          id: 'right-spacer', 
          name: '', 
          president: '', 
          logo: null, 
          propuestas: [], 
          planes: [], 
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

  const handleViewProposals = (party: PoliticalParty) => {
    console.log('🔍 Ver propuestas de:', party.president);
    console.log('🏛️ Partido:', party.name);
    console.log('📋 Propuestas:', party.propuestas);
    onViewProposals?.(party);
  };

  const handleViewPlan = (party: PoliticalParty) => {
    console.log('📊 Ver plan de gobierno de:', party.president);
    console.log('🏛️ Partido:', party.name);
    console.log('🗓️ Plan:', party.planes);
    onViewPlan?.(party);
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
            Conoce a los candidatos, sus propuestas y planes de gobierno
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
            item.isSpacer ? 
              <View style={{ width: SPACER - CARD_GAP }} /> :
              <CandidateCard 
                party={item as PoliticalParty} 
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
  candidatePhoto: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
  },
  cardHeader: {
    padding: 20,
    alignItems: 'flex-start',
  },
  partyLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  partyLogo: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  partyLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  candidateInfo: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  candidateName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.pearl,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  partyName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.pearl,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  divider: {
    width: 50,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
    opacity: 0.9,
  },
  slogan: {
    fontSize: 16,
    color: Colors.pearl,
    fontStyle: 'italic',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  proposalsButton: {
    // Estilos específicos para el botón de propuestas
  },
  planButton: {
    backgroundColor: Colors.pearl,
    borderWidth: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.pearl,
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
});