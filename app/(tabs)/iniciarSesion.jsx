import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const MOCK_USER = [{
  id: 1,
  name: "Blas",
  email: "blas@gmail.com",
  password: "123"
}]


export default function iniciarSesion() {
  const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")

const handelLogin = () => {
  if (!email && !password){
    setError("Faltan Datos")
    return
  } 
  const data = MOCK_USER.find((usuario) => {
  return usuario.email === email && usuario.password === password
})

if(!data){
  setError("Usuario o Password incorrectas")
  return
}

setError("")
}

  return (
    <View>
      <Text>Iniciar Sesion</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      {error && (<Text>{error}</Text>)}

      <TouchableOpacity onPress={handelLogin}>
        <Text> Ingresar </Text>
      </TouchableOpacity>
    </View>
  );
}
