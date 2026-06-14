import { createContext, useContext, useState } from "react";

const LugaresUsuarioContext = createContext(null);

export const useLugaresUsuario = () =>
  useContext(LugaresUsuarioContext);

export function LugaresUsuarioProvider({ children }) {
  const [misLugaresGuardados, setMisLugaresGuardados] = useState([]);
  const [misLugaresVisitados, setMisLugaresVisitados] = useState([]);

  const traerMisLugares = async (userId) => {
    try {
      const responseRelaciones = await fetch(
        "https://6a28ac664e1e783349a5df43.mockapi.io/lugaresUsuario"
      );

      const relaciones = await responseRelaciones.json();

      const guardados = relaciones.filter(
        (r) => r.userId === userId && r.guardado
      );

      const visitados = relaciones.filter(
        (r) => r.userId === userId && r.visitado
      );

      const responseLugares = await fetch(
        "https://6a161d251b90031f81b0b0c9.mockapi.io/lugares"
      );

      const lugares = await responseLugares.json();

      setMisLugaresGuardados(
        lugares.filter((l) =>
          guardados.some((g) => g.lugarId === l.id)
        )
      );

      setMisLugaresVisitados(
        lugares.filter((l) =>
          visitados.some((v) => v.lugarId === l.id)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LugaresUsuarioContext.Provider
      value={{
        misLugaresGuardados,
        misLugaresVisitados,
        traerMisLugares,
      }}
    >
      {children}
    </LugaresUsuarioContext.Provider>
  );
}