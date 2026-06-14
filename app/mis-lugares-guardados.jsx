import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useLugar } from "../context/LugarContext";

export default function MisLugaresGuardados() {
  const { user } = useAuth();
  const { fetchLugar } = useLugar();
  const router = useRouter();
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const cargarLugares = async () => {
      try {
        const responseGuardados = await fetch(
          "https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario"
        );

        const guardados = await responseGuardados.json();

        const misGuardados = guardados.filter(
          (g) =>
            g.userId === user.id &&
            g.guardado === true
        );

        const lugaresIds = [
          ...new Set(
            misGuardados.map((g) => g.lugarId)
          ),
        ];

        const responseLugares = await fetch(
          "https://6a161d251b90031f81b0b0c9.mockapi.io/lugares"
        );

        const lugaresApi = await responseLugares.json();

        const lugaresFiltrados = lugaresApi.filter(
          (lugar) => lugaresIds.includes(lugar.id)
        );

        setLugares(lugaresFiltrados);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.id) {
      cargarLugares();
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#f0ebe5"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Mis lugares guardados
        </Text>
      </View>

      <ScrollView>
        {lugares.map((lugar) => (
          <TouchableOpacity
            key={lugar.id}
            style={styles.card}
            onPress={() => {
              fetchLugar(lugar.id);
              router.push("/lugar");
            }}
          >
            <Text style={styles.nombre}>
              {lugar.nombre}
            </Text>

            <Text style={styles.meta}>
              {lugar.categoria} · {lugar.barrio}
            </Text>

            <Text style={styles.direccion}>
              {lugar.direccion}
            </Text>
          </TouchableOpacity>
        ))}

        {lugares.length === 0 && (
          <Text style={styles.empty}>
            No tenés lugares guardados.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0d0b",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
    marginRight: 12,
  },
  title: {
    color: "#f0ebe5",
    fontSize: 22,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1c1a18",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  nombre: {
    color: "#f0ebe5",
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    color: "#7a6f66",
    marginTop: 4,
  },
  direccion: {
    color: "#7a6f66",
    marginTop: 2,
  },
  empty: {
    color: "#7a6f66",
    textAlign: "center",
    marginTop: 40,
  },
});