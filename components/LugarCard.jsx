import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LugarCard({ lugar, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
          <Ionicons name="star" size={14} color={lugar.esTopRanked ? "#FFD700" : "#F97316"} />
          <Text style={[styles.cardPuntajeText, { color: lugar.esTopRanked ? "#FFD700" : "#F97316" }]}>
            {lugar.puntuacion.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  },
  headerImagen: {
    width: "100%",
    height: "100%",
    position: "absolute",
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
    fontSize: 13,
    fontWeight: "500",
  },
});