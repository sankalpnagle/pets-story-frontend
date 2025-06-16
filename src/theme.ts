import { createTheme, ThemeOptions } from "@mui/material/styles";


declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; 
    sm: false; 
    md: false; 
    lg: false; 
    xl: false; 
    mobile: true; 
    tablet: true; 
    laptop: true; 
    desktop: true; 
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
} as ThemeOptions);
