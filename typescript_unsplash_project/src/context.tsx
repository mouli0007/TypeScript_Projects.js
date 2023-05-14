import { createContext, useContext, useState } from "react";

interface Context {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<Context | null>(null);

const initialDarkMode = () => {
  const storedDark_Mode = localStorage.getItem("darkTheme") === "true";

  return storedDark_Mode;
};
initialDarkMode();
export const AppProvider = ({ children }: any) => {
  // UseState !
  const [isDarkTheme, setIsDarktheme] = useState<any | boolean>(
    initialDarkMode()
  );

  console.log(isDarkTheme);
  const [searchTerm, setSearchTerm] = useState<string>("cat");

  // Functions for the useState
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarktheme(newDarkTheme);
    const body = document.querySelector("body");
    body?.classList.toggle("dark-theme");

    localStorage.setItem("darkTheme", newDarkTheme.toString());
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook ! for

export const useGlobalContext = (): any => useContext(AppContext);
