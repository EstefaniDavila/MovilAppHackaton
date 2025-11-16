import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, View, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/colors';

// Interfaces TypeScript basadas en las APIs reales
interface AdminPost {
  id: string;
  title: string;
  body: string;
  political_party_id: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

interface PoliticalPost {
  id: string;
  title: string;
  body: string;
  political_party_id: string;
  political_party_name: string;
  source: string | null;
  created_at: string;
  updated_at: string;
}

interface NewsItem {
  id: string;
  title: string;
  body: string;
  source: string;
  date: string;
  image: string;
  isOfficial: boolean;
  category: string;
  partyId?: string;
  partyName?: string;
  created_at: string;
}

interface NewsCardProps {
  news: NewsItem;
}

// Paleta de colores especificada
const APP_COLORS = {
  primary: '#D70026', // Phone Booth Red
  secondary: '#EDB83D', // Flash
  night: '#000B29', // Night
  pearl: '#F8F5F2', // Pearl
  gray: '#6b7280', // Gris para textos secundarios
  lightGray: '#e5e7eb', // Gris claro para bordes
  white: '#ffffff',
  black: '#000000',
};

// Simulación de datos del usuario
const USER_DATA = {
  followedParties: ['4524f34b-d9ec-4eb6-a8dd-a2b7bbac1f64'], // AHORA NACION - AN
  userParty: '4524f34b-d9ec-4eb6-a8dd-a2b7bbac1f64'
};

const API_URL = 'https://johnnie-unlabouring-intriguingly.ngrok-free.dev';

// Lista de imágenes reales relacionadas con elecciones y política
const ELECTION_IMAGES = [
  'https://images.unsplash.com/photo-1551135049-8a33b42738b7?w=600&h=400&fit=crop', // Urna electoral
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop', // Personas votando
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop', // Bandera y elecciones
  'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=400&fit=crop', // Debate político
  'https://images.unsplash.com/photo-1551833997-05a3c8f8c4b6?w=600&h=400&fit=crop', // Multitud en mitin
  'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=600&h=400&fit=crop', // Campaña electoral
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop', // Documentos electorales
  'https://images.unsplash.com/photo-1551833997-05a3c8f8c4b6?w=600&h=400&fit=crop', // Protesta pacífica
  'https://images.unsplash.com/photo-1580136579317-311c8a7c1c3c?w=600&h=400&fit=crop', // Gobierno y política
  'https://images.unsplash.com/photo-1551135049-8a33b42738b7?w=600&h=400&fit=crop', // Votación
  'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=400&fit=crop', // Discurso político
  'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=600&h=400&fit=crop', // Campaña
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop', // Elecciones
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop', // Democracia
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop', // Voto
];

// Imágenes específicas para noticias oficiales
const OFFICIAL_IMAGES = [
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop', // Documentos oficiales
  'https://images.unsplash.com/photo-1580136579317-311c8a7c1c3c?w=600&h=400&fit=crop', // Gobierno
  'https://images.unsplash.com/photo-1551135049-8a33b42738b7?w=600&h=400&fit=crop', // Proceso electoral
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop', // Institución electoral
];

// Componente del Contador para 12 de abril de 2026
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-04-12T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <View style={styles.timeUnit}>
      <ThemedText style={styles.timeValue}>{value.toString().padStart(2, '0')}</ThemedText>
      <ThemedText style={styles.timeLabel}>{label}</ThemedText>
    </View>
  );

  return (
    <View style={styles.countdownContainer}>
      <ThemedText style={styles.countdownTitle}>
        Elecciones 2026
      </ThemedText>
      <View style={styles.countdownRow}>
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Minutos" />
        <TimeUnit value={timeLeft.seconds} label="Segundos" />
      </View>
      <ThemedText style={styles.countdownSubtitle}>
        Domingo, 12 de abril de 2026
      </ThemedText>
    </View>
  );
};

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return 'Hace unos minutos';
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
};

// Función MEJORADA para generar imagen aleatoria basada en el tipo de noticia
const generateNewsImage = (news: NewsItem) => {
  // Si ya tiene una imagen y no está vacía, usarla
  if (news.image && news.image.trim() !== '') {
    return news.image;
  }
  
  // Para noticias oficiales, usar imágenes específicas de gobierno/elecciones
  if (news.isOfficial) {
    const index = Math.abs(news.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % OFFICIAL_IMAGES.length;
    return OFFICIAL_IMAGES[index];
  }
  
  // Para noticias de partidos, usar imágenes generales de elecciones
  const index = Math.abs(news.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % ELECTION_IMAGES.length;
  return ELECTION_IMAGES[index];
};

// Componente Card de Noticia MEJORADO con manejo robusto de imágenes
const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [imageError, setImageError] = useState(false);
  
  const getCategoryColor = () => {
    switch (news.category) {
      case 'OFICIAL':
        return APP_COLORS.primary;
      case 'PARTIDO':
        return APP_COLORS.secondary;
      default:
        return APP_COLORS.night;
    }
  };

  const getCategoryTextColor = () => {
    return APP_COLORS.pearl;
  };

  const isUserPartyNews = news.partyId === USER_DATA.userParty;
  const isFollowedPartyNews = USER_DATA.followedParties.includes(news.partyId || '');

  // Función para obtener imagen de respaldo
  const getFallbackImage = () => {
    if (news.isOfficial) {
      return OFFICIAL_IMAGES[0];
    }
    return ELECTION_IMAGES[0];
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => Alert.alert(news.title, news.body, [{ text: 'OK' }])}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageError ? getFallbackImage() : news.image }} 
          style={styles.cardImage}
          defaultSource={{ uri: ELECTION_IMAGES[0] }}
          onError={() => setImageError(true)}
        />
        <View style={styles.imageOverlay} />
        
        <View style={[styles.floatingBadge, { backgroundColor: getCategoryColor() }]}>
          <ThemedText style={[styles.floatingBadgeText, { color: getCategoryTextColor() }]}>
            {news.category}
          </ThemedText>
        </View>

        {isUserPartyNews && (
          <View style={[styles.partyBadge, styles.userPartyBadge]}>
            <ThemedText style={styles.partyBadgeText}>Tu Partido</ThemedText>
          </View>
        )}

        {isFollowedPartyNews && !isUserPartyNews && (
          <View style={[styles.partyBadge, styles.followedPartyBadge]}>
            <ThemedText style={styles.partyBadgeText}>Siguiendo</ThemedText>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <View style={styles.sourceContainer}>
            <ThemedText style={styles.sourceText}>{news.source}</ThemedText>
            {news.isOfficial && (
              <View style={styles.verifiedDot} />
            )}
          </View>
          <ThemedText style={styles.dateText}>{news.date}</ThemedText>
        </View>
        
        <ThemedText type="subtitle" style={styles.cardTitle} numberOfLines={3}>
          {news.title}
        </ThemedText>

        {news.partyName && (
          <View style={styles.partyInfo}>
            <ThemedText style={styles.partyName}>{news.partyName}</ThemedText>
          </View>
        )}

        <View style={styles.cardFooter}>
          <View style={styles.readIndicator}>
            <ThemedText style={styles.readText}>Leer más</ThemedText>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>
      </View>

      <View style={[styles.cardBorder, { backgroundColor: getCategoryColor() }]} />
    </TouchableOpacity>
  );
};

// Componente de Filtros
const NewsFilters = ({ activeFilter, onFilterChange }: { 
  activeFilter: string; 
  onFilterChange: (filter: string) => void;
}) => {
  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'official', label: 'Oficiales' },
    { id: 'myParty', label: 'Mi Partido' },
    { id: 'followed', label: 'Siguiendo' }
  ];

  return (
    <View style={styles.filtersContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.filterButtonActive
            ]}
            onPress={() => onFilterChange(filter.id)}
          >
            <ThemedText style={[
              styles.filterButtonText,
              activeFilter === filter.id && styles.filterButtonTextActive
            ]}>
              {filter.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function NewsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  // Función MEJORADA para cargar noticias desde las APIs
  const loadNews = async () => {
    try {
      setLoading(true);
      
      // Cargar noticias del admin
      const adminResponse = await fetch(`${API_URL}/api/v1/admin/posts`);
      const adminData: AdminPost[] = await adminResponse.json();
      
      // Cargar noticias de partidos políticos
      const politicalResponse = await fetch(`${API_URL}/api/v1/admin/posts/political`);
      const politicalData: PoliticalPost[] = await politicalResponse.json();

      // Transformar datos del admin - GARANTIZANDO IMÁGENES
      const adminNews: NewsItem[] = adminData.map(post => {
        const baseNewsItem = {
          id: post.id,
          title: post.title,
          body: post.body,
          source: 'Organismo Electoral Oficial',
          date: formatDate(post.created_at),
          image: '', // Inicialmente vacío
          isOfficial: true,
          category: 'OFICIAL',
          created_at: post.created_at
        };
        
        return {
          ...baseNewsItem,
          image: generateNewsImage(baseNewsItem) // Generar imagen aquí
        };
      });

      // Transformar datos de partidos políticos - GARANTIZANDO IMÁGENES
      const politicalNews: NewsItem[] = politicalData.map(post => {
        const baseNewsItem = {
          id: post.id,
          title: post.title,
          body: post.body,
          source: post.political_party_name,
          date: formatDate(post.created_at),
          image: '', // Inicialmente vacío
          isOfficial: false,
          category: 'PARTIDO',
          partyId: post.political_party_id,
          partyName: post.political_party_name,
          created_at: post.created_at
        };
        
        return {
          ...baseNewsItem,
          image: generateNewsImage(baseNewsItem) // Generar imagen aquí
        };
      });

      // Combinar y ordenar por fecha (más recientes primero)
      const combinedNews = [...adminNews, ...politicalNews].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Verificación final: asegurar que todas las noticias tengan imagen
      const verifiedNews = combinedNews.map(news => {
        if (!news.image || news.image.trim() === '') {
          return {
            ...news,
            image: news.isOfficial ? OFFICIAL_IMAGES[0] : ELECTION_IMAGES[0] // Imagen por defecto apropiada
          };
        }
        return news;
      });

      setAllNews(verifiedNews);
      setFilteredNews(verifiedNews);
      
    } catch (error) {
      console.error('Error cargando noticias:', error);
      Alert.alert('Error', 'No se pudieron cargar las noticias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    let filtered = allNews;

    switch (activeFilter) {
      case 'official':
        filtered = allNews.filter(news => news.isOfficial);
        break;
      case 'myParty':
        filtered = allNews.filter(news => news.partyId === USER_DATA.userParty);
        break;
      case 'followed':
        filtered = allNews.filter(news => 
          USER_DATA.followedParties.includes(news.partyId || '')
        );
        break;
      case 'all':
      default:
        filtered = allNews;
        break;
    }

    setFilteredNews(filtered);
  }, [activeFilter, allNews]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  }, []);

  if (loading && allNews.length === 0) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <Text style={styles.loadingIcon}>📰</Text>
        <ThemedText style={styles.loadingText}>Cargando noticias...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={APP_COLORS.primary}
            colors={[APP_COLORS.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <View style={styles.headerContent}>
            <View style={styles.titleRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📰</Text>
              </View>
              <View style={styles.titleContainer}>
                <ThemedText type="title" style={styles.mainTitle}>
                  Noticias Electorales
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                  Información verificada y actualizada
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.newsCounter}>
                <ThemedText style={styles.newsCounterNumber}>{filteredNews.length}</ThemedText>
                <ThemedText style={styles.newsCounterLabel}>noticias</ThemedText>
              </View>
              
              <CountdownTimer />
            </View>
          </View>
        </View>

        <NewsFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        <View style={styles.newsList}>
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <ThemedText style={styles.emptyText}>
                No hay noticias para este filtro
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <ThemedText style={styles.footerText}>
              Desliza hacia abajo para actualizar
            </ThemedText>
            <View style={styles.footerSources}>
              <ThemedText style={styles.footerSourceText}>
                Fuentes verificadas • Actualizado {allNews.length > 0 ? formatDate(allNews[0].created_at).toLowerCase() : 'recientemente'}
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.pearl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_COLORS.pearl,
  },
  loadingIcon: {
    fontSize: 48,
    marginBottom: 16,
    color: APP_COLORS.primary,
  },
  loadingText: {
    fontSize: 16,
    color: APP_COLORS.gray,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: APP_COLORS.night,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
    overflow: 'hidden',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: APP_COLORS.primary,
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: APP_COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 8,
    shadowColor: APP_COLORS.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 24,
    color: APP_COLORS.night,
  },
  titleContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: APP_COLORS.pearl,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: APP_COLORS.pearl + 'CC',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsCounter: {
    alignItems: 'center',
  },
  newsCounterNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: APP_COLORS.secondary,
    marginBottom: 2,
  },
  newsCounterLabel: {
    fontSize: 14,
    color: APP_COLORS.pearl + 'CC',
    fontWeight: '600',
  },
  countdownContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(248, 245, 242, 0.15)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(248, 245, 242, 0.3)',
  },
  countdownTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: APP_COLORS.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 45,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: '800',
    color: APP_COLORS.pearl,
    marginBottom: 2,
  },
  timeLabel: {
    fontSize: 10,
    color: APP_COLORS.pearl + 'CC',
    fontWeight: '600',
  },
  countdownSubtitle: {
    fontSize: 10,
    color: APP_COLORS.pearl + 'AA',
    fontWeight: '500',
    textAlign: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: APP_COLORS.pearl,
  },
  filtersScrollContent: {
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: APP_COLORS.lightGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: APP_COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_COLORS.night,
  },
  filterButtonTextActive: {
    color: APP_COLORS.pearl,
  },
  newsList: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 8,
  },
  card: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: APP_COLORS.night,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 11, 41, 0.05)',
  },
  floatingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 2,
    shadowColor: APP_COLORS.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  floatingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  partyBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    elevation: 2,
  },
  userPartyBadge: {
    backgroundColor: APP_COLORS.primary,
  },
  followedPartyBadge: {
    backgroundColor: APP_COLORS.secondary,
  },
  partyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: APP_COLORS.night,
  },
  cardContent: {
    padding: 20,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceText: {
    fontSize: 14,
    color: APP_COLORS.primary,
    fontWeight: '600',
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: APP_COLORS.primary,
    marginLeft: 6,
  },
  dateText: {
    fontSize: 13,
    color: APP_COLORS.gray,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: APP_COLORS.night,
    lineHeight: 24,
  },
  partyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  partyName: {
    fontSize: 12,
    color: APP_COLORS.gray,
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  readIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: APP_COLORS.lightGray,
  },
  readText: {
    fontSize: 13,
    color: APP_COLORS.night,
    fontWeight: '600',
    marginRight: 4,
  },
  arrow: {
    fontSize: 14,
    color: APP_COLORS.night,
    fontWeight: '600',
  },
  cardBorder: {
    height: 3,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    color: APP_COLORS.gray,
  },
  emptyText: {
    fontSize: 16,
    color: APP_COLORS.gray,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: APP_COLORS.lightGray,
    marginTop: 20,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: APP_COLORS.gray,
    fontWeight: '500',
    marginBottom: 8,
  },
  footerSources: {
    alignItems: 'center',
  },
  footerSourceText: {
    fontSize: 12,
    color: APP_COLORS.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
});