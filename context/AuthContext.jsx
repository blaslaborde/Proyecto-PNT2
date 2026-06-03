import { createContext, useState } from "react";

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

export function AuthProvider({children}){
    const [user, setUser] = useState(null)

    const login = () => {
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
        setError("")
    } 
 
    const logOut = () => {

  }

    return(
        <AuthContext.Provider value={user,login}>
            {children}
        </AuthContext.Provider>
    )
}