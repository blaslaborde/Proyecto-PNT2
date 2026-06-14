import { createContext, useContext, useState } from "react";

const ReseniasContext = createContext(null);

export const useResenias = () => useContext(ReseniasContext);

export function ReseniasProvider({ children }) {
  const [reseniasLugar, setReseniasLugar] = useState([]);
  const [misResenias, setMisResenias] = useState([]);

  // Función para traer reseñas de un lugar específico
  const traerReseniasPorLugar = async (lugarId) => {
    try {
      const response = await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/resenias?lugarId=${lugarId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReseniasLugar(data);
      } else {
        setReseniasLugar([]); // MockAPI puede devolver texto si no hay coincidencias
      }
    } catch (error) {
      console.log("Error trayendo reseñas", error);
    }
  };

  // Función para traer las reseñas de un usuario específico
  const traerMisResenias = async (userId) => {
    try {
      const response = await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/resenias?userId=${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setMisResenias(data);
      } else {
        setMisResenias([]); // Si no hay coincidencias
      }
    } catch (error) {
      console.log("Error trayendo mis reseñas", error);
    }
  };

  // Función para agregar una reseña y actualizar el lugar
  const agregarResenia = async (nuevaResenia, lugar, onActualizarLugar) => {
    try {
      const response = await fetch("https://6a28ac664e1e783349a5df43.mockapi.io/resenias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaResenia),
      });
      const data = await response.json();
      
      setReseniasLugar([data, ...reseniasLugar]);

      const nuevosTotalPuntuacion = lugar.totalPuntuacion + nuevaResenia.rating;
      const nuevasCantResenias = lugar.cantResenias + 1;
      
      await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${lugar.id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            totalPuntuacion: nuevosTotalPuntuacion,
            cantResenias: nuevasCantResenias
         })
      });
      
      onActualizarLugar({...lugar, totalPuntuacion: nuevosTotalPuntuacion, cantResenias: nuevasCantResenias});
    } catch (error) {
      console.log("Error al enviar reseña", error);
    }
  };

  return (
    <ReseniasContext.Provider value={{ reseniasLugar, misResenias, traerReseniasPorLugar, traerMisResenias, agregarResenia }}>
      {children}
    </ReseniasContext.Provider>
  );
}