import {router, Stack, useRouter, useSegments} from 'expo-router'
import React, { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'

function RootLayoutNav() {
  const router = useRouter();
  const { user } = useAuth();
  const segments = useSegments();
  const [listo, setListo] = useState(false);

    useEffect(() => {
    setListo(true);
  }, []);


  useEffect(() => {
     if (!listo) return;
    const estaEnAuth = segments[0] === '(auth)';

    if (!user && !estaEnAuth) {
      router.replace('/(auth)/iniciarSesion');
    } else if (user && estaEnAuth) {
      router.replace('/(tabs)/home');
    }
  }, [user, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

