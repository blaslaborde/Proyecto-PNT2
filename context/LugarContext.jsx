import { createContext, useContext, useState } from "react";

const LugarContext = createContext(null);

export const useLugar = () => useContext(LugarContext);

export function LugarProvider({ children }) {
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);

  return (
    <LugarContext.Provider value={{ lugarSeleccionado, setLugarSeleccionado }}>
      {children}
    </LugarContext.Provider>
  );
}


