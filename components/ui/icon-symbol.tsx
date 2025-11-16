// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'map.fill': 'map',
  'person.2.fill': 'people',
  'message.fill': 'chat',
  'person.crop.circle.fill': 'person',
  
  // ÍCONOS CORREGIDOS PARA CALENDARIO
  'calendar': 'event',
  'calendar.circle.fill': 'event', // Cambiado de 'event-note' a 'event'
  'calendar.fill': 'event', // Alternativa adicional
  
  // ÍCONOS PARA CANDIDATOS
  'person.3.fill': 'groups',
  'people.fill': 'group',
  'account.box.fill': 'account-box',
  
  // LUPA DE BÚSQUEDA
  'magnifyingglass': 'search',
  'magnifyingglass.circle': 'search',
  'magnifyingglass.circle.fill': 'search',
  
  // ÍCONOS PARA VOTACIÓN
  'checkmark.square.fill': 'check-box',
  'checkmark.circle.fill': 'check-circle',
  'how.to.vote': 'how-to-vote',
  'ballot': 'ballot',
  'hand.raised.fill': 'pan-tool',
  'flag.fill': 'flag',
  'chart.bar.fill': 'bar-chart',
  
  // ÍCONOS PARA HOMEWORK
  'list.bullet.clipboard.fill': 'assignment',
  'checklist': 'checklist',
  'doc.text.fill': 'description',
  'note.text': 'note',
  'task': 'task',
  'assignment': 'assignment',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}