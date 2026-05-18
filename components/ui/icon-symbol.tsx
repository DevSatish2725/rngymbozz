// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
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
  'person.fill': 'person',
  'person.2.fill': 'groups',
  'creditcard.fill': 'credit-card',
  'wallet.pass.fill': 'account-balance-wallet',
  'gearshape.fill': 'settings',
  'checkmark.circle.fill': 'check-circle',
  'square.grid.2x2': 'dashboard',
  'info.circle': 'info',
  'calendar.circle.fill': 'event',
  'door.left.hand.open': 'meeting-room',
  'person.2.circle.fill': 'people',
  'banknote.fill': 'payments',
  'plus': 'add',
  'magnifyingglass': 'search',
  'line.horizontal.3.decrease.circle.fill': 'filter-alt',
  'pencil.circle.fill': 'edit',
  'trash': 'delete',
  'chevron.left': 'arrow-back',
  'clock.fill': 'schedule',
  'chevron.down': 'keyboard-arrow-down',
  'xmark': 'close',
  'infinity': 'all-inclusive',
  'calendar.badge.clock': 'event-available',
  'clock.arrow.circlepath': 'history',
  'chart.line.uptrend.xyaxis': 'show-chart',
   'bolt.fill': 'bolt',
  'banknote': 'payments',
  'building.columns.fill': 'account-balance',
  'phone.fill': 'phone',
  'mappin.and.ellipse': 'location-on',
  'building.2.fill': 'apartment',
  'crown.fill': 'workspace-premium',
  'checkmark.seal.fill': 'verified',
  'rectangle.portrait.and.arrow.right': 'logout',
   'figure.walk': 'directions-walk',
  'person.3.fill': 'groups',
  'person.fill.checkmark': 'person-add-alt-1',
  'indianrupeesign.circle.fill': 'currency-rupee',
  'square.grid.2x2.fill': 'grid-view',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'gift.fill': 'card-giftcard'
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
