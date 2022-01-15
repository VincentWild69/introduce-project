import React, { useContext, useState } from 'react';
import { changeCssVars } from './../util/changeCssVars';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

const ThemeContext = React.createContext();

export const ThemeProvider = ({children, ...props}) => {

  const [theme, setTheme] = useState(THEME_LIGHT);

  const change = name => {
    setTheme(name);
    changeCssVars(name);
  }

  return (
    <ThemeContext.Provider 
    value={{
      theme,
      change
    }}
    {...props}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);