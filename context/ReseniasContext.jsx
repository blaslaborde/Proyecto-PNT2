import { createContext, useContext, useState } from "react";

const ReseniasContext = createContext(null);

export const useResenias = () => useContext(ReseniasContext);

export function ReseniasProvider({ children }) {
  const [reseniasLugar, setReseniasLugar] = useState([]);
  const [misResenias, setMisResenias] = useState([]);


  const traerReseniasPorLugar = async (lugarId) => {
    try {
      const response = await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/resenia?lugarId=${lugarId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReseniasLugar(data);
      } else {
        setReseniasLugar([]);
      }
    } catch (error) {
      console.log("Error trayendo reseñas", error);
    }
  };

  const traerMisResenias = async (userId) => {
    try {
      const response = await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/resenia?userId=${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setMisResenias(data);
      } else {
        setMisResenias([]);
      }
    } catch (error) {
      console.log("Error trayendo mis reseñas", error);
    }
  };

  const agregarResenia = async (nuevaResenia, lugar, onActualizarLugar) => {
    try {
      const response = await fetch("https://6a28ac664e1e783349a5df43.mockapi.io/resenia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaResenia),
      });
      const data = await response.json();
      
      setReseniasLugar(prev => [data, ...prev]);
      setMisResenias(prev => [data, ...prev]);

      const nuevosTotalPuntuacion = (lugar.totalPuntuacion || 0) + nuevaResenia.puntuacion;
      const nuevasCantResenias = (lugar.cantResenias || 0) + 1;
      const nuevaPuntuacionFinal = nuevosTotalPuntuacion / nuevasCantResenias;

      
      await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${lugar.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            totalPuntuacion: nuevosTotalPuntuacion,
            cantResenias: nuevasCantResenias,
            puntuacion: nuevaPuntuacionFinal
         })
      });
      
      onActualizarLugar({...lugar, totalPuntuacion: nuevosTotalPuntuacion, cantResenias: nuevasCantResenias});
    } catch (error) {
      console.log("Error al enviar reseña", error);
    }
  };

  const eliminarResenia = async (reseniaId, lugarId, puntuacion) => {
    try {
      await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/resenia/${reseniaId}`, {
        method: "DELETE"
      });

      setMisResenias(prev => prev.filter(r => r.id !== reseniaId));
      setReseniasLugar(prev => prev.filter(r => r.id !== reseniaId));

      const response = await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${lugarId}`);
      const lugar = await response.json();
      const nuevasCantResenias = (lugar.cantResenias || 1) - 1;
      const nuevosTotalPuntuacion = (lugar.totalPuntuacion || 0) - puntuacion;
      const nuevaPuntuacionFinal = nuevasCantResenias > 0 ? nuevosTotalPuntuacion / nuevasCantResenias : 0;

      await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${lugarId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            totalPuntuacion: nuevosTotalPuntuacion,
            cantResenias: nuevasCantResenias,
            puntuacion: nuevaPuntuacionFinal
         })
      });
    } catch (error) {
       console.log("Error al eliminar reseña", error);
    }
  };

  const editarResenia = async (reseniaId, lugarId, puntuacionAntigua, nuevaPuntuacion, nuevoComentario, nuevaFoto) => {
     try {
       const response = await fetch(`https://6a28ac664e1e783349a5df43.mockapi.io/resenia/${reseniaId}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ puntuacion: nuevaPuntuacion, comentario: nuevoComentario, foto: nuevaFoto })
       });
       const reseniaActualizada = await response.json();

       setMisResenias(prev => prev.map(r => r.id === reseniaId ? reseniaActualizada : r));
       setReseniasLugar(prev => prev.map(r => r.id === reseniaId ? reseniaActualizada : r));

       if (puntuacionAntigua !== nuevaPuntuacion) {
         const respLugar = await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${lugarId}`);
         const lugar = await respLugar.json();
         const nuevosTotalPuntuacion = (lugar.totalPuntuacion || 0) + (nuevaPuntuacion - puntuacionAntigua);
        const nuevaPuntuacionFinal = nuevosTotalPuntuacion / lugar.cantResenias;


         await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${lugarId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              totalPuntuacion: nuevosTotalPuntuacion,
              puntuacion: nuevaPuntuacionFinal
            })
         });
       }
     } catch(e) {
        console.log("Error editando", e);
     }
  };

  return (
    <ReseniasContext.Provider value={{ reseniasLugar, misResenias, traerReseniasPorLugar, traerMisResenias, agregarResenia, eliminarResenia, editarResenia }}>
      {children}
    </ReseniasContext.Provider>
  );
}