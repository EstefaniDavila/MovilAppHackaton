import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/colors';

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

// Componente de Recomendaciones
const RecommendationsSection = () => {
  const recommendations = [
    {
      id: 1,
      icon: '🔍',
      title: 'Investiga a fondo',
      description: 'Consulta las propuestas completas de cada candidato antes de decidir'
    },
    {
      id: 2,
      icon: '📋',
      title: 'Compara programas',
      description: 'Analiza las diferencias entre los planes de gobierno'
    },
    {
      id: 3,
      icon: '🤔',
      title: 'Piensa críticamente',
      description: 'Evalúa la viabilidad y coherencia de las promesas electorales'
    },
    {
      id: 4,
      icon: '🗳️',
      title: 'Vota con conciencia',
      description: 'Tu voto decide el futuro del país, elige responsablemente'
    }
  ];

  return (
    <View style={styles.recommendationsSection}>
      <ThemedText type="title" style={styles.recommendationsTitle}>
        Recomendaciones para un Voto Informado
      </ThemedText>
      
      <View style={styles.recommendationsGrid}>
        {recommendations.map((item) => (
          <View key={item.id} style={styles.recommendationCard}>
            <View style={styles.recommendationIconContainer}>
              <Text style={styles.recommendationIcon}>{item.icon}</Text>
            </View>
            <ThemedText style={styles.recommendationTitle}>
              {item.title}
            </ThemedText>
            <ThemedText style={styles.recommendationDescription}>
              {item.description}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
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
            tintColor={APP_COLORS.primary}
            colors={[APP_COLORS.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header centrado */}
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🗳️</Text>
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Voto Informado
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Modo Offline - Elecciones 2026
              </ThemedText>
            </View>
            
            {/* Contador centrado */}
            <View style={styles.countdownWrapper}>
              <CountdownTimer />
            </View>
          </View>
        </View>

        {/* Sección de Recomendaciones */}
        <RecommendationsSection />

        {/* Información adicional */}
        <View style={styles.infoSection}>
          <ThemedView style={styles.infoCard}>
            <ThemedText type="subtitle" style={styles.infoTitle}>
              💡 Recuerda
            </ThemedText>
            <ThemedText style={styles.infoText}>
              • Tu voto es secreto y personal{'\n'}
              • Verifica tu local de votación con anticipación{'\n'}
              • Lleva tu DNI original y en buen estado{'\n'}
              • Infórmate sobre todos los candidatos
            </ThemedText>
          </ThemedView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Tu decisión construye democracia
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Vota con responsabilidad • Piensa en el futuro
          </ThemedText>
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
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 40,
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
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: APP_COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: APP_COLORS.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 36,
    color: APP_COLORS.night,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: APP_COLORS.pearl,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: APP_COLORS.pearl + 'CC',
    fontWeight: '500',
    textAlign: 'center',
  },
  countdownWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  countdownContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(248, 245, 242, 0.15)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(248, 245, 242, 0.3)',
    width: '100%',
    maxWidth: 400,
  },
  countdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: APP_COLORS.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 55,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: '800',
    color: APP_COLORS.pearl,
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: APP_COLORS.pearl + 'CC',
    fontWeight: '600',
  },
  countdownSubtitle: {
    fontSize: 12,
    color: APP_COLORS.pearl + 'AA',
    fontWeight: '500',
    textAlign: 'center',
  },
  recommendationsSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  recommendationsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_COLORS.night,
    textAlign: 'center',
    marginBottom: 24,
  },
  recommendationsGrid: {
    gap: 16,
  },
  recommendationCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: APP_COLORS.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    alignItems: 'center',
  },
  recommendationIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: APP_COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationIcon: {
    fontSize: 24,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: APP_COLORS.night,
    textAlign: 'center',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    color: APP_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  infoCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: APP_COLORS.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: APP_COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: APP_COLORS.night,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: APP_COLORS.lightGray,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: APP_COLORS.primary,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 14,
    color: APP_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});