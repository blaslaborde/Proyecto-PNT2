import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResenias } from '../../context/ReseniasContext'


export default function profile() {
  const router = useRouter()  
  const {user,logOut,eliminarPerfil} = useAuth()
  const { misResenias, traerMisResenias } = useResenias()

  useEffect(() => {
    if (user?.id) {
      traerMisResenias(user.id);
    }
  }, [user]);

  const stats = [
    { num: misResenias.length, label: 'Reseñas' },
    { num: 8,  label: 'Guardados' },
    { num: 3,  label: 'Visitas' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name ?? 'Usuario'}</Text>
            <Text style={styles.userEmail}>{user?.email ?? ''}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

      
        <Text style={styles.sectionTitle}>MI ACTIVIDAD</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/mis-resenias')}>
            <View style={[styles.menuIcon, styles.menuIconOrange]}>
              <Ionicons name="star" size={18} color="#F97316" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuLabel}>Mis reseñas</Text>
              <Text style={styles.menuSub}>{misResenias.length} reseña(s) publicadas</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7a6f66" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, styles.menuIconOrange]}>
              <Ionicons name="bookmark" size={18} color="#F97316" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuLabel}>Lugares guardados</Text>
              <Text style={styles.menuSub}>8 lugares en tu lista</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7a6f66" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>CUENTA</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, styles.menuIconGray]}>
              <Ionicons name="pencil" size={18} color="#7a6f66" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuLabel}>Editar perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7a6f66" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, styles.menuIconGray]}>
              <Ionicons name="notifications-outline" size={18} color="#7a6f66" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuLabel}>Notificaciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7a6f66" />
          </TouchableOpacity>
        </View>

      
          <TouchableOpacity style={styles.logoutGroup} onPress={logOut}>
            <View style={styles.logoutIcon}>
              <Ionicons name="log-out-outline" size={18} color="#7a6f66" />
            </View>
            <Text style={styles.logoutLabel}>Cerrar sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteBtn} onPress={() => eliminarPerfil(user.id)}>
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.deleteBtnText}>Eliminar cuenta</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE = '#FF6B00';
const ORANGE_DIM = 'rgba(255,107,0,0.12)';
const RED = '#E05252';
const RED_DIM = 'rgba(220,53,53,0.08)';
const BG = '#121212';
const CARD = '#252525';
const TEXT = '#F0F0F0';
const MUTED = '#888888';
const BORDER = 'rgba(255,255,255,0.07)';
const RADIUS = 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: MUTED,
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: ORANGE_DIM,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: ORANGE,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: RADIUS,
    borderWidth: 0.5,
    borderColor: BORDER,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '600',
    color: ORANGE,
  },
  statLabel: {
    fontSize: 10,
    color: MUTED,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: MUTED,
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  menuGroup: {
    backgroundColor: CARD,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: RADIUS,
    borderWidth: 0.5,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconOrange: {
    backgroundColor: ORANGE_DIM,
  },
  menuIconGray: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  menuIconText: {
    fontSize: 16,
    color: ORANGE,
  },
  menuText: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT,
  },
  menuSub: {
    fontSize: 12,
    color: MUTED,
    marginTop: 1,
  },
  chevron: {
    fontSize: 20,
    color: MUTED,
  },
  divider: {
    height: 0.5,
    backgroundColor: BORDER,
    marginHorizontal: 16,
  },
  logoutGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: RED_DIM,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: RADIUS,
    borderWidth: 0.5,
    borderColor: 'rgba(220,53,53,0.15)',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  logoutIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(220,53,53,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconText: {
    fontSize: 18,
    color: RED,
  },
  logoutLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: RED,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 32,
    gap: 8,
    alignSelf: "center",
  },
  deleteBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  }
});