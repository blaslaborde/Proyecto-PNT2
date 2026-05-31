import {Stack} from 'expo-router'
import React from 'react'

export default function RootLayout (){
  return (
    <Stack>
        <Stack.Screem name="iniciarSesion"/>
        <Stack.Screen name="home"/>
    </Stack>
  )
}
