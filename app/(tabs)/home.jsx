import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLugar } from "../../context/LugarContext";
import * as Location from "expo-location";

export default function home() {
  const router = useRouter();
  const { user } = useAuth();
  const [lugares, setLugares] = useState([]);
  const { setLugarSeleccionado } = useLugar();
  const { fetchLugar } = useLugar();
  const [barrio, setBarrio] = useState(null);
  const [filtrarPorUbicacion, setFiltrarPorUbicacion] = useState(false);

  useEffect(() => {
    const fetchLugares = async () => {
      const response = await fetch(
        "https://6a161d251b90031f81b0b0c9.mockapi.io/lugares",
      );
      const lugar = await response.json();
      setLugares(lugar);
      console.log(lugar);
    };

    const obtenerUbicacion = async () => {
      const { coords } = await Location.getCurrentPositionAsync({})
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
      );
      const data = await response.json();

      console.log(data.address);

      const barrio = data.address.suburb;
      setBarrio(barrio);
    };
    fetchLugares();
    obtenerUbicacion();
  }, []);

  const normalizar = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const lugaresFiltrados =
    filtrarPorUbicacion && barrio
      ? lugares.filter(
          (lugar) => normalizar(lugar.barrio) === normalizar(barrio),
        )
      : lugares;

  if (!user) return null;

  const irAPerfil = () => {
    router.push("/(tabs)/profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola, {user.name}! 👋</Text>
            <Text style={styles.subtitle}>¿A donde vas a ir hoy?</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
                onPress={() => setFiltrarPorUbicacion(!filtrarPorUbicacion)}
                style={[styles.filtroBtn, filtrarPorUbicacion && styles.filtroBtnActivo]}
            >
                <Ionicons name="location" size={16} color={filtrarPorUbicacion ? "#121212" : "#F97316"} />
                <Text style={{ color: filtrarPorUbicacion ? "#121212" : "#F97316" }}>
                    {filtrarPorUbicacion ? "Mi zona" : "Todos"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={irAPerfil} style={styles.avatarBtn}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Los mejores lugares por tu Zona
          </Text>
          {lugaresFiltrados.length === 0 ? (
            <Text style={{ color: "#f0ebe5" }}>No hay lugares en tu zona</Text>
          ) : (
            lugaresFiltrados.map((lugar) => (
              <TouchableOpacity
                key={lugar.id}
                style={styles.card}
                onPress={async () => {
                  await fetchLugar(lugar.id);
                  router.replace("/lugar");
                }}
              >
                <View style={styles.cardImagen}>
                  <Image
                    source={{ uri: lugar.fotos[0] }}
                    style={styles.headerImagen}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNombre}>{lugar.nombre}</Text>
                  <Text style={styles.cardCategoria}>
                    {lugar.categoria} · {lugar.direccion}
                  </Text>
                  <View style={styles.cardPuntaje}>
                    {lugar.esTopRanked ? (
                      <Ionicons name="star" size={14} color="#FFD700" />
                    ) : (
                      <Ionicons name="star" size={14} color="#F97316" />
                    )}
                    <Text
                      style={[
                        styles.cardPuntajeText,
                        { color: lugar.esTopRanked ? "#FFD700" : "#F97316" },
                      ]}
                    >
                      {lugar.puntuacion.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0d0b",
    paddingHorizontal: 28,
    paddingTop: 64,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "600",
    color: "#f0ebe5",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: "#7a6f66",
    marginTop: 4,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnLogout: {
    borderWidth: 1,
    borderColor: "#2e2720",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 32,
  },
  btnLogoutText: {
    color: "#7a6f66",
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f0ebe5",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#1c1a18",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#2e2c2a",
    flexDirection: "row",
    overflow: "hidden",
  },
  cardImagen: {
    width: 90,
    height: 90,
    backgroundColor: "#2a2520",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
    gap: 4,
  },
  cardNombre: {
    color: "#f0ebe5",
    fontSize: 15,
    fontWeight: "500",
  },
  cardCategoria: {
    color: "#7a6f66",
    fontSize: 12,
    marginTop: 2,
  },
  cardPuntaje: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  cardPuntajeText: {
    color: "#F97316",
    fontSize: 13,
    fontWeight: "500",
  },
  headerImagen: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imagen: {
    width: "100%",
    height: 200,
  },
  filtroBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderWidth: 1,
      borderColor: "#F97316",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
  },
  filtroBtnActivo: {
    backgroundColor: "#F97316",
  },
});
