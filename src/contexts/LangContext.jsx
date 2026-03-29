import { createContext, useContext, useState } from "react";

export const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("pt"); // "pt" | "en"
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
