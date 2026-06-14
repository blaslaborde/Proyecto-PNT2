import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const registro = async (nombre,email,lastName,telefono,password,confirmPassword) => {
        try {
            if(!nombre || !email || !password || !confirmPassword){
                setError("Completa todos los campos")
                return
            }
            if(password != confirmPassword){
                setError("Las contraseñas no coinciden")
                return
            }
        
            const response = await fetch("https://6a161d251b90031f81b0b0c9.mockapi.io/users", {
                method: "POST",                                    
                headers: { "Content-Type": "application/json" },  
                body: JSON.stringify({                             
                    name: nombre,
                    lastName: lastName,
                    telefono: telefono,
                    email: email,
                    password: password
                })
            })
            const nuevoUsuario = await response.json() 
            console.log("USUARIO REGISTRADO", nuevoUsuario)
            setUser(nuevoUsuario)
            setError("")
            router.replace("/(tabs)/home")
        } catch (e) {
            setError("Error al registrarse")
        }
    }

    const login = async (email, password) => {
        try{
            if (!email && !password){
                setError("Faltan Datos")
                return
            }
            const response = await fetch("https://6a161d251b90031f81b0b0c9.mockapi.io/users")
            const data = await response.json()

            const buscar = data.find((usuario) => {
                return usuario.email === email && usuario.password === password
            })

            if (!buscar) {
                setError("Usuario o Password incorrectas")
                return
            }
            console.log("SESION INICIADA CON EXITO")
            router.replace("/(tabs)/home")
            setUser(buscar)
            setError("")
        } catch (error){
            console.log("Error al iniciar sesion", error)
            setError(error)
        }
    } 
    const logOut = () => {
        try{
            setUser(null)
            router.replace("/(auth)/iniciarSesion")
        } catch (error) {
            console.log("Error cerrando sesion", error)
            setError(error)
        }
    }
    const eliminarPerfil = async (id) => {
        try{
            await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/users/${id}`, {
            method: "DELETE"
            });
            logOut()
        } catch (error) {
            console.log("Error eliminando el perfil")
            setError(error)
        }
    }
        

    return(
        <AuthContext.Provider value={{user,login,logOut,registro,eliminarPerfil,error}}>
            {children}
        </AuthContext.Provider>
    )
}