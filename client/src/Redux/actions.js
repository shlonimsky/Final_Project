import axios from "axios";
import jwt_decode from "jwt-decode";

export const verifyTokenAfterRefresh = () => async (dispatch) => {
  try {
    const {data} = await axios.get("/token");
    const { email, userID } = jwt_decode(data.accessToken);
    const response = await axios.get(`/cabinet/${userID}`);
    dispatch({
      type: "IS_AUTH_AFTER_REFRESH",
      payload: true,
      token: data.accessToken,
      user: {...response.data,email, user_id:userID}

    });
  } catch (err) {
    dispatch({
      type: "IS_AUTH_AFTER_REFRESH",
      payload: false,
      token: null,
      user: {}
    });
  }
};


export const ifUserAuthorized = (bool, token=null) => {
  return {
    type: "IS_AUTH",
    payload: bool,
    token: token,
  };
};

// export const setToken = (token = "") => {
//   return {
//     type: "SET_TOKEN",
//     payload: token,
//   };
// };
// export const setUser = () => async (dispatch, getState) => {
//   console.log("IN ACTION SETUSER");
//   try {
//     const { email, userID } = jwt_decode(getState().token);
//     console.log(email,userID);
//     try {
//       const res = await axios.get(`/cabinet/${userID}`, {
//         headers: {
//           "x-access-token": getState().token,
//         },
//       });
//       return dispatch({
//         type: "SET_USER",
//         payload: { ...res.data, email },
//       });
//     } catch (err) {
//         console.log("error in axios",err);
//       return dispatch({
//         type: "SET_USER",
//         payload: { email, user_id: userID },
//       });
//     }
//   } catch (err) {
//     console.log("eror in decode",err);
//     return dispatch({
//       type: "SET_USER",
//       payload: {},
//     });
//   }
// };
export const setUserById = (id,email) => async (dispatch) => {
    try {
        const res = await axios.get(`/cabinet/${id}`)
        return dispatch({
            type: "SET_USER",
            payload: { ...res.data,email}
        })
    } catch (err) {
        return dispatch({
            type: "SET_USER",
            payload: { email, user_id:id }
        })
    }

}
// export const setMyInfo = (obj) => {
//   return {
//     type: "SET_MY_INFO",
//     payload: obj,
//   };
// };
