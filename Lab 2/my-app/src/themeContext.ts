// ThemeContext.ts
import React from 'react';


export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
 },
 dark: {
   foreground: '#ffffff',
   background: '#222222',
 },
};

/*
export const themes = {
  light: {
    foreground: '#333333',  // Softer dark gray for text
    background: '#f9f9f9',  // Very light, off-white background
  },
  dark: {
    foreground: '#f0f0f0',  // Slightly softer white for text
    background: '#121212',  // Deep dark background for better contrast
  },
};*/

export const ThemeContext = React.createContext(themes.light);

