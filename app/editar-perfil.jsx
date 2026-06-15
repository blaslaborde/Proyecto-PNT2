import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import SubirImagenes from "../components/SubirImagenes";

export default function EditarPerfil() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();

  const [nombre, setNombre] = useState(user?.name || "");
  const [apellido, setApellido] = useState(user?.lastName || "");
  const [telefono, setTelefono] = useState(user?.telefono || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);

  const guardarCambios = async () => {
    await updateProfile({
      name: nombre,
      lastName: apellido,
      avatar: avatar,
      telefono: telefono,
      email: user.email,
      password: user.password,
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color="#F97316" />
          </TouchableOpacity>

          <Text style={styles.title}>Editar perfil</Text>
        </View>
        <View style={styles.avatar}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{ width: "100%", height: "100%", borderRadius: 999 }}
            />
          ) : (
            <Text style={styles.avatarText}>
              {user?.avatar?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
            placeholderTextColor="#777"
          />
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Apellido"
            placeholderTextColor="#777"
          />
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Teléfono"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
          />
          <Text style={styles.label}> Cargar imagen </Text>
          <SubirImagenes
          foto={avatar}
          onImageSelected={(uri) => setAvatar(uri)}
          style={styles.input}
        />
        </View>
        <TouchableOpacity style={styles.button} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  content: {
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F0F0F0",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 25,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "600",
    color: "#fff",
  },

  card: {
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 20,
  },

  label: {
    color: "#888",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
  },

  button: {
    backgroundColor: "#F97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
