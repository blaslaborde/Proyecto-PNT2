import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResenias } from "../context/ReseniasContext";

export default function MisResenias() {
  const router = useRouter();
  const { misResenias, eliminarResenia, editarResenia } = useResenias();

  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({ comentario: "", puntuacion: 5, foto: "", puntuacionAntigua: 5, lugarId: "" });

  const iniciarEdicion = (resenia) => {
    setEditando(resenia.id);
    setFormEdit({
      comentario: resenia.comentario,
      puntuacion: resenia.puntuacion,
      foto: resenia.foto || "",
      puntuacionAntigua: resenia.puntuacion,
      lugarId: resenia.lugarId
    });
  };

  const guardarEdicion = async () => {
    await editarResenia(editando, formEdit.lugarId, formEdit.puntuacionAntigua, formEdit.puntuacion, formEdit.comentario, formEdit.foto);
    setEditando(null);
  };

  const confirmarEliminar = (id, lugarId, puntuacion) => {
    Alert.alert("Eliminar reseña", "¿Seguro que querés borrar esta reseña?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarResenia(id, lugarId, puntuacion) }
    ]);
  };

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
              {editando === r.id ? (
                <View>
                  <View style={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} onPress={() => setFormEdit({ ...formEdit, puntuacion: star })}>
                        <Ionicons name={star <= formEdit.puntuacion ? "star" : "star-outline"} size={24} color="#F97316" />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TextInput
                    style={styles.inputResenia}
                    value={formEdit.comentario}
                    onChangeText={(txt) => setFormEdit({ ...formEdit, comentario: txt })}
                    multiline
                  />
                  <TextInput
                    style={[styles.inputResenia, { minHeight: 40 }]}
                    placeholder="URL de foto (Opcional)"
                    placeholderTextColor="#7a6f66"
                    value={formEdit.foto}
                    onChangeText={(txt) => setFormEdit({ ...formEdit, foto: txt })}
                  />
                  <View style={styles.actionsRow}>
                    <TouchableOpacity onPress={() => setEditando(null)} style={styles.btnAction}>
                      <Text style={styles.btnActionText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={guardarEdicion} style={[styles.btnAction, { backgroundColor: "#F97316" }]}>
                      <Text style={[styles.btnActionText, { color: "#fff" }]}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.reseniaHeader}>
                    <Text style={styles.reseniaDate}>{r.fecha}</Text>
                    <View style={styles.reseniaRating}>
                      <Ionicons name="star" size={14} color="#F97316" />
                      <Text style={styles.reseniaRatingText}>{r.puntuacion}</Text>
                    </View>
                  </View>
                  <Text style={styles.reseniaText}>{r.comentario}</Text>
                  {r.foto ? (
                    <Image source={{ uri: r.foto }} style={styles.reseniaImagen} />
                  ) : null}
                  
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => iniciarEdicion(r)} style={styles.iconBtn}>
                      <Ionicons name="pencil-outline" size={18} color="#7a6f66" />
                      <Text style={styles.iconBtnText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmarEliminar(r.id, r.lugarId, r.puntuacion)} style={styles.iconBtn}>
                      <Ionicons name="trash-outline" size={18} color="#E05252" />
                      <Text style={[styles.iconBtnText, { color: "#E05252" }]}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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
  reseniaImagen: { width: '100%', height: 150, borderRadius: 8, marginTop: 12, resizeMode: 'cover' },
  cardActions: { flexDirection: "row", justifyContent: "flex-end", gap: 16, marginTop: 12, borderTopWidth: 1, borderTopColor: "#2e2c2a", paddingTop: 12 },
  iconBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  iconBtnText: { color: "#7a6f66", fontSize: 13, fontWeight: "500" },

  // Edicion
  ratingStars: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12, gap: 8 },
  inputResenia: { backgroundColor: '#0f0d0b', borderWidth: 1, borderColor: '#2e2c2a', borderRadius: 8, color: '#f0ebe5', padding: 12, minHeight: 80, textAlignVertical: 'top', marginBottom: 12 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  btnAction: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  btnActionText: { color: '#7a6f66', fontWeight: '600' },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: { color: "#f0ebe5", fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  emptySubText: { color: "#7a6f66", fontSize: 13, textAlign: "center", paddingHorizontal: 32, lineHeight: 20 },
});