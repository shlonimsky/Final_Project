import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import {io} from 'socket.io-client'

import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home';
import LoginRegister from "./Components/LoginRegister";
import Auth from './Auth/Auth'
import MyProfileContainer from "./Components/MyProfile/MyProfileContainer";
import Task from "./Components/Task/Task";
import AllMyTasks from "./Components/AllMyTasks";
import AllMyJobs from "./Components/AllMyJobs";
import CreateTask from "./Components/Task/CreateTask";
import ChangeTask from "./Components/Task/ChangeTask"
import ChatContainer from "./Components/Chat/ChatContainer";
import SearchHelper from "./Components/Search/SearchHelper";
import NotificationsComponent from "./Components/Notifications";
import UserContainer from "./Components/User/UserContainer";
import { verifyTokenAfterRefresh, getAllCategories, getAllCities, getNewNotifications, getNewMessages } from "./Redux/actions";
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
    background : {
      default : "#ffffff",
      paper : "#ffffff",
      selected: '#e6e6e6'
    }
  }
});


function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)


  useEffect(() => {
    dispatch(verifyTokenAfterRefresh())
    dispatch(getNewNotifications())
  dispatch(getNewMessages())
    dispatch(getAllCategories())
    dispatch(getAllCities())
    
    // setInterval(async () => {
      //   dispatch(getNewNotifications())
      //   dispatch(getNewMessages())
      // }, 10000)
    },[])
    




  return (
  <ThemeProvider theme={theme}>

      <NavBar />

      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/login" element={ <LoginRegister title = {'login'}/>} />
        <Route path="/register" element={ <LoginRegister title = {'register'}/>} />
        <Route path="/close_task/:id" element={ <ChangeTask /> } />
        <Route path="/cabinet/:id" element={<Auth> <MyProfileContainer /> </Auth> } />
        <Route path="/task/:id" element={ <Task /> } />
        <Route path="/my_tasks/:id" element={<Auth> <AllMyTasks /> </Auth>} />
        <Route path="/my_jobs/:id" element={ <Auth> <AllMyJobs /> </Auth>} />
        <Route path="/create_task" element={ <Auth> <CreateTask /> </Auth>} />
        <Route path='/chat' element={ <Auth> <ChatContainer state /> </Auth>} />
        <Route path="/search/:title" element={<SearchHelper />} />
        <Route path="/notifications" element = {<Auth> <NotificationsComponent /> </Auth>} />
        <Route path='/user/:id' element = { <UserContainer /> } />

      </Routes>

  </ThemeProvider>

  );
}

export default App;
