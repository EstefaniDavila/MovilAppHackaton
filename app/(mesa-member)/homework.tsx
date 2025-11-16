import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

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
    'tasks': '✅',
    'installation': '🏗️',
    'voting': '🗳️',
    'other': '📋',
    'training': '🎓',
    'time': '⏰',
    'location': '📍',
    'document': '📄',
    'checklist': '📝',
    'important': '⚠️',
    'info': 'ℹ️',
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
interface ActivityItem {
  date: string;
  time: string;
  activity: string;
  type: 'training' | 'preparation' | 'election-day' | 'post-election';
  location: string;
  mandatory: boolean;
}

interface DutySectionProps {
  title: string;
  iconName: string;
  iconColor: string;
  steps: string[];
  notes?: string[];
}

interface ActivityCardProps {
  item: ActivityItem;
  index: number;
}

// Componente de actividad del calendario
const ActivityCard: React.FC<ActivityCardProps> = ({ item, index }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training': return Colors.primary;
      case 'preparation': return Colors.secondary;
      case 'election-day': return Colors.night;
      case 'post-election': return Colors.gray;
      default: return Colors.primary;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'training': return 'Capacitación';
      case 'preparation': return 'Preparación';
      case 'election-day': return 'Día de Elecciones';
      case 'post-election': return 'Post-Elecciones';
      default: return type;
    }
  };

  return (
    <View style={[styles.activityCard, item.mandatory && styles.mandatoryCard]}>
      <View style={styles.activityHeader}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <IconSymbol name="time" size={14} color={Colors.gray} />
            <ThemedText style={styles.activityDate}>{item.date}</ThemedText>
          </View>
          <ThemedText style={styles.activityTime}>{item.time}</ThemedText>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) + '20' }]}>
          <ThemedText style={[styles.typeText, { color: getTypeColor(item.type) }]}>
            {getTypeText(item.type)}
          </ThemedText>
        </View>
      </View>
      
      <ThemedText style={styles.activityTitle}>{item.activity}</ThemedText>
      
      <View style={styles.activityFooter}>
        <View style={styles.locationContainer}>
          <IconSymbol name="location" size={12} color={Colors.gray} />
          <ThemedText style={styles.locationText}>{item.location}</ThemedText>
        </View>
        {item.mandatory && (
          <View style={styles.mandatoryBadge}>
            <IconSymbol name="important" size={10} color={Colors.pearl} />
            <ThemedText style={styles.mandatoryText}>Obligatorio</ThemedText>
          </View>
        )}
      </View>
    </View>
  );
};

// Componente de sección de deberes
const DutySection: React.FC<DutySectionProps> = ({ title, iconName, iconColor, steps, notes }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.dutySection}>
      <TouchableOpacity 
        style={styles.dutyHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.dutyHeaderContent}>
          <View style={[styles.dutyIcon, { backgroundColor: iconColor + '20' }]}>
            <IconSymbol name={iconName} size={20} color={iconColor} />
          </View>
          <ThemedText style={styles.dutyTitle}>{title}</ThemedText>
        </View>
        <IconSymbol name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color={Colors.gray} />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.dutyContent}>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: iconColor }]}>
                  <ThemedText style={styles.stepNumberText}>{index + 1}</ThemedText>
                </View>
                <ThemedText style={styles.stepText}>{step}</ThemedText>
              </View>
            ))}
          </View>
          
          {notes && notes.length > 0 && (
            <View style={styles.notesContainer}>
              <ThemedText style={styles.notesTitle}>Notas importantes:</ThemedText>
              {notes.map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <IconSymbol name="info" size={12} color={iconColor} />
                  <ThemedText style={styles.noteText}>{note}</ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Datos de actividades de miembros de mesa
const MEMBER_ACTIVITIES: ActivityItem[] = [
  {
    date: '15 de Mayo',
    time: '9:00 AM - 1:00 PM',
    activity: 'Capacitación Inicial - Procedimientos Generales',
    type: 'training',
    location: 'Centro de Capacitación Electoral - Sede Central',
    mandatory: true
  },
  {
    date: '22 de Mayo',
    time: '2:00 PM - 6:00 PM',
    activity: 'Práctica de Instalación de Mesas',
    type: 'training',
    location: 'Colegio María Parado de Bellido',
    mandatory: true
  },
  {
    date: '5 de Junio',
    time: '10:00 AM - 12:00 PM',
    activity: 'Revisión de Material Electoral',
    type: 'preparation',
    location: 'Almacén Electoral Distrital',
    mandatory: false
  },
  {
    date: '24 de Junio',
    time: '6:00 AM - 7:00 AM',
    activity: 'Instalación de Mesa de Sufragio',
    type: 'election-day',
    location: 'Aula 203 - Colegio María Parado de Bellido',
    mandatory: true
  },
  {
    date: '24 de Junio',
    time: '7:00 AM - 4:00 PM',
    activity: 'Jornada de Votación',
    type: 'election-day',
    location: 'Aula 203 - Colegio María Parado de Bellido',
    mandatory: true
  },
  {
    date: '24 de Junio',
    time: '4:00 PM - 6:00 PM',
    activity: 'Escrutinio y Acta de Resultados',
    type: 'election-day',
    location: 'Aula 203 - Colegio María Parado de Bellido',
    mandatory: true
  },
  {
    date: '25 de Junio',
    time: '9:00 AM - 11:00 AM',
    activity: 'Entrega de Documentación y Material',
    type: 'post-election',
    location: 'Oficina Electoral Local',
    mandatory: true
  }
];

// Componente principal de miembros de mesa
export default function MembersScreen() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredActivities = MEMBER_ACTIVITIES.filter(activity => {
    if (activeFilter === 'all') return true;
    return activity.type === activeFilter;
  });

  const handleConfirmAttendance = (activity: ActivityItem) => {
    Alert.alert(
      'Confirmar Asistencia',
      `¿Confirmas tu asistencia a: ${activity.activity}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => Alert.alert('Éxito', 'Asistencia confirmada correctamente')
        }
      ]
    );
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
                <IconSymbol name="tasks" size={28} color={Colors.pearl} />
              </View>
              <ThemedText type="title" style={styles.mainTitle}>
                Miembros de Mesa
              </ThemedText>
            </View>
            <ThemedText style={styles.subtitle}>
              Información y calendario para el correcto desempeño de tus funciones
            </ThemedText>
          </View>
        </View>

        {/* Filtros de actividades */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
              onPress={() => setActiveFilter('all')}
            >
              <ThemedText style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
                Todas
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, activeFilter === 'training' && styles.activeFilter]}
              onPress={() => setActiveFilter('training')}
            >
              <ThemedText style={[styles.filterText, activeFilter === 'training' && styles.activeFilterText]}>
                Capacitación
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, activeFilter === 'preparation' && styles.activeFilter]}
              onPress={() => setActiveFilter('preparation')}
            >
              <ThemedText style={[styles.filterText, activeFilter === 'preparation' && styles.activeFilterText]}>
                Preparación
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, activeFilter === 'election-day' && styles.activeFilter]}
              onPress={() => setActiveFilter('election-day')}
            >
              <ThemedText style={[styles.filterText, activeFilter === 'election-day' && styles.activeFilterText]}>
                Día de Elecciones
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Calendario de actividades */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="calendar" size={20} color={Colors.primary} />
            <ThemedText style={styles.sectionTitle}>Calendario de Actividades</ThemedText>
          </View>
          
          <View style={styles.activitiesList}>
            {filteredActivities.map((item, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => handleConfirmAttendance(item)}
                activeOpacity={0.7}
              >
                <ActivityCard item={item} index={index} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Instrucciones sobre deberes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="checklist" size={20} color={Colors.secondary} />
            <ThemedText style={styles.sectionTitle}>Instrucciones de Deberes</ThemedText>
          </View>

          <DutySection
            title="Instalación"
            iconName="installation"
            iconColor={Colors.primary}
            steps={[
              'Presentarse en el local de votación a las 6:00 AM',
              'Verificar que el aula esté en condiciones adecuadas',
              'Recibir el material electoral del jurado',
              'Instalar la mesa según el diagrama proporcionado',
              'Colocar la urna en posición visible y accesible',
              'Organizar los documentos y materiales de votación'
            ]}
            notes={[
              'Llegar con 30 minutos de anticipación',
              'Portar DNI original y constancia de designación',
              'Verificar integridad del material recibido'
            ]}
          />

          <DutySection
            title="Proceso de Sufragio"
            iconName="voting"
            iconColor={Colors.secondary}
            steps={[
              'Verificar identidad del elector con el DNI',
              'Buscar nombre en el padrón electoral',
              'Entregar la cédula de sufragio al elector',
              'Indicar la ubicación de la cabina de votación',
              'Marca el dedo del elector después de votar',
              'Registrar la firma en el acta de votación'
            ]}
            notes={[
              'Mantener el orden y respeto en todo momento',
              'No influir en la decisión del elector',
              'Asegurar el secreto del voto'
            ]}
          />

          <DutySection
            title="Cierre y Escrutinio"
            iconName="other"
            iconColor={Colors.night}
            steps={[
              'Cerrar la votación puntualmente a las 4:00 PM',
              'Contar a los electores que están en fila',
              'Realizar el escrutinio de votos en acto público',
              'Llenar el acta de resultados completa y claramente',
              'Empacar el material electoral según protocolo',
              'Entregar documentación al jurado electoral'
            ]}
            notes={[
              'El escrutinio es público y transparente',
              'Cualquier irregularidad debe documentarse',
              'Firmar todas las actas correspondientes'
            ]}
          />
        </View>

        {/* Información adicional */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <IconSymbol name="important" size={24} color={Colors.secondary} />
            <ThemedText style={styles.infoTitle}>Información Importante</ThemedText>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoItemTitle}>Derechos del Miembro de Mesa:</ThemedText>
              <ThemedText style={styles.infoItemText}>
                • Compensación económica establecida por ley{'\n'}
                • Seguro contra accidentes{'\n'}
                • Constancia de servicio electoral{'\n'}
                • Alimentación durante la jornada
              </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoItemTitle}>Contacto de Emergencia:</ThemedText>
              <ThemedText style={styles.infoItemText}>
                • Jurado Electoral: 0800-1-2222{'\n'}
                • Policía Electoral: 105{'\n'}
                • Asistencia Legal: 0800-1-3333
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Tu labor es fundamental para la democracia
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Jornada Electoral {new Date().getFullYear()}
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
    paddingTop: 10, // Reducido el padding superior
    paddingBottom: 20,
  },
  // NUEVO ESTILO PARA ESPACIO SUPERIOR
  topSpacing: {
    height: 50, // Ajusta este valor para subir/bajar el contenido
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
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeFilterText: {
    color: Colors.pearl,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.night,
    marginLeft: 8,
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
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
  mandatoryCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginLeft: 4,
  },
  activityTime: {
    fontSize: 13,
    color: Colors.gray,
    marginLeft: 18,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 12,
    lineHeight: 20,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 4,
  },
  mandatoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mandatoryText: {
    color: Colors.pearl,
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  dutySection: {
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  dutyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  dutyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dutyIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dutyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
  },
  dutyContent: {
    padding: 16,
    paddingTop: 0,
  },
  stepsContainer: {
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: Colors.pearl,
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 14,
    color: Colors.night,
    lineHeight: 20,
    flex: 1,
  },
  notesContainer: {
    backgroundColor: Colors.primary + '08',
    padding: 12,
    borderRadius: 8,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 8,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 13,
    color: Colors.night,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  infoCard: {
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
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    marginLeft: 8,
  },
  infoContent: {
    gap: 12,
  },
  infoItem: {
    backgroundColor: Colors.lightGray + '30',
    padding: 12,
    borderRadius: 8,
  },
  infoItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 6,
  },
  infoItemText: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 18,
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
    marginBottom: 4,
  },
  footerSubtext: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 12,
  },
});