import React, { createContext, useState } from "react";

const ThemeContext: any = createContext(null);
const ThemeDispatch: any = createContext(null);

const themeConfig: object = {
  dark: {},
  light: {},
};

function ThemeProvider({ children }:{children:any}) {
  const [theme, setTheme] = useState<String>("dark");

  return (
    <ThemeContext.Provider>
      <ThemeDispatch.Provider>{children}</ThemeDispatch.Provider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeDispatch,ThemeProvider };
