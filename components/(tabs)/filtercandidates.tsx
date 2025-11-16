import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
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
  logo: string;
  backgroundImage: string;
  color: string;
  department: string;
  province: string;
  district: string;
  isSpacer?: boolean;
}

interface LocationFilter {
  department: string;
  province: string;
  district: string;
}

// Datos simulados de partidos y candidatos con ubicaciones
const MOCK_PARTIES: Party[] = [
  {
    id: '1',
    name: 'Partido Esperanza Ciudadana',
    candidate: 'Dra. María Fernández',
    slogan: 'Un futuro brillante para todos.',
    logo: 'https://placehold.co/120x120/D70026/F8F5F2?text=PEC',
    backgroundImage: 'https://placehold.co/400x300/D70026/000B29?text=Maria',
    color: Colors.primary,
    department: 'Lima',
    province: 'Lima',
    district: 'Miraflores'
  },
  {
    id: '2',
    name: 'Alianza por el Progreso',
    candidate: 'Ing. Juan Pérez',
    slogan: 'Trabajo y desarrollo para la nación.',
    logo: 'https://placehold.co/120x120/000B29/F8F5F2?text=APP',
    backgroundImage: 'https://placehold.co/400x300/000B29/F8F5F2?text=Juan',
    color: Colors.night,
    department: 'Lima',
    province: 'Lima',
    district: 'San Isidro'
  },
  {
    id: '3',
    name: 'Movimiento Unión Democrática',
    candidate: 'Lic. Laura García',
    slogan: 'La voz del pueblo, nuestra fuerza.',
    logo: 'https://placehold.co/120x120/EDB83D/000B29?text=MUD',
    backgroundImage: 'https://placehold.co/400x300/EDB83D/000B29?text=Laura',
    color: Colors.secondary,
    department: 'Arequipa',
    province: 'Arequipa',
    district: 'Yanahuara'
  },
  {
    id: '4',
    name: 'Frente Joven',
    candidate: 'Sr. Carlos Ruiz',
    slogan: 'Innovación y nuevas ideas.',
    logo: 'https://placehold.co/120x120/808080/FFFFFF?text=FJ',
    backgroundImage: 'https://placehold.co/400x300/808080/FFFFFF?text=Carlos',
    color: Colors.gray,
    department: 'Cusco',
    province: 'Cusco',
    district: 'Cusco'
  },
  {
    id: '5',
    name: 'Partido Verde',
    candidate: 'Sra. Ana López',
    slogan: 'Sostenibilidad y progreso.',
    logo: 'https://placehold.co/120x120/00A859/FFFFFF?text=PV',
    backgroundImage: 'https://placehold.co/400x300/00A859/FFFFFF?text=Ana',
    color: '#00A859',
    department: 'Lima',
    province: 'Lima',
    district: 'Barranco'
  },
  {
    id: '6',
    name: 'Unión Nacional',
    candidate: 'Dr. Roberto Silva',
    slogan: 'Unidos por el cambio.',
    logo: 'https://placehold.co/120x120/8B4513/FFFFFF?text=UN',
    backgroundImage: 'https://placehold.co/400x300/8B4513/FFFFFF?text=Roberto',
    color: '#8B4513',
    department: 'La Libertad',
    province: 'Trujillo',
    district: 'Trujillo'
  },
];

// Datos de ubicaciones (simulados)
const LOCATION_DATA = {
  departments: ['Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Piura', 'Lambayeque'],
  provinces: {
    'Lima': ['Lima', 'Huaura', 'Cañete'],
    'Arequipa': ['Arequipa', 'Caylloma', 'Islay'],
    'Cusco': ['Cusco', 'Quispicanchi', 'Calca'],
    'La Libertad': ['Trujillo', 'Chepén', 'Pacasmayo'],
    'Piura': ['Piura', 'Sullana', 'Paita'],
    'Lambayeque': ['Chiclayo', 'Lambayeque', 'Ferreñafe']
  },
  districts: {
    'Lima': ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'La Molina'],
    'Arequipa': ['Yanahuara', 'Cayma', 'Cerro Colorado', 'Socabaya'],
    'Cusco': ['Cusco', 'San Sebastián', 'San Jerónimo'],
    'Trujillo': ['Trujillo', 'Victor Larco', 'El Porvenir'],
    'Piura': ['Piura', 'Castilla', 'Catacaos'],
    'Chiclayo': ['Chiclayo', 'José Leonardo Ortiz', 'La Victoria']
  }
};

// Agregar elementos espaciadores al inicio y final para centrado
const createDataWithSpacers = (data: Party[]) => [
  { id: 'left-spacer', isSpacer: true } as Party,
  ...data,
  { id: 'right-spacer', isSpacer: true } as Party
];

// Componente para cada tarjeta de candidato/partido
const CandidateCard: React.FC<{ party: Party; scrollX?: Animated.Value; index?: number }> = ({ 
  party, 
  scrollX, 
  index 
}) => {
  if (party.isSpacer) {
    return <View style={{ width: SPACER - CARD_GAP }} />;
  }

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
        
        <View style={[styles.cardOverlay, { 
          backgroundColor: party.color,
        }]} />
        
        <View style={styles.cardShine} />
        
        <View style={styles.cardContent}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoBackground, { backgroundColor: party.color }]} />
            <Image source={{ uri: party.logo }} style={styles.partyLogo} />
          </View>
          
          <View style={styles.partyInfo}>
            <ThemedText style={styles.partyName}>{party.name}</ThemedText>
            <ThemedText style={styles.candidateName}>{party.candidate}</ThemedText>
            
            {/* Información de ubicación */}
            <View style={styles.locationContainer}>
              <IconSymbol name="map.fill" size={14} color={Colors.pearl} />
              <ThemedText style={styles.locationText}>
                {party.district}, {party.province}
              </ThemedText>
            </View>
            
            <View style={[styles.divider, { backgroundColor: Colors.pearl }]} />
            
            <ThemedText style={styles.slogan}>"{party.slogan}"</ThemedText>
          </View>

          <View style={[styles.actionButton, { backgroundColor: party.color }]}>
            <ThemedText style={styles.actionText}>Ver Propuestas</ThemedText>
          </View>
        </View>
        
        <View style={[styles.cardBorder, { backgroundColor: party.color }]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Componente de filtro de ubicación
const LocationFilter: React.FC<{
  filter: LocationFilter;
  onFilterChange: (filter: LocationFilter) => void;
}> = ({ filter, onFilterChange }) => {
  const [showDropdown, setShowDropdown] = useState<'department' | 'province' | 'district' | null>(null);

  const handleDepartmentSelect = (department: string) => {
    const newFilter = { 
      department, 
      province: '', 
      district: '' 
    };
    onFilterChange(newFilter);
    setShowDropdown('province');
  };

  const handleProvinceSelect = (province: string) => {
    const newFilter = { 
      ...filter, 
      province, 
      district: '' 
    };
    onFilterChange(newFilter);
    setShowDropdown('district');
  };

  const handleDistrictSelect = (district: string) => {
    const newFilter = { ...filter, district };
    onFilterChange(newFilter);
    setShowDropdown(null);
  };

  const clearFilters = () => {
    onFilterChange({ department: '', province: '', district: '' });
    setShowDropdown(null);
  };

  return (
    <View style={styles.filterContainer}>
      <ThemedText style={styles.filterTitle}>Filtrar por Ubicación</ThemedText>
      
      <View style={styles.filterRow}>
        {/* Departamento */}
        <TouchableOpacity 
          style={[styles.filterButton, filter.department && styles.filterButtonActive]}
          onPress={() => setShowDropdown(showDropdown === 'department' ? null : 'department')}
        >
          <ThemedText style={[
            styles.filterButtonText,
            filter.department && styles.filterButtonTextActive
          ]}>
            {filter.department || 'Departamento'}
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color={filter.department ? Colors.pearl : Colors.gray} />
        </TouchableOpacity>

        {/* Provincia */}
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filter.province && styles.filterButtonActive,
            !filter.department && styles.filterButtonDisabled
          ]}
          onPress={() => filter.department && setShowDropdown(showDropdown === 'province' ? null : 'province')}
          disabled={!filter.department}
        >
          <ThemedText style={[
            styles.filterButtonText,
            filter.province && styles.filterButtonTextActive,
            !filter.department && styles.filterButtonTextDisabled
          ]}>
            {filter.province || 'Provincia'}
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color={filter.province ? Colors.pearl : Colors.gray} />
        </TouchableOpacity>

        {/* Distrito */}
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filter.district && styles.filterButtonActive,
            (!filter.department || !filter.province) && styles.filterButtonDisabled
          ]}
          onPress={() => filter.department && filter.province && setShowDropdown(showDropdown === 'district' ? null : 'district')}
          disabled={!filter.department || !filter.province}
        >
          <ThemedText style={[
            styles.filterButtonText,
            filter.district && styles.filterButtonTextActive,
            (!filter.department || !filter.province) && styles.filterButtonTextDisabled
          ]}>
            {filter.district || 'Distrito'}
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color={filter.district ? Colors.pearl : Colors.gray} />
        </TouchableOpacity>
      </View>

      {/* Botón limpiar filtros */}
      {(filter.department || filter.province || filter.district) && (
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <IconSymbol name="xmark.circle" size={16} color={Colors.secondary} />
          <ThemedText style={styles.clearButtonText}>Limpiar filtros</ThemedText>
        </TouchableOpacity>
      )}

      {/* Dropdown */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownList} showsVerticalScrollIndicator={false}>
            {showDropdown === 'department' && LOCATION_DATA.departments.map((dept) => (
              <TouchableOpacity
                key={dept}
                style={styles.dropdownItem}
                onPress={() => handleDepartmentSelect(dept)}
              >
                <ThemedText style={styles.dropdownItemText}>{dept}</ThemedText>
              </TouchableOpacity>
            ))}
            
            {showDropdown === 'province' && filter.department && LOCATION_DATA.provinces[filter.department]?.map((prov) => (
              <TouchableOpacity
                key={prov}
                style={styles.dropdownItem}
                onPress={() => handleProvinceSelect(prov)}
              >
                <ThemedText style={styles.dropdownItemText}>{prov}</ThemedText>
              </TouchableOpacity>
            ))}
            
            {showDropdown === 'district' && filter.province && LOCATION_DATA.districts[filter.province]?.map((dist) => (
              <TouchableOpacity
                key={dist}
                style={styles.dropdownItem}
                onPress={() => handleDistrictSelect(dist)}
              >
                <ThemedText style={styles.dropdownItemText}>{dist}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default function FilterCandidatesScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>({
    department: '',
    province: '',
    district: ''
  });

  // Filtrar candidatos
  const filteredCandidates = MOCK_PARTIES.filter(party => {
    const matchesSearch = party.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         party.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = (!locationFilter.department || party.department === locationFilter.department) &&
                           (!locationFilter.province || party.province === locationFilter.province) &&
                           (!locationFilter.district || party.district === locationFilter.district);

    return matchesSearch && matchesLocation;
  });

  const DATA_WITH_SPACERS = createDataWithSpacers(filteredCandidates);

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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.mainTitle}>
            Buscar Candidatos
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Encuentra candidatos por ubicación y nombre
          </ThemedText>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre o partido..."
              placeholderTextColor={Colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle" size={18} color={Colors.gray} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filtros de ubicación */}
        <LocationFilter 
          filter={locationFilter}
          onFilterChange={setLocationFilter}
        />

        {/* Contador de resultados */}
        <View style={styles.resultsCounter}>
          <ThemedText style={styles.resultsText}>
            {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''} encontrado{filteredCandidates.length !== 1 ? 's' : ''}
          </ThemedText>
        </View>
      </View>

      {/* Carrusel */}
      {filteredCandidates.length > 0 ? (
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

          {/* Información del candidato actual */}
          <View style={styles.currentInfo}>
            <ThemedText style={styles.currentInfoText}>
              {currentIndex + 1} de {filteredCandidates.length}
            </ThemedText>
            <ThemedText style={styles.currentCandidateText}>
              {filteredCandidates[currentIndex]?.candidate}
            </ThemedText>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol name="magnifyingglass" size={64} color={Colors.lightGray} />
          <ThemedText style={styles.emptyStateTitle}>No se encontraron candidatos</ThemedText>
          <ThemedText style={styles.emptyStateText}>
            Intenta ajustar los filtros o términos de búsqueda
          </ThemedText>
        </View>
      )}
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
    marginBottom: 20,
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
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray + '40',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.night,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray + '40',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonDisabled: {
    opacity: 0.5,
  },
  filterButtonText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: Colors.pearl,
    fontWeight: '600',
  },
  filterButtonTextDisabled: {
    color: Colors.gray,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
    marginLeft: 6,
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    left: 24,
    right: 24,
    backgroundColor: Colors.pearl,
    borderRadius: 16,
    elevation: 8,
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownList: {
    padding: 8,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.night,
    fontWeight: '500',
  },
  resultsCounter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
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
    height: 440,
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
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: Colors.pearl,
    marginLeft: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.night,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
});