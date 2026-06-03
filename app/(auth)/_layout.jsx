import { Stack } from 'expo-router'
import React from 'react'
import { AuthProvider } from '../../context/AuthContext'


export default function AuthLayout() {
  return (
    
    <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name='iniciarSesion'/>
        <Stack.Screen name='registrarse'/>
    </Stack>
    
  )
}
