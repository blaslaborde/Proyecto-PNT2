import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLugar } from "../context/LugarContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ReseniasList from "../components/ReseniasList";

export default function Lugar() {
  const { lugarSeleccionado } = useLugar();
  const router = useRouter();
  const [lugar, setLugar] = useState(null);
  const { lugar } = useLugar();

  if (!lugar) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0d0b" }}>
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#f0ebe5" />
          </TouchableOpacity>
          <View style={styles.headerImagen}>
            <Ionicons name="restaurant-outline" size={48} color="#F97316" />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.nombre}>{lugar.nombre}</Text>
          <Text style={styles.meta}>{lugar.categoria} · {lugar.barrio}</Text>
          <Text style={styles.direccion}>{lugar.direccion}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>
                {lugar.cantResenias > 0
                  ? (lugar.totalPuntuacion / lugar.cantResenias).toFixed(1)
                  : "-"}
              </Text>
              <Text style={styles.statLbl}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{lugar.cantResenias}</Text>
              <Text style={styles.statLbl}>Reseñas</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Redes Sociales</Text>
            {lugar.redesSociales?.length > 0 ? (
              lugar.redesSociales.map((red, index) => (
                <Text key={index} style={styles.redSocial}>· {red}</Text>
              ))
            ) : (
              <Text style={styles.empty}>Sin redes sociales cargadas</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fotos</Text>
            {lugar.fotos?.length > 0 ? (
              lugar.fotos.map((foto, index) => (
                <Text key={index} style={styles.redSocial}>· {foto}</Text>
              ))
            ) : (
              <Text style={styles.empty}>Sin fotos cargadas</Text>
            )}
          </View>

          <ReseniasList 
             lugarId={lugarSeleccionado} 
             lugar={lugar} 
             onActualizarLugar={setLugar} 
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0d0b",
  },
  header: {
    height: 200,
    backgroundColor: "#1c1a18",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImagen: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#2a2520",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "600",
    color: "#f0ebe5",
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: 13,
    color: "#7a6f66",
    marginTop: 4,
  },
  direccion: {
    fontSize: 13,
    color: "#7a6f66",
    marginTop: 2,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#1c1a18",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#2e2c2a",
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statVal: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F97316",
  },
  statLbl: {
    fontSize: 11,
    color: "#7a6f66",
    marginTop: 2,
  },
  statDivider: {
    width: 0.5,
    backgroundColor: "#2e2c2a",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f0ebe5",
    marginBottom: 10,
  },
  redSocial: {
    fontSize: 14,
    color: "#7a6f66",
    marginBottom: 4,
  },
  empty: {
    fontSize: 13,
    color: "#3a3530",
  },
});