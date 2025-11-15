import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Platform, 
  View,
  Animated 
} from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Colors } from '../../constants/colors'; 

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
  logo: string;
  backgroundImage: string;
  color: string;
  isSpacer?: boolean;
}

interface CandidateCardProps {
  party: Party;
  scrollX?: Animated.Value;
  index?: number;
}

// Datos simulados de partidos y candidatos
const MOCK_PARTIES: Party[] = [
  {
    id: '1',
    name: 'Partido Esperanza Ciudadana',
    candidate: 'Dra. María Fernández',
    slogan: 'Un futuro brillante para todos.',
    logo: 'https://placehold.co/120x120/D70026/F8F5F2?text=PEC',
    backgroundImage: 'https://placehold.co/400x300/D70026/000B29?text=Maria',
    color: Colors.primary,
  },
  {
    id: '2',
    name: 'Alianza por el Progreso',
    candidate: 'Ing. Juan Pérez',
    slogan: 'Trabajo y desarrollo para la nación.',
    logo: 'https://placehold.co/120x120/000B29/F8F5F2?text=APP',
    backgroundImage: 'https://placehold.co/400x300/000B29/F8F5F2?text=Juan',
    color: Colors.night,
  },
  {
    id: '3',
    name: 'Movimiento Unión Democrática',
    candidate: 'Lic. Laura García',
    slogan: 'La voz del pueblo, nuestra fuerza.',
    logo: 'https://placehold.co/120x120/EDB83D/000B29?text=MUD',
    backgroundImage: 'https://placehold.co/400x300/EDB83D/000B29?text=Laura',
    color: Colors.secondary,
  },
  {
    id: '4',
    name: 'Frente Joven',
    candidate: 'Sr. Carlos Ruiz',
    slogan: 'Innovación y nuevas ideas.',
    logo: 'https://placehold.co/120x120/808080/FFFFFF?text=FJ',
    backgroundImage: 'https://placehold.co/400x300/808080/FFFFFF?text=Carlos',
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
const CandidateCard: React.FC<CandidateCardProps> = ({ party, scrollX, index }) => {
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
      <TouchableOpacity 
        style={styles.card}
        onPress={() => console.log(`Ver detalles de ${party.candidate} (${party.name})`)}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: party.backgroundImage }} 
          style={styles.cardBackgroundImage} 
        />
        
        {/* Overlay con gradiente sutil */}
        <View style={[styles.cardOverlay, { 
          backgroundColor: party.color,
        }]} />
        
        {/* Efecto de brillo superior */}
        <View style={styles.cardShine} />
        
        <View style={styles.cardContent}>
          {/* Logo con efecto destacado */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoBackground, { backgroundColor: party.color }]} />
            <Image source={{ uri: party.logo }} style={styles.partyLogo} />
          </View>
          
          {/* Información del partido */}
          <View style={styles.partyInfo}>
            <ThemedText style={styles.partyName}>{party.name}</ThemedText>
            <ThemedText style={styles.candidateName}>{party.candidate}</ThemedText>
            
            {/* Línea divisora */}
            <View style={[styles.divider, { backgroundColor: Colors.pearl }]} />
            
            <ThemedText style={styles.slogan}>"{party.slogan}"</ThemedText>
          </View>

          {/* Botón de acción */}
          <View style={[styles.actionButton, { backgroundColor: party.color }]}>
            <ThemedText style={styles.actionText}>Ver Propuestas</ThemedText>
          </View>
        </View>
        
        {/* Borde inferior decorativo */}
        <View style={[styles.cardBorder, { backgroundColor: party.color }]} />
      </TouchableOpacity>
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
          {MOCK_PARTIES.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.progressDot,
                currentIndex === index && styles.progressDotActive,
                currentIndex === index && { backgroundColor: MOCK_PARTIES[index].color }
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
    height: 420,
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
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  cardShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  logoBackground: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.2,
    top: -10,
  },
  partyLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: Colors.pearl,
    backgroundColor: Colors.pearl,
  },
  partyInfo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  partyName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.pearl,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  candidateName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.pearl,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  divider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
    opacity: 0.9,
  },
  slogan: {
    fontSize: 15,
    color: Colors.pearl,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    color: Colors.pearl,
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