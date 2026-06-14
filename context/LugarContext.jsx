import { createContext, useContext, useState } from "react";

const LugarContext = createContext(null);

export const useLugar = () => useContext(LugarContext);

export function LugarProvider({ children }) {
    const [lugar, setLugar] = useState(null);
    const [cantGuardados, setCantGuardados] = useState(0);
    const [cantVisitados, setCantVisitados] = useState(0);

   const fetchLugar = async (id) => {
    try {
      const response = await fetch(`https://6a161d251b90031f81b0b0c9.mockapi.io/lugares/${id}`);
      const data = await response.json();
      setLugar(data);
    } catch (error) {
      console.log("Error trayendo el lugar", error);
    }
  };

  return (
    <LugarContext.Provider value={{ lugar,fetchLugar,cantGuardados,setCantGuardados,cantVisitados,setCantVisitados}}>
      {children}
    </LugarContext.Provider>
  );
}


