import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
// import { AppContext } from "../App";
import { ifUserAuthorized } from "../Redux/actions";

 const Auth = (props) => {
    // const [redirect, setRedirect] = useState(false);
    // const [accessToken, setAccessToken] = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authenticated)
    const token = JSON.parse(localStorage.getItem("token"))

    console.log("IN AUTH",auth, token)

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get('/token',{
                    headers:{
                        'x-access-token':token
                      }
                });
                // setAccessToken(response.data);
                // setRedirect(true);
                console.log("response from server in auth", response)
                dispatch(ifUserAuthorized(true))
            } catch (err) {
                console.log(err.response.data.msg)
                dispatch(ifUserAuthorized(false))
                navigate('/login')
            }
        }
        verify();
    },[])
    return (
        // redirect ? props.children : null
        auth ? props.children : null

    )
}
export default Auth