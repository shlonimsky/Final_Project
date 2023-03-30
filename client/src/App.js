import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// import { Auth } from "./Auth/Auth";
import NavBar from "./Components/NavBar";
import Home from './Components/Home';
import { ifUserAuthorized } from "./helper/isAuth";
import './style.css'

export const AppContext = createContext('');

ifUserAuthorized()
const theme = createTheme({
  palette: {
    primary: {
      main: "#390050"
    },
    secondary: {
      main: "#44B6C6"
    }
  }
});

function App() {
  const [accessToken,setAccessToken] = useState();


  return (
  <ThemeProvider theme={theme}>
    <AppContext.Provider value={{accessToken, setAccessToken}}>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> }/>
      </Routes>

    </AppContext.Provider>
  </ThemeProvider>

  );
}

export default App;
