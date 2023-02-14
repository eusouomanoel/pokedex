import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Home></Home>
    </ThemeProvider>
  );
}

export default App;
