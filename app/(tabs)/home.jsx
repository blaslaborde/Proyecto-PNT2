import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
  const router = useRouter()
  const {user} = useAuth()

    if (!user) return null;

  const irAPerfil = () =>{
      router.push("/(tabs)/profile")
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {user.name}! 👋</Text>
          <Text style={styles.subtitle}>¿A donde vas a ir hoy?</Text>
        </View>
        <TouchableOpacity onPress={irAPerfil} style={styles.avatarBtn}>
          <Text style={styles.avatarText}>
            {user.name?.charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d0b',
    paddingHorizontal: 28,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#f0ebe5',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#7a6f66',
    marginTop: 4,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  btnLogout: {
    borderWidth: 1,
    borderColor: '#2e2720',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
  },
  btnLogoutText: {
    color: '#7a6f66',
    fontSize: 14,
    fontWeight: '500',
  },
})


