import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/colors';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

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
  proposals?: string[];
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
    district: 'Miraflores',
    proposals: [
      'Mejora del sistema de salud pública',
      'Inversión en educación tecnológica',
      'Programas de vivienda social'
    ]
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
    district: 'San Isidro',
    proposals: [
      'Creación de empleos tecnológicos',
      'Infraestructura vial moderna',
      'Apoyo a pequeñas empresas'
    ]
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
    district: 'Yanahuara',
    proposals: [
      'Transparencia en la gestión pública',
      'Participación ciudadana activa',
      'Fortalecimiento de la democracia'
    ]
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
    district: 'Cusco',
    proposals: [
      'Emprendimiento juvenil',
      'Educación digital gratuita',
      'Deporte y cultura comunitaria'
    ]
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

// Componente de modal para detalles del candidato
const CandidateModal: React.FC<{
  visible: boolean;
  candidate: Party | null;
  onClose: () => void;
}> = ({ visible, candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header del modal */}
          <View style={[styles.modalHeader, { backgroundColor: candidate.color }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IconSymbol name="xmark" size={20} color={Colors.pearl} />
            </TouchableOpacity>
            <ThemedText style={styles.modalTitle}>Propuestas</ThemedText>
          </View>

          {/* Contenido del modal */}
          <ScrollView style={styles.modalBody}>
            {/* Información del candidato */}
            <View style={styles.candidateInfo}>
              <View style={styles.candidateHeader}>
                <View style={[styles.logoContainer, { backgroundColor: candidate.color + '20' }]}>
                  <IconSymbol name="person.fill" size={24} color={candidate.color} />
                </View>
                <View style={styles.candidateDetails}>
                  <ThemedText style={styles.modalCandidateName}>{candidate.candidate}</ThemedText>
                  <ThemedText style={styles.modalPartyName}>{candidate.name}</ThemedText>
                  <View style={styles.locationRow}>
                    <IconSymbol name="map.fill" size={14} color={Colors.gray} />
                    <ThemedText style={styles.modalLocation}>
                      {candidate.district}, {candidate.province}, {candidate.department}
                    </ThemedText>
                  </View>
                </View>
              </View>
              
              <View style={styles.sloganContainer}>
                <ThemedText style={styles.modalSlogan}>"{candidate.slogan}"</ThemedText>
              </View>
            </View>

            {/* Lista de propuestas */}
            <View style={styles.proposalsSection}>
              <ThemedText style={styles.proposalsTitle}>Principales Propuestas</ThemedText>
              {candidate.proposals?.map((proposal, index) => (
                <View key={index} style={styles.proposalItem}>
                  <View style={[styles.proposalNumber, { backgroundColor: candidate.color }]}>
                    <ThemedText style={styles.proposalNumberText}>{index + 1}</ThemedText>
                  </View>
                  <ThemedText style={styles.proposalText}>{proposal}</ThemedText>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Footer del modal */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: candidate.color }]}
              onPress={onClose}
            >
              <ThemedText style={styles.actionButtonText}>Cerrar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Componente de item de lista
const CandidateListItem: React.FC<{
  candidate: Party;
  onViewProposals: (candidate: Party) => void;
}> = ({ candidate, onViewProposals }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <View style={[styles.listItemIcon, { backgroundColor: candidate.color + '20' }]}>
          <IconSymbol name="person.fill" size={20} color={candidate.color} />
        </View>
        
        <View style={styles.listItemInfo}>
          <ThemedText style={styles.listCandidateName}>{candidate.candidate}</ThemedText>
          <ThemedText style={styles.listPartyName}>{candidate.name}</ThemedText>
          <View style={styles.listLocation}>
            <IconSymbol name="map.fill" size={12} color={Colors.gray} />
            <ThemedText style={styles.listLocationText}>
              {candidate.district}, {candidate.province}
            </ThemedText>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: candidate.color }]}
          onPress={() => onViewProposals(candidate)}
        >
          <ThemedText style={styles.viewButtonText}>Ver</ThemedText>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.listItemDivider, { backgroundColor: candidate.color + '20' }]} />
    </View>
  );
};

export default function FilterCandidatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>({
    department: '',
    province: '',
    district: ''
  });
  const [selectedCandidate, setSelectedCandidate] = useState<Party | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filtrar candidatos
  const filteredCandidates = MOCK_PARTIES.filter(party => {
    const matchesSearch = party.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         party.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = (!locationFilter.department || party.department === locationFilter.department) &&
                           (!locationFilter.province || party.province === locationFilter.province) &&
                           (!locationFilter.district || party.district === locationFilter.district);

    return matchesSearch && matchesLocation;
  });

  const handleViewProposals = (candidate: Party) => {
    setSelectedCandidate(candidate);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCandidate(null);
  };

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

      {/* Lista de candidatos */}
      {filteredCandidates.length > 0 ? (
        <ScrollView style={styles.listContainer}>
          {filteredCandidates.map((candidate) => (
            <CandidateListItem
              key={candidate.id}
              candidate={candidate}
              onViewProposals={handleViewProposals}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol name="magnifyingglass" size={64} color={Colors.lightGray} />
          <ThemedText style={styles.emptyStateTitle}>No se encontraron candidatos</ThemedText>
          <ThemedText style={styles.emptyStateText}>
            Intenta ajustar los filtros o términos de búsqueda
          </ThemedText>
        </View>
      )}

      {/* Modal de propuestas */}
      <CandidateModal
        visible={modalVisible}
        candidate={selectedCandidate}
        onClose={closeModal}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pearl,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
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
    left: 20,
    right: 20,
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
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  listItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listItemInfo: {
    flex: 1,
  },
  listCandidateName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.night,
    marginBottom: 2,
  },
  listPartyName: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  listLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLocationText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 4,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewButtonText: {
    color: Colors.pearl,
    fontSize: 14,
    fontWeight: '600',
  },
  listItemDivider: {
    height: 1,
    marginLeft: 56,
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
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.pearl,
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
    overflow: 'hidden',
    shadowColor: Colors.night,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.pearl,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: -24,
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  candidateInfo: {
    marginBottom: 24,
  },
  candidateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  candidateDetails: {
    flex: 1,
  },
  modalCandidateName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.night,
    marginBottom: 4,
  },
  modalPartyName: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalLocation: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
  },
  sloganContainer: {
    backgroundColor: Colors.lightGray + '20',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  modalSlogan: {
    fontSize: 16,
    color: Colors.night,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  proposalsSection: {
    marginTop: 8,
  },
  proposalsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    marginBottom: 16,
  },
  proposalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.lightGray + '15',
    borderRadius: 12,
  },
  proposalNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  proposalNumberText: {
    color: Colors.pearl,
    fontSize: 14,
    fontWeight: '700',
  },
  proposalText: {
    flex: 1,
    fontSize: 14,
    color: Colors.night,
    lineHeight: 20,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.pearl,
    fontSize: 16,
    fontWeight: '600',
  },
});