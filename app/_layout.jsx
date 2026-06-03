import {router, Stack, useRouter} from 'expo-router'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'

export default function RootLayout (){
  const router = useRouter()  
  



  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="(tabs)"/>
      </Stack>
    </AuthProvider>
  )
}

