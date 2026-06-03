import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'

export default function home() {
    const {user,logOut} = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {user.name}! 👋</Text>
          <Text style={styles.subtitle}>¿Qué vas a comer hoy?</Text>
        </View>
        <TouchableOpacity style={styles.avatarBtn}>
          <Text style={styles.avatarText}>
            {user.name?.charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogout} onPress={logOut}>
        <Text style={styles.btnLogoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
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


