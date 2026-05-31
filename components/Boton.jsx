import React from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const Boton = () => {
    const onHandellPress = ()=> {
        
    }
  
  
   
    return (
    <View>
        <TouchableOpacity style={styles.button} onPress={onHandellPress}>
            <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
})