import { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useLugar } from "../context/LugarContext";

export default function MisLugaresVisitados() {
  const { user } = useAuth();
  const { fetchLugar } = useLugar();
  const router = useRouter();
  const [lugares, setLugares] = useState([]);

  const cargarLugares = useCallback(async () => {
    try {
      const responseVisitados = await fetch(
        `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario?userId=${user.id}`
      );

        const visitados = await responseVisitados.json();

        const misVisitados = visitados.filter(
          (v) =>
            v.userId === user.id &&
            v.visitado === true
        );

        const lugaresIds = [
          ...new Set(
            misVisitados.map((v) => v.lugarId)
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
    }, [user]);
   
    useFocusEffect(
      useCallback(() => {
        if (user?.id) cargarLugares();
      }, [user, cargarLugares])
    );

  const eliminarVisitado = async (lugarId) => {
    try {
      const responseRelaciones = await fetch(
        `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario?userId=${user.id}`
      );
      const relaciones = await responseRelaciones.json();
      const relacion = relaciones.find(
        (r) => String(r.userId) === String(user.id) && String(r.lugarId) === String(lugarId)
      );
      if (!relacion) return;
      await fetch(
        `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario/${relacion.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...relacion, visitado: false }),
        }
      );
      setLugares((prev) => prev.filter((l) => l.id !== lugarId));
    } catch (error) {
      console.log(error);
    }
  };
  
  const confirmarEliminar = (lugar) => {
    Alert.alert(
      "Eliminar de visitados",
      `¿Querés quitar "${lugar.nombre}" de tus lugares visitados?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => eliminarVisitado(lugar.id) },
      ]
    );
  };

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
          Mis lugares visitados
        </Text>
      </View>

      <ScrollView>
              {lugares.map((lugar) => (
        <View key={lugar.id} style={styles.card}>
          <TouchableOpacity
            style={styles.cardInfo}
            onPress={() => {
              fetchLugar(lugar.id);
              router.push("/lugar");
            }}
          >
            <Text style={styles.nombre}>{lugar.nombre}</Text>
            <Text style={styles.meta}>{lugar.categoria} · {lugar.barrio}</Text>
            <Text style={styles.direccion}>{lugar.direccion}</Text>
          </TouchableOpacity>
      
          <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmarEliminar(lugar)}>
            <Ionicons name="trash-outline" size={18} color="#dc2626" />
          </TouchableOpacity>
          </View>
        ))}

        {lugares.length === 0 && (
          <Text style={styles.empty}>
            No tenés lugares visitados.
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
card: {
  backgroundColor: "#1c1a18",
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
cardInfo: {
  flex: 1,
  paddingRight: 12,
},
deleteBtn: {
  width: 36,
  height: 36,
  borderRadius: 8,
  backgroundColor: "rgba(220,53,53,0.12)",
  alignItems: "center",
  justifyContent: "center",
},
});