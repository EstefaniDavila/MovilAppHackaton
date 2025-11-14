// /components/avatar.tsx
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

type Props = {
  uri?: string;
  onChange: (uri: string) => void;
};

export function Avatar({ uri, onChange }: Props) {
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });
    if (!result.canceled) onChange(result.assets[0].uri);
  }

  return (
    <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
      <View style={styles.circle}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} />
        ) : (
          <ThemedText style={styles.initials}>👤</ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  image: { width: '100%', height: '100%', borderRadius: 48 },
  initials: { fontSize: 32, color: '#9ca3af' },
});