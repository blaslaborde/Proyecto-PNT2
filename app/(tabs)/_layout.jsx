import {Stack, Tabs} from 'expo-router'
import React from 'react'

export default function RootLayout (){
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="home"/>
        <Tabs.Screen name="profile"/>
    </Tabs>
  )
}
