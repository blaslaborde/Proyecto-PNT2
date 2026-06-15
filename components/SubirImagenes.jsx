import React from "react";
import { TouchableOpacity, Text, Image, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function SubirImagenes({ foto, onImageSelected }) {
  const cambiarImagen = () => {
    Alert.alert(
      "Subir imagen", "Elegí una imagen para tu reseña",
      [
        { text: "Cámara", onPress: abrirCamara },
        { text: "Galería", onPress: abrirGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permiso denegado", "No se pudo acceder a la cámara. Por favor, otorgá el permiso para usar esta función.");
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({ 
      quality: 0.5, mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true 
    });
    if (!resultado.canceled) {
      onImageSelected(resultado.assets[0].uri);
    }
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permiso denegado", "No se pudo acceder a la galería. Por favor, otorgá el permiso para usar esta función.");
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({ 
      quality: 0.5, mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true
    });
    if (!resultado.canceled) {
      onImageSelected(resultado.assets[0].uri);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={cambiarImagen} style={styles.btnPickImage}>
        <Ionicons name="camera-outline" size={20} color="#7a6f66" />
        <Text style={styles.btnPickImageText}>
          {foto ? "Cambiar foto" : "Subir foto (Opcional)"}
        </Text>
      </TouchableOpacity>
      {foto ? (
        <Image source={{ uri: foto }} style={styles.reseniaImagenPreview} />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  btnPickImage: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0f0d0b', borderWidth: 1, borderColor: '#2e2c2a', padding: 12, borderRadius: 8, marginBottom: 12 },
  btnPickImageText: { color: '#7a6f66', fontSize: 14 },
  reseniaImagenPreview: { width: '100%', height: 150, borderRadius: 8, marginBottom: 12, resizeMode: 'cover' },
});
