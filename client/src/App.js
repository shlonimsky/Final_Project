import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home';
import LoginRegister from "./Components/LoginRegister";
import Auth from './Auth/Auth'
import MyProfileContainer from "./Components/MyProfile/MyProfileContainer";
import Task from "./Components/Task";
import { verifyTokenAfterRefresh } from "./Redux/actions";
import './style.css'


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

  useEffect(() => {

    dispatch(verifyTokenAfterRefresh())

  },[])

  return (
  <ThemeProvider theme={theme}>

      <NavBar />

      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/login" element={ <LoginRegister title = {'login'}/>} />
        <Route path="/register" element={ <LoginRegister title = {'register'}/>} />
        <Route path="/cabinet/:id" element={<Auth> <MyProfileContainer /> </Auth> } />
        <Route path="/task/:id" element={ <Task /> } />
      </Routes>

  </ThemeProvider>

  );
}

export default App;
