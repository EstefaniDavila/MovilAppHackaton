import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, View, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/colors';

// Interfaces TypeScript
interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  image: string;
  isOfficial: boolean;
  category?: string;
}

interface NewsCardProps {
  news: NewsItem;
}

// Componente del Contador
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    // Fecha objetivo - puedes ajustarla según necesites
    const targetDate = new Date('2025-04-30T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({
          months,
          days,
          hours,
          minutes
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Actualizar cada minuto

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
      <View style={styles.countdownRow}>
        <TimeUnit value={timeLeft.months} label="Meses" />
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Minutos" />
      </View>
    </View>
  );
};

// Datos simulados de noticias mejorados
const MOCK_NEWS: NewsItem[] = [
  { 
    id: 1, 
    title: 'Corte Electoral ratifica el calendario de elecciones para el próximo mes', 
    source: 'Organismo Electoral Oficial', 
    date: 'Hace 5 min', 
    image: 'https://placehold.co/600x400/000B29/F8F5F2?text=Oficial',
    isOfficial: true,
    category: 'OFICIAL'
  },
  { 
    id: 2, 
    title: 'Análisis: El impacto de las propuestas económicas en el mercado local', 
    source: 'El Diario El Comercio', 
    date: 'Hace 2 horas', 
    image: 'https://placehold.co/600x400/D70026/F8F5F2?text=Comercio',
    isOfficial: false,
    category: 'ANÁLISIS'
  },
  { 
    id: 3, 
    title: 'Tutorial: Así puedes verificar tu mesa de votación y local exacto', 
    source: 'Organismo Electoral Oficial', 
    date: 'Hace 1 día', 
    image: 'https://placehold.co/600x400/EDB83D/000B29?text=Tutorial',
    isOfficial: true,
    category: 'GUÍA'
  },
  { 
    id: 4, 
    title: 'Resultados preliminares muestran tendencia en encuestas nacionales', 
    source: 'Centro de Estudios Electorales', 
    date: 'Hace 3 horas', 
    image: 'https://placehold.co/600x400/6b7280/FFFFFF?text=Encuestas',
    isOfficial: false,
    category: 'ENCUESTAS'
  },
];

// Componente Card de Noticia mejorado (sin cambios)
const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getCategoryColor = () => {
    switch (news.category) {
      case 'OFICIAL':
        return Colors.primary;
      case 'ANÁLISIS':
        return Colors.secondary;
      case 'GUÍA':
        return Colors.night;
      case 'ENCUESTAS':
        return Colors.gray;
      default:
        return Colors.primary;
    }
  };

  const getCategoryTextColor = () => {
    return news.category === 'ANÁLISIS' ? Colors.night : Colors.pearl;
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => console.log('Abrir noticia:', news.title)}
    >
      {/* Imagen con overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: news.image }} style={styles.cardImage} />
        <View style={styles.imageOverlay} />
        
        {/* Badge superpuesto en la imagen */}
        <View style={[styles.floatingBadge, { backgroundColor: getCategoryColor() }]}>
          <ThemedText style={[styles.floatingBadgeText, { color: getCategoryTextColor() }]}>
            {news.category}
          </ThemedText>
        </View>
      </View>

      <View style={styles.cardContent}>
        {/* Header con fuente y fecha */}
        <View style={styles.headerRow}>
          <View style={styles.sourceContainer}>
            <ThemedText style={styles.sourceText}>{news.source}</ThemedText>
            {news.isOfficial && (
              <View style={styles.verifiedDot} />
            )}
          </View>
          <ThemedText style={styles.dateText}>{news.date}</ThemedText>
        </View>
        
        {/* Título */}
        <ThemedText type="subtitle" style={styles.cardTitle} numberOfLines={3}>
          {news.title}
        </ThemedText>

        {/* Footer con indicador de lectura - CORREGIDO */}
        <View style={styles.cardFooter}>
          <View style={styles.readIndicator}>
            <ThemedText style={styles.readText}>Leer más</ThemedText>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>
      </View>

      {/* Borde inferior de acento */}
      <View style={[styles.cardBorder, { backgroundColor: getCategoryColor() }]} />
    </TouchableOpacity>
  );
};

export default function NewsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header completamente rediseñado */}
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
                <ThemedText style={styles.newsCounterNumber}>{MOCK_NEWS.length}</ThemedText>
                <ThemedText style={styles.newsCounterLabel}>noticias</ThemedText>
              </View>
              
              {/* Reemplazamos el liveIndicator por el CountdownTimer */}
              <CountdownTimer />
            </View>
          </View>
        </View>

        {/* Lista de noticias */}
        <View style={styles.newsList}>
          {MOCK_NEWS.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </View>

        {/* Footer mejorado */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <ThemedText style={styles.footerText}>
              Desliza hacia abajo para actualizar
            </ThemedText>
            <View style={styles.footerSources}>
              <ThemedText style={styles.footerSourceText}>
                Fuentes verificadas • Actualizado hace 5 min
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
    backgroundColor: Colors.pearl,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // Header completamente rediseñado
  header: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: Colors.night,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
    overflow: 'hidden',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.secondary,
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
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 8,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 24,
    color: Colors.pearl,
  },
  titleContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.pearl,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.pearl + 'CC',
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
    color: Colors.primary,
    marginBottom: 2,
  },
  newsCounterLabel: {
    fontSize: 14,
    color: Colors.pearl + 'CC',
    fontWeight: '600',
  },
  // Estilos para el contador
  countdownContainer: {
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 50,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 2,
  },
  timeLabel: {
    fontSize: 12,
    color: Colors.pearl + 'CC',
    fontWeight: '600',
  },
  newsList: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.pearl,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
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
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  floatingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
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
    color: Colors.primary,
    fontWeight: '600',
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginLeft: 6,
  },
  dateText: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    lineHeight: 24,
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
    backgroundColor: Colors.night + '08',
  },
  readText: {
    fontSize: 13,
    color: Colors.night,
    fontWeight: '600',
    marginRight: 4,
  },
  arrow: {
    fontSize: 14,
    color: Colors.night,
    fontWeight: '600',
  },
  cardBorder: {
    height: 3,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    marginTop: 20,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
    marginBottom: 8,
  },
  footerSources: {
    alignItems: 'center',
  },
  footerSourceText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
});