import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

const MOCK_USER = [{
  id: 1,
  name: "Blas",
  email: "blas@gmail.com",
  password: "123"
},
{
  id: 2,
  name: "Fernando",
  email: "fernando@gmail.com",
  password: "123"
}]

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
     const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const login = (email, password) => {
        if (!email && !password){
        setError("Faltan Datos")
        return
        }
        const data = MOCK_USER.find((usuario) => {
            return usuario.email === email && usuario.password === password
        })

        if (!data) {
            setError("Usuario o Password incorrectas")
            return
        }


        console.log("SESION INICIADA CON EXITO")
        router.replace("/(tabs)/home")
        setUser(data)
        setError("")
    } 
 
    const logOut = () => {
        setUser(null)
        router.replace("/(auth)/iniciarSesion")
  }

    return(
        <AuthContext.Provider value={{user,login,logOut,error}}>
            {children}
        </AuthContext.Provider>
    )
}