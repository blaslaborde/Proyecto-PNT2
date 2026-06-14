import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useResenias } from "../context/ReseniasContext";

export default function ReseniasList({ lugarId, lugar, onActualizarLugar }) {
  const { user } = useAuth();
  const { reseniasLugar, traerReseniasPorLugar, agregarResenia } = useResenias();
  const [escribiendo, setEscribiendo] = useState(false);
  const [comentario, setComentario] = useState("");
  const [foto, setFoto] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (lugarId) {
      traerReseniasPorLugar(lugarId);
    }
  }, [lugarId]);

  const enviarResenia = async () => {
    if (!comentario.trim()) return;

    const nuevaResenia = {
      lugarId: lugarId,
      userId: user?.id,
      userName: user?.name,
      rating: rating,
      comentario: comentario,
      foto: foto,
      fecha: new Date().toLocaleDateString()
    };

    await agregarResenia(nuevaResenia, lugar, onActualizarLugar);
    setComentario("");
    setFoto("");
    setRating(5);
    setEscribiendo(false);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Reseñas</Text>
      
      {!escribiendo ? (
        <TouchableOpacity style={styles.btnResenia} onPress={() => setEscribiendo(true)}>
          <Text style={styles.btnReseniaText}>Escribir una reseña</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.formResenia}>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons 
                  name={star <= rating ? "star" : "star-outline"} 
                  size={28} 
                  color="#F97316" 
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.inputResenia}
            placeholder="¿Qué te pareció este lugar?"
            placeholderTextColor="#7a6f66"
            multiline
            value={comentario}
            onChangeText={setComentario}
          />
          <TextInput
            style={[styles.inputResenia, { minHeight: 40 }]}
            placeholder="URL de foto (Opcional)"
            placeholderTextColor="#7a6f66"
            value={foto}
            onChangeText={setFoto}
          />
          <View style={styles.formReseniaActions}>
            <TouchableOpacity onPress={() => setEscribiendo(false)} style={styles.btnCancelar}>
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={enviarResenia} style={styles.btnEnviar}>
              <Text style={styles.btnEnviarText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {reseniasLugar.length > 0 ? (
        reseniasLugar.map((r) => (
          <View key={r.id || `${r.fecha}-${r.userName}`} style={styles.reseniaCard}>
            <View style={styles.reseniaHeader}>
              <Text style={styles.reseniaUser}>{r.userName || 'Usuario'}</Text>
              <View style={styles.reseniaRating}>
                <Ionicons name="star" size={12} color="#F97316" />
                <Text style={styles.reseniaRatingText}>{r.rating}</Text>
              </View>
            </View>
            <Text style={styles.reseniaText}>{r.comentario}</Text>
            {r.foto ? (
              <Image source={{ uri: r.foto }} style={styles.reseniaImagen} />
            ) : null}
            <Text style={styles.reseniaDate}>{r.fecha}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>Aún no hay reseñas. ¡Sé el primero!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#f0ebe5", marginBottom: 10 },
  empty: { fontSize: 13, color: "#3a3530" },
  btnResenia: {
    backgroundColor: '#1c1a18', borderWidth: 1, borderColor: '#F97316',
    paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginBottom: 16,
  },
  btnReseniaText: { color: '#F97316', fontWeight: '600', fontSize: 14 },
  formResenia: {
    backgroundColor: '#1c1a18', padding: 16, borderRadius: 12, marginBottom: 16,
  },
  ratingStars: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12, gap: 12 },
  inputResenia: {
    backgroundColor: '#0f0d0b', borderWidth: 1, borderColor: '#2e2c2a',
    borderRadius: 8, color: '#f0ebe5', padding: 12, minHeight: 80,
    textAlignVertical: 'top', marginBottom: 12,
  },
  formReseniaActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  btnCancelar: { paddingVertical: 8, paddingHorizontal: 16 },
  btnCancelarText: { color: '#7a6f66', fontWeight: '500' },
  btnEnviar: {
    backgroundColor: '#F97316', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8,
  },
  btnEnviarText: { color: '#fff', fontWeight: '600' },
  reseniaCard: {
    backgroundColor: '#1c1a18', padding: 14, borderRadius: 12, marginBottom: 12,
  },
  reseniaHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,
  },
  reseniaUser: { color: '#f0ebe5', fontWeight: '600', fontSize: 14 },
  reseniaRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reseniaRatingText: { color: '#F97316', fontSize: 13, fontWeight: '600' },
  reseniaText: {
    color: '#cfc9c2', fontSize: 13, lineHeight: 18, marginBottom: 8,
  },
  reseniaImagen: { width: '100%', height: 150, borderRadius: 8, marginBottom: 8, resizeMode: 'cover' },
  reseniaDate: { color: '#7a6f66', fontSize: 11 },
});