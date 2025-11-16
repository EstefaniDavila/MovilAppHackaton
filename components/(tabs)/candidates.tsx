import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/colors';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78;
const CARD_GAP = 16;
const SPACER = (width - CARD_WIDTH) / 2;

// Interfaces TypeScript
interface Party {
  id: string;
  name: string;
  candidate: string;
  slogan: string;
  partyLogo: string;
  candidatePhoto: string;
  color: string;
  isSpacer?: boolean;
}

interface CandidateCardProps {
  party: Party;
  scrollX?: Animated.Value;
  index?: number;
  onViewProposals: (party: Party) => void;
  onViewPlan: (party: Party) => void;
}

// Datos simulados de partidos y candidatos con fotos realistas
const MOCK_PARTIES: Party[] = [
  {
    id: '1',
    name: 'Partido Esperanza Ciudadana',
    candidate: 'Dra. María Fernández',
    slogan: 'Un futuro brillante para todos.',
    partyLogo: 'https://placehold.co/100x100/D70026/FFFFFF?text=PEC',
    candidatePhoto: 'https://placehold.co/300x400/D70026/FFFFFF?text=María+Fernández',
    color: Colors.primary,
  },
  {
    id: '2',
    name: 'Alianza por el Progreso',
    candidate: 'Ing. Juan Pérez',
    slogan: 'Trabajo y desarrollo para la nación.',
    partyLogo: 'https://placehold.co/100x100/000B29/FFFFFF?text=APP',
    candidatePhoto: 'https://placehold.co/300x400/000B29/FFFFFF?text=Juan+Pérez',
    color: Colors.night,
  },
  {
    id: '3',
    name: 'Movimiento Unión Democrática',
    candidate: 'Lic. Laura García',
    slogan: 'La voz del pueblo, nuestra fuerza.',
    partyLogo: 'https://placehold.co/100x100/EDB83D/000000?text=MUD',
    candidatePhoto: 'https://placehold.co/300x400/EDB83D/000000?text=Laura+García',
    color: Colors.secondary,
  },
  {
    id: '4',
    name: 'Frente Joven',
    candidate: 'Sr. Carlos Ruiz',
    slogan: 'Innovación y nuevas ideas.',
    partyLogo: 'https://placehold.co/100x100/808080/FFFFFF?text=FJ',
    candidatePhoto: 'https://placehold.co/300x400/808080/FFFFFF?text=Carlos+Ruiz',
    color: Colors.gray,
  },
];

// Agregar elementos espaciadores al inicio y final para centrado
const DATA_WITH_SPACERS: Party[] = [
  { id: 'left-spacer', isSpacer: true } as Party,
  ...MOCK_PARTIES,
  { id: 'right-spacer', isSpacer: true } as Party
];

// Componente para cada tarjeta de candidato/partido
const CandidateCard: React.FC<CandidateCardProps> = ({ 
  party, 
  scrollX, 
  index,
  onViewProposals,
  onViewPlan
}) => {
  if (party.isSpacer) {
    return <View style={{ width: SPACER - CARD_GAP }} />;
  }

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
          source={{ uri: party.candidatePhoto }} 
          style={styles.candidatePhoto} 
        />
        
        {/* Overlay con gradiente */}
        <View style={[styles.photoOverlay, { backgroundColor: party.color }]} />
        
        {/* Header con logo del partido */}
        <View style={styles.cardHeader}>
          <View style={[styles.partyLogoContainer, { backgroundColor: Colors.pearl }]}>
            <Image source={{ uri: party.partyLogo }} style={styles.partyLogo} />
          </View>
        </View>
        
        <View style={styles.cardContent}>
          {/* Información del candidato */}
          <View style={styles.candidateInfo}>
            <ThemedText style={styles.candidateName}>{party.candidate}</ThemedText>
            <ThemedText style={styles.partyName}>{party.name}</ThemedText>
            
            {/* Línea divisora */}
            <View style={[styles.divider, { backgroundColor: Colors.pearl }]} />
            
            <ThemedText style={styles.slogan}>"{party.slogan}"</ThemedText>
          </View>

          {/* Botones de acción */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.proposalsButton, { backgroundColor: party.color }]}
              onPress={() => onViewProposals(party)}
            >
              <ThemedText style={styles.actionButtonText}>Ver Propuestas</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.planButton, { borderColor: party.color }]}
              onPress={() => onViewPlan(party)}
            >
              <ThemedText style={[styles.actionButtonText, { color: party.color }]}>
                Plan de Gobierno
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Borde inferior decorativo */}
        <View style={[styles.cardBorder, { backgroundColor: party.color }]} />
      </View>
    </Animated.View>
  );
};

export default function CandidatesScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleViewProposals = (party: Party) => {
    console.log('Ver propuestas de:', party.candidate);
    // Aquí puedes navegar a la pantalla de propuestas o mostrar modal
  };

  const handleViewPlan = (party: Party) => {
    console.log('Ver plan de gobierno de:', party.candidate);
    // Aquí puedes navegar a la pantalla del plan o mostrar modal
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header mejorado */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.mainTitle}>
            Candidatos 2024
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Conoce a los candidatos y sus propuestas para el futuro
          </ThemedText>
        </View>

        {/* Indicador de progreso */}
        <View style={styles.progressIndicator}>
          {MOCK_PARTIES.map((party, index) => (
            <View 
              key={index}
              style={[
                styles.progressDot,
                currentIndex === index && styles.progressDotActive,
                currentIndex === index && { backgroundColor: party.color }
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
            <CandidateCard 
              party={item} 
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
          {currentIndex + 1} de {MOCK_PARTIES.length}
        </ThemedText>
        <ThemedText style={styles.currentCandidateText}>
          {MOCK_PARTIES[currentIndex]?.candidate}
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
          Desliza para explorar
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
    marginBottom: 16,
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