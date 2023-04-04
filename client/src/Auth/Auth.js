import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ifUserAuthorized } from "../Redux/actions";

const Auth = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {authenticated} = useSelector((state) => state);


  useEffect(() => {
    const verify = async () => {
      try {
        const {data} = await axios.get("/token");
        dispatch(ifUserAuthorized(true, data.accessToken));
      } catch (err) {
        dispatch(ifUserAuthorized(false));
        navigate("/login");
      }
    };
    verify();
  }, []);

  return (
    authenticated ? props.children : null
  );
};
export default Auth;
