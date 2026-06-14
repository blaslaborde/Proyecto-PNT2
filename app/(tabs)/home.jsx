import React, { useEffect, useState } from "react";
import {ScrollView,StyleSheet,Text,TouchableOpacity,View,} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLugar } from "../../context/LugarContext";


export default function home() {
  const router = useRouter();
  const { user } = useAuth();
  const [lugares, setLugares] = useState([]);
  const { setLugarSeleccionado } = useLugar();
  const { fetchLugar } = useLugar();

  useEffect(() => {
    const fetchLugares = async () => {
      const response = await fetch(
        "https://6a161d251b90031f81b0b0c9.mockapi.io/lugares",
      );
      const lugar = await response.json();
      setLugares(lugar);
      console.log(lugar);
    };

    fetchLugares();
  }, []);

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
          <TouchableOpacity onPress={irAPerfil} style={styles.avatarBtn}>
            <Text style={styles.avatarText}>
              {user.name?.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Los mejores lugares por tu Zona</Text>
          {lugares.map((lugar) => (
            <TouchableOpacity key={lugar.id} style={styles.card} onPress={async () => { await fetchLugar(lugar.id); router.push("/lugar")}}>
              <View style={styles.cardImagen}>
                  <Ionicons name="restaurant-outline" size={28} color="#F97316" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardNombre}>{lugar.nombre}</Text>
                <Text style={styles.cardCategoria}>
                  {lugar.categoria} · {lugar.direccion}
                </Text>
                <View style={styles.cardPuntaje}>
                  {lugar.esTopRanked ? (<Ionicons name="star" size={14} color="#FFD700"/>) : (<Ionicons name="star" size={14} color="#F97316" />) }
                  <Text style={[styles.cardPuntajeText, { color: lugar.esTopRanked ? "#FFD700" : "#F97316" }]}>
                    {(lugar.totalPuntuacion / lugar.cantResenias).toFixed(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
});
