import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function iniciarSesion() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {user,error,login,logOut} = useAuth()



const handleRegistrarse = () =>{
    router.replace("/(auth)/registrarse")
}

 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
  <View style={styles.container}>
    
    <View style={styles.logoArea}>
      <View style={styles.logoIcon}>
        <MaterialIcons name="restaurant" size={30} color="white" />
      </View>
      <Text style={styles.appTitle}>Food Picks</Text>
      <Text style={styles.appSub}>Descubrí los mejores sabores cerca tuyo</Text>
    </View>

    <Text style={styles.sectionLabel}>Iniciar sesión</Text>

    
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>EMAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="tu@email.com"
        placeholderTextColor="#4a403a"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
    </View>

    
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>CONTRASEÑA</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor="#4a403a"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>

    {error ? <Text style={styles.errorText}>{error}</Text> : null}

    <TouchableOpacity onPress={() => login(email,password)} style={styles.btnPrimary}>
      <Text style={styles.btnText}>Ingresar</Text>
    </TouchableOpacity>

    <View style={styles.footerRow}>
      <Text style={styles.footerText}>¿No tenés cuenta? </Text>
      <TouchableOpacity onPress={handleRegistrarse}>
        <Text style={styles.footerLink}>Registrate acá</Text>
      </TouchableOpacity>
    </View>
  </View>
  </SafeAreaView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d0b',
    paddingHorizontal: 28,
    paddingTop: 72,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#F97316',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontFamily: 'serif', 
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.5,
  },
  appSub: {
    fontSize: 13,
    color: '#7a6f66',
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: '#f0ebe5',
    marginBottom: 24,
    textAlign: 'center',
    inputGroup: {
    marginBottom: 14,
  }},
  inputLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#7a6f66',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1c1713',
    borderWidth: 1,
    borderColor: '#2e2720',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: '#f0ebe5',
  },
  errorText: {
    color: '#F97316',
    fontSize: 13,
    marginBottom: 8,
    marginTop: -4,
  },
  btnPrimary: {
    backgroundColor: '#F97316',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: '#7a6f66',
  },
  footerLink: {
    fontSize: 13,
    color: '#F97316',
    fontWeight: '500',
  },
})
