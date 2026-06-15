import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categorias = ["Cafeteria", "Pizzeria", "Hamburgueseria", "Restaurant"];

export default function FiltrosChips({ filtroTop, setFiltroTop, filtroCategoria, setFiltroCategoria }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtrosRow}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
    >
      <TouchableOpacity
        style={[styles.chip, filtroTop && styles.chipActivo]}
        onPress={() => setFiltroTop(!filtroTop)}
      >
        <Ionicons name="star" size={13} color={filtroTop ? "#121212" : "#FFD700"} />
        <Text style={[styles.chipText, filtroTop && styles.chipTextActivo]}>Top Ranked</Text>
      </TouchableOpacity>

      {categorias.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.chip, filtroCategoria === cat && styles.chipActivo]}
          onPress={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
        >
          <Text style={[styles.chipText, filtroCategoria === cat && styles.chipTextActivo]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filtrosRow: {
    marginBottom: 16,
    marginTop: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#2e2c2a",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: "#1c1a18",
  },
  chipActivo: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  chipText: {
    color: "#f0ebe5",
    fontSize: 13,
  },
  chipTextActivo: {
    color: "#121212",
    fontWeight: "600",
  },
});