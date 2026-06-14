import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

const registro = async (nombre,email,lastName,telefono,password,confirmPassword) => {

    if(!nombre || !email || !password || !confirmPassword){
        setError("Completa todos los campos")
        return
    }

    if(password != confirmPassword){
        setError("Las contraseñas no coinciden")
        return
    }
    try {
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
    } 
 
    const logOut = () => {
        setUser(null)
        router.replace("/(auth)/iniciarSesion")
  }

  const updateProfile = async (updatedData) => {
  try {
    const response = await fetch(
      `https://6a161d251b90031f81b0b0c9.mockapi.io/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const userActualizado = await response.json();
    setUser(userActualizado);
  } catch (e) {
    setError("Error al actualizar perfil");
  }
};
    return(
        <AuthContext.Provider value={{user,login,logOut,registro,error,updateProfile}}>
            {children}
        </AuthContext.Provider>
    )
}