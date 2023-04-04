import axios from "axios";
import jwt_decode from 'jwt-decode';
// import { GetMyInfo } from "../helper/getUserInfo";

export const verifyToken =  () => async (dispatch,getState) => {
    console.log('in action verify token')

    console.log(getState())
    try {
        const res = await axios.get('/token',{
            headers:{
                'x-access-token': getState().accessToken
              }
        });
        // const {email,userID} = jwt_decode(getState().accessToken)
        // GetMyInfo(userID,email)
        return(
            dispatch({
                type : 'IS_AUTH',
                payload : true
            })
        )
    } catch (err) {
        console.log("err in action",err.data)
        return(
            dispatch({
                type : 'IS_AUTH',
                payload : false
            })
        )
    }
}
export const ifUserAuthorized = (bool) => {
return{
    type : 'IS_AUTH',
    payload : bool
}
} 

export const setToken = (token="") => {
    return{
        type : "SET_TOKEN",
        payload : token
    }
}
export const setUser = () => async (dispatch,getState) => {
    console.log("IN ACTION SETUSER");
    try {
        const {email,userID} = jwt_decode(getState().accessToken)
        try {
            const res = await axios.get(`/cabinet/${userID}`,{
                headers:{
                    'x-access-token': getState().accessToken
                  }
            })
            console.log("data in action setUser",res.data)
        return(
            dispatch({
                type : "SET_USER",
                payload : {...res.data,email}
            })
        )
        } catch (err) {
            console.log("error in act",err.data)
        return(
            dispatch({
                type : "SET_USER",
                payload : {email, user_id:userID}
            })
        )
        }
    } catch (err) {
        return(
            dispatch({
                type : "SET_USER",
                payload : {}
            })
        )
    } 
}
export const setMyInfo = (obj) => {
    return{
        type : "SET_MY_INFO",
        payload : obj
    }
}