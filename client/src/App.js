import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// import { Auth } from "./Auth/Auth";
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home';
import LoginRegister from "./Components/LoginRegister";
import { ifUserAuthorized } from "./helper/isAuth";
import { verifyToken } from "./Redux/actions";
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
    },
    textColor : {
      main : "#ffffff"
    },
    background : "#f2f2f2"
  }
});

function App() {
  const dispatch = useDispatch()
  const [accessToken,setAccessToken] = useState();
  dispatch(verifyToken())
  // useEffect(() => dispatch(verifyToken()))

  return (
  <ThemeProvider theme={theme}>
    <AppContext.Provider value={{accessToken, setAccessToken}}>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/login" element={ <LoginRegister title = {'login'}/>} />
        <Route path="/register" element={ <LoginRegister title = {'register'}/>} />

      </Routes>

    </AppContext.Provider>
  </ThemeProvider>

  );
}

export default App;
