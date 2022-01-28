import React, { useContext, useState } from 'react';
import { changeCssVars } from './../util/changeCssVars';
import { storage } from './../util/storage';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({children, ...props}) => {

  const [theme, setTheme] = useState(storage.getItem('theme') || THEME_LIGHT);

  changeCssVars(theme);

  const change = theme => {
    storage.setItem('theme', theme);
    setTheme(theme);
    changeCssVars(theme);
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