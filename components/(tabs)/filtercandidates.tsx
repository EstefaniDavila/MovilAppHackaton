import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState, useEffect } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import { Colors } from '../../constants/colors';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

// Interfaces TypeScript basadas en las APIs reales
interface Candidate {
  id: string;
  full_name: string;
  document_number: string | null;
  photo_url: string | null;
  position_type: string;
  role: string;
  circumscription: string;
  order_number: number | null;
  political_party_id: string;
  created_at: string;
  updated_at: string;
}

interface CandidatesResponse {
  presidential?: Candidate[];
  vice_1?: Candidate[];
  vice_2?: Candidate[];
  senate?: Candidate[];
  deputy?: Candidate[];
  andean_parliament?: Candidate[];
}

interface Party {
  id: string;
  name: string;
  color: string;
}

// Datos de ejemplo para partidos (deberías obtener esto de tu API también)
const MOCK_PARTIES: Party[] = [
  {
    id: '5b9bb245-4535-450f-9ff7-509dca257e90',
    name: 'Partido Acción Popular',
    color: Colors.primary,
  },
  {
    id: 'partido-2',
    name: 'Fuerza Popular',
    color: Colors.night,
  },
  {
    id: 'partido-3',
    name: 'Partido Morado',
    color: Colors.secondary,
  }
];

// Tipos de cargo disponibles
const POSITION_TYPES = [
  { key: 'presidential', label: 'Plancha Presidencial', apiType: 'presidents' },
  { key: 'senate', label: 'Senado', apiType: 'senate' },
  { key: 'deputy', label: 'Diputados', apiType: 'deputy' },
  { key: 'andean_parliament', label: 'Parlamento Andino', apiType: 'parliament' }
];

// Componente de filtro de tipo de cargo y circunscripción
const PositionFilter: React.FC<{
  selectedPosition: string;
  onPositionChange: (position: string) => void;
  selectedCircumscription: string;
  onCircumscriptionChange: (circ: string) => void;
  circumscriptions: string[];
  selectedParty: string;
  onPartyChange: (partyId: string) => void;
  isLoading: boolean;
}> = ({ 
  selectedPosition, 
  onPositionChange, 
  selectedCircumscription, 
  onCircumscriptionChange, 
  circumscriptions,
  selectedParty,
  onPartyChange,
  isLoading 
}) => {
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showCircDropdown, setShowCircDropdown] = useState(false);
  const [showPartyDropdown, setShowPartyDropdown] = useState(false);

  const getPositionLabel = (positionKey: string) => {
    return POSITION_TYPES.find(pos => pos.key === positionKey)?.label || 'Tipo de Cargo';
  };

  const isCircumscriptionEnabled = selectedPosition === 'deputy';

  return (
    <View style={styles.filterContainer}>
      <ThemedText style={styles.filterTitle}>Filtrar Candidatos</ThemedText>
      
      <View style={styles.filterRow}>
        {/* Filtro de Partido */}
        <TouchableOpacity 
          style={[styles.filterButton, selectedParty && styles.filterButtonActive]}
          onPress={() => setShowPartyDropdown(!showPartyDropdown)}
        >
          <ThemedText style={[
            styles.filterButtonText,
            selectedParty && styles.filterButtonTextActive
          ]}>
            {MOCK_PARTIES.find(p => p.id === selectedParty)?.name || 'Partido'}
          </ThemedText>
          <IconSymbol name="chevron.down" size={16} color={selectedParty ? Colors.pearl : Colors.gray} />
        </TouchableOpacity>

        {/* Filtro de Tipo de Cargo */}
        <TouchableOpacity 
          style={[styles.filterButton, selectedPosition && styles.filterButtonActive]}
          onPress={() => setShowPositionDropdown(!showPositionDropdown)}
        >
          <ThemedText style={[
            styles.filterButtonText,
            selectedPosition && styles.filterButtonTextActive
          ]}>
            {getPositionLabel(selectedPosition)}
          </ThemedText>
          <IconSymbol name="chevron.down" size={16} color={selectedPosition ? Colors.pearl : Colors.gray} />
        </TouchableOpacity>

        {/* Filtro de Circunscripción */}
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            selectedCircumscription && styles.filterButtonActive,
            !isCircumscriptionEnabled && styles.filterButtonDisabled
          ]}
          onPress={() => isCircumscriptionEnabled && setShowCircDropdown(!showCircDropdown)}
          disabled={!isCircumscriptionEnabled}
        >
          <ThemedText style={[
            styles.filterButtonText,
            selectedCircumscription && styles.filterButtonTextActive,
            !isCircumscriptionEnabled && styles.filterButtonTextDisabled
          ]}>
            {selectedCircumscription || 'Circunscripción'}
          </ThemedText>
          <IconSymbol name="chevron.down" size={16} color={selectedCircumscription ? Colors.pearl : Colors.gray} />
        </TouchableOpacity>
      </View>

      {/* Dropdown de Partido */}
      {showPartyDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownList} showsVerticalScrollIndicator={false}>
            {MOCK_PARTIES.map((party) => (
              <TouchableOpacity
                key={party.id}
                style={styles.dropdownItem}
                onPress={() => {
                  onPartyChange(party.id);
                  setShowPartyDropdown(false);
                }}
              >
                <View style={[styles.partyColor, { backgroundColor: party.color }]} />
                <ThemedText style={styles.dropdownItemText}>{party.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Dropdown de Tipo de Cargo */}
      {showPositionDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownList} showsVerticalScrollIndicator={false}>
            {POSITION_TYPES.map((position) => (
              <TouchableOpacity
                key={position.key}
                style={styles.dropdownItem}
                onPress={() => {
                  onPositionChange(position.key);
                  setShowPositionDropdown(false);
                }}
              >
                <ThemedText style={styles.dropdownItemText}>{position.label}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Dropdown de Circunscripción */}
      {showCircDropdown && isCircumscriptionEnabled && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownList} showsVerticalScrollIndicator={false}>
            {circumscriptions.map((circ) => (
              <TouchableOpacity
                key={circ}
                style={styles.dropdownItem}
                onPress={() => {
                  onCircumscriptionChange(circ);
                  setShowCircDropdown(false);
                }}
              >
                <ThemedText style={styles.dropdownItemText}>{circ}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <ThemedText style={styles.loadingText}>Cargando candidatos...</ThemedText>
        </View>
      )}
    </View>
  );
};

// Componente de modal para detalles del candidato
const CandidateModal: React.FC<{
  visible: boolean;
  candidate: Candidate | null;
  party: Party | null;
  onClose: () => void;
}> = ({ visible, candidate, party, onClose }) => {
  if (!candidate || !party) return null;

  const getPositionLabel = (positionType: string) => {
    switch (positionType) {
      case 'presidential': return 'Presidente';
      case 'vice_1': return '1er Vicepresidente';
      case 'vice_2': return '2do Vicepresidente';
      case 'senate': return 'Senador';
      case 'deputy': return 'Diputado';
      case 'andean_parliament': return 'Parlamentario Andino';
      default: return positionType;
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'titular' ? 'Titular' : 'Suplente';
  };

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
          <View style={[styles.modalHeader, { backgroundColor: party.color }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IconSymbol name="xmark" size={20} color={Colors.pearl} />
            </TouchableOpacity>
            <ThemedText style={styles.modalTitle}>Detalles del Candidato</ThemedText>
          </View>

          {/* Contenido del modal */}
          <ScrollView style={styles.modalBody}>
            {/* Información del candidato */}
            <View style={styles.candidateInfo}>
              <View style={styles.candidateHeader}>
                <View style={[styles.logoContainer, { backgroundColor: party.color + '20' }]}>
                  <IconSymbol name="person.fill" size={24} color={party.color} />
                </View>
                <View style={styles.candidateDetails}>
                  <ThemedText style={styles.modalCandidateName}>{candidate.full_name}</ThemedText>
                  <ThemedText style={styles.modalPartyName}>{party.name}</ThemedText>
                  <View style={styles.detailRow}>
                    <IconSymbol name="briefcase.fill" size={14} color={Colors.gray} />
                    <ThemedText style={styles.modalDetail}>
                      {getPositionLabel(candidate.position_type)} • {getRoleLabel(candidate.role)}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <IconSymbol name="map.fill" size={14} color={Colors.gray} />
                    <ThemedText style={styles.modalDetail}>
                      {candidate.circumscription}
                    </ThemedText>
                  </View>
                  {candidate.order_number && (
                    <View style={styles.detailRow}>
                      <IconSymbol name="number" size={14} color={Colors.gray} />
                      <ThemedText style={styles.modalDetail}>
                        Orden: {candidate.order_number}
                      </ThemedText>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Información adicional */}
            <View style={styles.additionalInfo}>
              <ThemedText style={styles.sectionTitle}>Información Adicional</ThemedText>
              
              <View style={styles.infoItem}>
                <ThemedText style={styles.infoLabel}>Tipo de Cargo:</ThemedText>
                <ThemedText style={styles.infoValue}>{getPositionLabel(candidate.position_type)}</ThemedText>
              </View>
              
              <View style={styles.infoItem}>
                <ThemedText style={styles.infoLabel}>Rol:</ThemedText>
                <ThemedText style={styles.infoValue}>{getRoleLabel(candidate.role)}</ThemedText>
              </View>
              
              <View style={styles.infoItem}>
                <ThemedText style={styles.infoLabel}>Circunscripción:</ThemedText>
                <ThemedText style={styles.infoValue}>{candidate.circumscription}</ThemedText>
              </View>
              
              {candidate.order_number && (
                <View style={styles.infoItem}>
                  <ThemedText style={styles.infoLabel}>Número de Orden:</ThemedText>
                  <ThemedText style={styles.infoValue}>{candidate.order_number}</ThemedText>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Footer del modal */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: party.color }]}
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
  candidate: Candidate;
  party: Party;
  onViewDetails: (candidate: Candidate) => void;
}> = ({ candidate, party, onViewDetails }) => {
  const getPositionLabel = (positionType: string) => {
    switch (positionType) {
      case 'presidential': return 'Presidente';
      case 'vice_1': return '1er Vicepresidente';
      case 'vice_2': return '2do Vicepresidente';
      case 'senate': return 'Senador';
      case 'deputy': return 'Diputado';
      case 'andean_parliament': return 'Parlamentario Andino';
      default: return positionType;
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'titular' ? 'Titular' : 'Suplente';
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <View style={[styles.listItemIcon, { backgroundColor: party.color + '20' }]}>
          <IconSymbol name="person.fill" size={20} color={party.color} />
        </View>
        
        <View style={styles.listItemInfo}>
          <ThemedText style={styles.listCandidateName}>{candidate.full_name}</ThemedText>
          <ThemedText style={styles.listPartyName}>{party.name}</ThemedText>
          <View style={styles.listDetails}>
            <ThemedText style={styles.listPosition}>
              {getPositionLabel(candidate.position_type)} • {getRoleLabel(candidate.role)}
            </ThemedText>
            <View style={styles.listLocation}>
              <IconSymbol name="map.fill" size={12} color={Colors.gray} />
              <ThemedText style={styles.listLocationText}>
                {candidate.circumscription}
              </ThemedText>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: party.color }]}
          onPress={() => onViewDetails(candidate)}
        >
          <ThemedText style={styles.viewButtonText}>Ver</ThemedText>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.listItemDivider, { backgroundColor: party.color + '20' }]} />
    </View>
  );
};

export default function FilterCandidatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParty, setSelectedParty] = useState(MOCK_PARTIES[0]?.id || '');
  const [selectedPosition, setSelectedPosition] = useState('presidential');
  const [selectedCircumscription, setSelectedCircumscription] = useState('');
  const [circumscriptions, setCircumscriptions] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  // Obtener circunscripciones cuando cambia el partido
  useEffect(() => {
    if (selectedParty) {
      fetchCircumscriptions();
    }
  }, [selectedParty]);

  // Obtener candidatos cuando cambian los filtros
  useEffect(() => {
    if (selectedParty) {
      fetchCandidates();
    }
  }, [selectedParty, selectedPosition, selectedCircumscription]);

  // Filtrar candidatos por búsqueda
  useEffect(() => {
    const filtered = candidates.filter(candidate =>
      candidate.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCandidates(filtered);
  }, [candidates, searchQuery]);

  const fetchCircumscriptions = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/member/candidates/circumscription_list_by_party/${selectedParty}`
      );
      const data = await response.json();
      setCircumscriptions(data.circunscripciones || []);
    } catch (err) {
      console.error('Error fetching circumscriptions:', err);
      setCircumscriptions([]);
    }
  };

  const fetchCandidates = async () => {
    if (!selectedParty) return;

    setIsLoading(true);
    setError(null);

    try {
      let url = '';
      const currentParty = MOCK_PARTIES.find(p => p.id === selectedParty);

      if (!currentParty) {
        throw new Error('Partido no encontrado');
      }

      if (selectedPosition === 'presidential') {
        url = `${API_URL}/api/v1/member/candidates/only_presidents_by_party/${selectedParty}`;
      } else if (selectedPosition === 'senate') {
        url = `${API_URL}/api/v1/member/candidates/senado_by_party/${selectedParty}`;
      } else if (selectedPosition === 'deputy') {
        if (selectedCircumscription) {
          url = `${API_URL}/api/v1/member/candidates/by_party_and_circ/${selectedParty}/${encodeURIComponent(selectedCircumscription)}`;
        } else {
          url = `${API_URL}/api/v1/member/candidates/diput_by_party/${selectedParty}`;
        }
      } else if (selectedPosition === 'andean_parliament') {
        url = `${API_URL}/api/v1/member/candidates/parlament_by_party/${selectedParty}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al cargar candidatos');
      }

      const data: CandidatesResponse = await response.json();
      
      // Combinar todos los candidatos en un solo array
      const allCandidates: Candidate[] = [];
      if (data.presidential) allCandidates.push(...data.presidential);
      if (data.vice_1) allCandidates.push(...data.vice_1);
      if (data.vice_2) allCandidates.push(...data.vice_2);
      if (data.senate) allCandidates.push(...data.senate);
      if (data.deputy) allCandidates.push(...data.deputy);
      if (data.andean_parliament) allCandidates.push(...data.andean_parliament);

      setCandidates(allCandidates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCandidate(null);
  };

  const clearFilters = () => {
    setSelectedCircumscription('');
    setSearchQuery('');
  };

  const currentParty = MOCK_PARTIES.find(p => p.id === selectedParty);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.mainTitle}>
            Candidatos Electorales
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Encuentra candidatos por partido, cargo y ubicación
          </ThemedText>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre..."
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

        {/* Filtros */}
        <PositionFilter 
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
          selectedCircumscription={selectedCircumscription}
          onCircumscriptionChange={setSelectedCircumscription}
          circumscriptions={circumscriptions}
          selectedParty={selectedParty}
          onPartyChange={setSelectedParty}
          isLoading={isLoading}
        />

        {/* Botón limpiar filtros */}
        {(selectedCircumscription || searchQuery) && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <IconSymbol name="xmark.circle" size={16} color={Colors.secondary} />
            <ThemedText style={styles.clearButtonText}>Limpiar filtros</ThemedText>
          </TouchableOpacity>
        )}

        {/* Contador de resultados */}
        <View style={styles.resultsCounter}>
          <ThemedText style={styles.resultsText}>
            {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''} encontrado{filteredCandidates.length !== 1 ? 's' : ''}
            {isLoading && ' (cargando...)'}
          </ThemedText>
        </View>

        {/* Error message */}
        {error && (
          <View style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.triangle" size={20} color={Colors.error} />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        )}
      </View>

      {/* Lista de candidatos */}
      {!isLoading && filteredCandidates.length > 0 ? (
        <ScrollView style={styles.listContainer}>
          {filteredCandidates.map((candidate) => (
            <CandidateListItem
              key={candidate.id}
              candidate={candidate}
              party={currentParty!}
              onViewDetails={handleViewDetails}
            />
          ))}
        </ScrollView>
      ) : !isLoading ? (
        <View style={styles.emptyState}>
          <IconSymbol name="person.2" size={64} color={Colors.lightGray} />
          <ThemedText style={styles.emptyStateTitle}>No se encontraron candidatos</ThemedText>
          <ThemedText style={styles.emptyStateText}>
            {selectedParty ? 'Intenta ajustar los filtros o términos de búsqueda' : 'Selecciona un partido para comenzar'}
          </ThemedText>
        </View>
      ) : null}

      {/* Loading state */}
      {isLoading && (
        <View style={styles.loadingState}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <ThemedText style={styles.loadingStateText}>Cargando candidatos...</ThemedText>
        </View>
      )}

      {/* Modal de detalles */}
      <CandidateModal
        visible={modalVisible}
        candidate={selectedCandidate}
        party={currentParty!}
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
  partyColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.night,
    fontWeight: '500',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
    marginLeft: 6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error + '20',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    fontWeight: '500',
    marginLeft: 8,
    textAlign: 'center',
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
  listDetails: {
    marginBottom: 4,
  },
  listPosition: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 2,
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
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingStateText: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 12,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalDetail: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
  },
  additionalInfo: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.night,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray + '40',
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: Colors.night,
    fontWeight: '600',
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