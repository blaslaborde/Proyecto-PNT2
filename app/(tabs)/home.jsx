import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLugar } from "../../context/LugarContext";
import * as Location from "expo-location";
import HeaderHome from "../../components/HeaderHome";
import FiltrosChips from "../../components/FiltrosChips";
import LugarCard from "../../components/LugarCard";

export default function home() {
  const router = useRouter();
  const { user } = useAuth();
  const [lugares, setLugares] = useState([]);
  const { fetchLugar } = useLugar();
  const [barrio, setBarrio] = useState(null);
  const [filtrarPorUbicacion, setFiltrarPorUbicacion] = useState(false);
  const [filtroTop, setFiltroTop] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await fetch("https://6a161d251b90031f81b0b0c9.mockapi.io/lugares");
        if (!response.ok) throw new Error("Error en MockAPI");
        
        const data = await response.json();
        setLugares(data);
      } catch (error) {
        console.log("Error al cargar los lugares:", error);
      }
    };

    const obtenerUbicacion = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        
        const { coords } = await Location.getCurrentPositionAsync({});
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
          {
            headers: {
              "User-Agent": "FoodPicksApp/1.0", 
            },
          }
        );
        if (!response.ok) throw new Error("Nominatim falló en la respuesta");
        const data = await response.json();
        console.log(data)
        setBarrio(data.address.suburb); 
      } catch (error) {
        console.log("Error al obtener la ubicación:", error);
      }
    };

    fetchLugares();
    obtenerUbicacion();
  }, []);

  const normalizar = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const lugaresFiltrados = lugares
    .filter((lugar) => {
      if (filtrarPorUbicacion && barrio) {
        return normalizar(lugar.barrio) === normalizar(barrio);
      }
      return true;
    })
    .filter((lugar) => (filtroTop ? lugar.esTopRanked : true))
    .filter((lugar) => (filtroCategoria ? lugar.categoria === filtroCategoria : true))
    .sort((a, b) => b.puntuacion - a.puntuacion);

  if (!user) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView style={styles.container}>
        <HeaderHome
          user={user}
          filtrarPorUbicacion={filtrarPorUbicacion}
          setFiltrarPorUbicacion={setFiltrarPorUbicacion}
          irAPerfil={() => router.push("/(tabs)/profile")}
        />
        <FiltrosChips
          filtroTop={filtroTop}
          setFiltroTop={setFiltroTop}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Los mejores lugares por tu Zona</Text>
          {lugaresFiltrados.length === 0 ? (
            <Text style={{ color: "#f0ebe5" }}>No hay lugares en tu zona</Text>
          ) : (
            lugaresFiltrados.map((lugar) => (
              <LugarCard
                key={lugar.id}
                lugar={lugar}
                onPress={async () => {
                  await fetchLugar(lugar.id);
                  router.replace("/lugar");
                }}
              />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f0ebe5",
    marginBottom: 12,
  },
});