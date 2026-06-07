import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {Text,TextInput,TouchableOpacity,View,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function registrarse () {
 const [nombre, setNombre] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [error, setError] = useState("")

const handleRegistro = () => {

    if(!nombre || !email || !password || !confirmPassword){
        setError("Completa todos los campos")
        return
    }

    if(password != confirmPassword){
        setError("Las contraseñas no coinciden")
        return
    }

    setError("")
    console.log("USUARIO REGISTRADO")

    
}


return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
    <View style={styles.container}>

      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegistro}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.btnSecondary}
  onPress={() => router.replace("/(auth)/iniciarSesion")}
>
  <Text style={styles.btnSecondaryText}>
    Volver al login
  </Text>
</TouchableOpacity>

    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f0d0b',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#1c1713',
    borderWidth: 1,
    borderColor: '#2e2720',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    marginBottom: 14,
  },

  button: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  btnSecondary: {
  backgroundColor: '#3a342f',
  borderRadius: 12,
  paddingVertical: 15,
  alignItems: 'center',
  marginTop: 14,
},

btnSecondaryText: {
  color: '#f0ebe5',
  fontSize: 16,
  fontWeight: 'bold',
},

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: '#F97316',
    marginBottom: 10,
    textAlign: 'center',
  }

})