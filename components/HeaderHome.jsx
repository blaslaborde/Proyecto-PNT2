import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderHome({ user, filtrarPorUbicacion, setFiltrarPorUbicacion, irAPerfil }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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