import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResenias } from "../context/ReseniasContext";

export default function MisResenias() {
  const router = useRouter();
  const { misResenias } = useResenias();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0d0b" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#f0ebe5" />
        </TouchableOpacity>
        <Text style={styles.title}>Mis reseñas</Text>
      </View>

      <ScrollView style={styles.container}>
        {misResenias.length > 0 ? (
          misResenias.map((r) => (
            <View key={r.id} style={styles.reseniaCard}>
              <View style={styles.reseniaHeader}>
                <Text style={styles.reseniaDate}>{r.fecha}</Text>
                <View style={styles.reseniaRating}>
                  <Ionicons name="star" size={14} color="#F97316" />
                  <Text style={styles.reseniaRatingText}>{r.rating}</Text>
                </View>
              </View>
              <Text style={styles.reseniaText}>{r.comentario}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={48} color="#2e2c2a" />
            <Text style={styles.emptyText}>Todavía no publicaste reseñas.</Text>
            <Text style={styles.emptySubText}>Tus opiniones ayudarán a otros a descubrir los mejores lugares.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1c1a18",
  },
  backBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f0ebe5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  reseniaCard: {
    backgroundColor: "#1c1a18",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2e2c2a",
  },
  reseniaHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  reseniaDate: { color: "#7a6f66", fontSize: 12 },
  reseniaRating: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(249,115,22,0.1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  reseniaRatingText: { color: "#F97316", fontSize: 13, fontWeight: "600" },
  reseniaText: { color: "#cfc9c2", fontSize: 14, lineHeight: 20 },
  
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: { color: "#f0ebe5", fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  emptySubText: { color: "#7a6f66", fontSize: 13, textAlign: "center", paddingHorizontal: 32, lineHeight: 20 },
});