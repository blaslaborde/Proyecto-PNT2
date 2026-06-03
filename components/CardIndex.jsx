import React from 'react'
import { View,Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'


export const CardIndex = () => {
  const router = useRouter()

const logo = require('../assets/LogoMinimalista.png')

const irALogin = ()=> {
        router.push("/(auth)/iniciarSesion")   
    }  
  
  return (
    <View style={styles.screen}>
    <View style={styles.card}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.title}> Bienvenidos a Food Picks</Text> 
        <Text style={styles.subtitle}>Lo mejor de tu zona, en un solo lugar.</Text>  
    </View>
    <TouchableOpacity style={styles.button} onPress={irALogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
    </TouchableOpacity>
   
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    backgroundColor: '#e4804e', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
    card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
      button: {
  marginTop: 28,
  backgroundColor: '#ffffff',
  paddingVertical: 16,
  paddingHorizontal: 48,
  borderRadius: 50,
  width: '100%',
  alignItems: 'center',
  shadowColor: '#FF6B35',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.35,
  shadowRadius: 12,
  elevation: 6,
},
buttonText: {
  color: '#000000',
  fontSize: 16,
  fontWeight: '700',
  letterSpacing: 0.5,
},
});
