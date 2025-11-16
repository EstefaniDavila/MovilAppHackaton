import React, { useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

// IconSymbol component para los íconos
interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = Colors.night, style }) => {
  const icons: { [key: string]: string } = {
    'calendar': '📅',
    'star': '⭐',
    'user-check': '👥',
    'file-text': '📋',
    'chevron-down': '⬇️',
    'chevron-up': '⬆️',
  };
  
  return (
    <Text style={[{ fontSize: size * 0.6, color }, style]}>
      {icons[name] || '📄'}
    </Text>
  );
};

// Interfaces para los tipos
interface EventItem {
  date: string;
  event: string;
  type: string;
  important: boolean;
}

interface CollapsibleProps {
  title: string;
  iconName: string;
  iconColor: string;
  children: React.ReactNode;
  isFirst?: boolean;
}

interface EventItemProps {
  item: EventItem;
  index: number;
  totalItems: number;
}

// Collapsible component mejorado con animaciones
const Collapsible: React.FC<CollapsibleProps> = ({ 
  title, 
  iconName, 
  iconColor, 
  children, 
  isFirst = false 
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isFirst);
  const [animation] = useState<Animated.Value>(new Animated.Value(isFirst ? 1 : 0));
  const [contentHeight, setContentHeight] = useState<number>(0);

  const toggleCollapsible = (): void => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <View style={[collapsibleStyles.container, isFirst && collapsibleStyles.firstContainer]}>
      <TouchableOpacity 
        style={collapsibleStyles.header} 
        onPress={toggleCollapsible}
        activeOpacity={0.7}
      >
        <View style={collapsibleStyles.headerContent}>
          <View style={[collapsibleStyles.iconContainer, { backgroundColor: iconColor + '20' }]}>
            <IconSymbol name={iconName} size={20} color={iconColor} />
          </View>
          <View style={collapsibleStyles.titleContainer}>
            <ThemedText style={collapsibleStyles.title}>{title}</ThemedText>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <IconSymbol name="chevron-down" size={16} color={Colors.gray} />
        </Animated.View>
      </TouchableOpacity>
      
      <Animated.View style={[collapsibleStyles.content, { height: heightInterpolate }]}>
        <View 
          style={collapsibleStyles.contentInner}
          onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const collapsibleStyles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.pearl,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  firstContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.pearl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
  },
  content: {
    overflow: 'hidden',
  },
  contentInner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

// Datos simulados del calendario electoral
const ELECTION_DATES: EventItem[] = [
  { 
    date: '10 de Marzo', 
    event: 'Inicio oficial de la campaña electoral', 
    type: 'Relevante',
    important: false 
  },
  { 
    date: '12 de Mayo', 
    event: 'Cierre del padrón electoral', 
    type: 'Relevante',
    important: true 
  },
  { 
    date: '30 de Mayo', 
    event: 'Primer Debate Presidencial Televisado', 
    type: 'Relevante',
    important: true 
  },
  { 
    date: '15 de Junio', 
    event: 'FIN de la propaganda electoral', 
    type: 'Relevante',
    important: true 
  },
  { 
    date: '25 de Junio', 
    event: 'Jornada Principal de Votación', 
    type: 'Principal', 
    important: true 
  },
  { 
    date: '30 de Junio', 
    event: 'Publicación de resultados preliminares', 
    type: 'Relevante',
    important: false 
  },
];

const MEMBER_DATES: EventItem[] = [
  { 
    date: '15 de Mayo', 
    event: 'Sorteo público de Miembros de Mesa', 
    type: 'Miembro',
    important: false 
  },
  { 
    date: '1 al 10 de Junio', 
    event: 'Capacitación obligatoria para Miembros de Mesa', 
    type: 'Miembro',
    important: false 
  },
  { 
    date: '24 de Junio', 
    event: 'Instalación de Mesas y material de sufragio', 
    type: 'Miembro', 
    important: true 
  },
];

// Componente de evento mejorado
const EventItem: React.FC<EventItemProps> = ({ item, index, totalItems }) => (
  <View style={[styles.eventRow, item.important && styles.importantRow]}>
    {/* Línea de tiempo */}
    <View style={styles.timeline}>
      <View style={[styles.dateMarker, item.important ? styles.primaryMarker : styles.secondaryMarker]} />
      {index < totalItems - 1 && <View style={styles.timelineLine} />}
    </View>
    
    <View style={styles.eventDetails}>
      <View style={styles.eventHeader}>
        <ThemedText style={styles.eventDate}>{item.date}</ThemedText>
        {item.important && (
          <View style={styles.importantBadge}>
            <ThemedText style={styles.importantText}>Importante</ThemedText>
          </View>
        )}
      </View>
      <ThemedText style={styles.eventText}>{item.event}</ThemedText>
      <View style={[styles.eventType, { backgroundColor: item.important ? Colors.primary + '20' : Colors.secondary + '20' }]}>
        <ThemedText style={[styles.eventTypeText, { color: item.important ? Colors.primary : Colors.secondary }]}>
          {item.type}
        </ThemedText>
      </View>
    </View>
  </View>
);

// Componente principal del calendario - CORREGIDO: eliminado : JSX.Element
export default function CalendarScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Añadí más espacio en la parte superior */}
        <View style={styles.topSpacing} />
        
        {/* Header mejorado */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={styles.iconTitleContainer}>
              <View style={styles.iconContainer}>
                <IconSymbol name="calendar" size={28} color={Colors.pearl} />
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Calendario Electoral
              </ThemedText>
            </View>
            <ThemedText style={styles.subtitle}>
              Fechas clave para electores, miembros de mesa y el proceso general
            </ThemedText>
          </View>
          
          {/* Contador de eventos */}
          <View style={styles.eventCounter}>
            <ThemedText style={styles.eventCounterText}>
              {ELECTION_DATES.length + MEMBER_DATES.length} eventos programados
            </ThemedText>
          </View>
        </View>

        {/* Secciones colapsables */}
        <Collapsible 
          title="Fechas del Proceso Electoral"
          iconName="star"
          iconColor={Colors.primary}
          isFirst={true}
        >
          <View style={styles.eventsContainer}>
            {ELECTION_DATES.map((item, index) => (
              <EventItem 
                key={`election-${index}`} 
                item={item} 
                index={index}
                totalItems={ELECTION_DATES.length}
              />
            ))}
          </View>
        </Collapsible>

        <Collapsible 
          title="Miembros de Mesa"
          iconName="user-check"
          iconColor={Colors.secondary}
        >
          <View style={styles.eventsContainer}>
            {MEMBER_DATES.map((item, index) => (
              <EventItem 
                key={`member-${index}`} 
                item={item} 
                index={index}
                totalItems={MEMBER_DATES.length}
              />
            ))}
          </View>
        </Collapsible>

        <Collapsible 
          title="Información Legal"
          iconName="file-text"
          iconColor={Colors.night}
        >
          <View style={styles.legalContainer}>
            <ThemedText style={styles.legalText}>
              Consulta las leyes electorales, decretos y resoluciones relevantes para el proceso electoral actual.
            </ThemedText>
            <TouchableOpacity style={styles.legalButton}>
              <ThemedText style={styles.legalButtonText}>Ver Documentación</ThemedText>
            </TouchableOpacity>
          </View>
        </Collapsible>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Mantente informado sobre las fechas importantes
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
  // Nuevo estilo para añadir espacio en la parte superior
  topSpacing: {
    height: 50, // Ajusta este valor para subir o bajar todo el contenido
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
    fontSize: 32,
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
  eventCounter: {
    backgroundColor: Colors.pearl,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  eventCounterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  eventsContainer: {
    padding: 16,
  },
  eventRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  importantRow: {
    backgroundColor: Colors.primary + '08',
    borderRadius: 12,
    marginHorizontal: -8,
    paddingHorizontal: 12,
  },
  timeline: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  dateMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 2,
  },
  primaryMarker: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryMarker: {
    backgroundColor: Colors.secondary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginTop: 4,
  },
  eventDetails: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  eventDate: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.night,
    flex: 1,
  },
  importantBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  importantText: {
    color: Colors.pearl,
    fontSize: 10,
    fontWeight: '700',
  },
  eventText: {
    fontSize: 16,
    color: Colors.night,
    lineHeight: 22,
    marginBottom: 8,
  },
  eventType: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  eventTypeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  legalContainer: {
    padding: 20,
    alignItems: 'center',
  },
  legalText: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    color: Colors.gray,
  },
  legalButton: {
    backgroundColor: Colors.night,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  legalButtonText: {
    color: Colors.pearl,
    fontWeight: '600',
    fontSize: 14,
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
  },
});