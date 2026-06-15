import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLugar } from "../context/LugarContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ReseniasList from "../components/ReseniasList";
import { useAuth } from "../context/AuthContext";
import { useLugaresUsuario } from "../context/LugaresUsuarioContext";

export default function Lugar() {
  const router = useRouter();
  const { lugar, fetchLugar } = useLugar();
  const { user } = useAuth();
  const { traerMisLugares } = useLugaresUsuario();

  const guardarLugar = async () => {
    try {
      const response = await fetch(
        `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario?userId=${user.id}&lugarId=${lugar.id}`
      );

      const relaciones = await response.json();
      
      const existe = relaciones.length > 0 ? relaciones[0] : null;

      if (existe) {
        await fetch(
          `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario/${existe.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...existe,
              guardado: true,
            }),
          },
        );
      } else {
        await fetch(
          "https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lugarId: lugar.id,
              userId: user.id,
              guardado: true,
              visitado: false,
              favorito: false,
            }),
          },
        );
      }

      await traerMisLugares(user.id);
      Alert.alert("¡Listo!", "Lugar guardado exitosamente.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar el lugar.");
    }
  };

  const visitarLugar = async () => {
    try {
      const response = await fetch(
        `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario?userId=${user.id}&lugarId=${lugar.id}`
      );

      const relaciones = await response.json();
      
      const existe = relaciones.length > 0 ? relaciones[0] : null;

      if (existe) {
        await fetch(
          `https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario/${existe.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...existe,
              visitado: true,
            }),
          },
        );
      } else {
        await fetch(
          "https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lugarId: lugar.id,
              userId: user.id,
              guardado: false,
              visitado: true,
              favorito: false,
            }),
          },
        );
      }

      await traerMisLugares(user.id);
      Alert.alert("¡Listo!", "Marcaste este lugar como visitado.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo actualizar el estado.");
    }
  };

  if (!lugar) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0d0b" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/home")}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={22} color="#f0ebe5" />
          </TouchableOpacity>
          <Image
            source={{ uri: lugar.fotos[1] }}
            style={styles.headerImagen}
            resizeMode="cover"
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.nombre}>{lugar.nombre}</Text>
          
          <View style={styles.divider} />

          <View>
            <Text style={styles.subtext}>Datos sobre el lugar:</Text>
            <Text style={styles.meta}>
              {lugar.categoria} · {lugar.barrio}
            </Text>
            <Text style={styles.direccion}>{lugar.direccion}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Redes Sociales</Text>
            {lugar.redesSociales?.length > 0 ? (
              lugar.redesSociales.map((red, index) => (
                <Text key={index} style={styles.redSocial}>
                  · {red}
                </Text>
              ))
            ) : (
              <Text style={styles.empty}>Sin redes sociales cargadas</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fotos</Text>
            {lugar.fotos?.length > 0 ? (
              <ScrollView
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.carrusel}
              >
                {lugar.fotos.map((foto, index) => (
                  <Image
                    key={index}
                    source={{ uri: foto }}
                    style={styles.fotoCarrusel}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.empty}>Sin fotos cargadas</Text>
            )}
          </View>
            <View style={styles.botonesContainer}>
              <TouchableOpacity style={styles.botonAccion} onPress={guardarLugar}>
                <Text style={styles.botonTexto}>Guardar restaurante</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botonAccion} onPress={visitarLugar}>
                <Text style={styles.botonTexto}>Marcar como visitado</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>
                {lugar.cantResenias > 0 ? lugar.puntuacion.toFixed(1) : "-"}
              </Text>
              <Text style={styles.statLbl}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{lugar.cantResenias}</Text>
              <Text style={styles.statLbl}>Reseñas</Text>
            </View>
          </View>



          <ReseniasList
            lugarId={lugar.id}
            lugar={lugar}
            onActualizarLugar={(data) => fetchLugar(lugar.id)}
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
    zIndex: 10,
  },
  headerImagen: {
    width: "100%",
    height: "100%",
    position: "absolute",
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
  imagen: {
    width: "100%",
    height: 200,
  },
  botonesContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  botonAccion: {
    flex: 1,
    backgroundColor: "#252525",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botonTexto: {
    color: "#F97316",
    fontSize: 14,
    fontWeight: "600",
  },
  carrusel: {
  marginBottom: 16,
  },
  fotoCarrusel: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  subtext: {
  color: "#7a6f66",
  fontSize: 16,
  marginTop: 6,
  letterSpacing: 0.8,
  },
  divider: {
  height: 1,
  backgroundColor: "#2e2c2a",
  marginVertical: 10,
  }
});
