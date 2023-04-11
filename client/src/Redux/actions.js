import axios from "axios";
import jwt_decode from "jwt-decode";

export const getAllCategories = () => async (dispatch) => {
  try{
    const {data} = await axios.get('/categories')
    return(
      dispatch({
        type : "GET_ALL_CATEGORIES",
        payload: data
      })
    )
  } catch(err){
    dispatch({
      type : "GET_ALL_CATEGORIES",
      payload: null
    })
  }
}

export const getAllCities = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/cities')
    return(
      dispatch({
        type : "GET_ALL_CITIES",
        payload: data
      })
    )
  } catch (err) {
    dispatch({
      type : "GET_ALL_CITIES",
      payload: null
    })
  }
}

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


export const postNewUser = (user_id, email, obj) => async (dispatch,getState) => {
  try {
    // const {email,user_id} = getState().user
    const res = await axios.post(`/cabinet/${user_id}/set`,{...obj})
    return dispatch({
      type: "SET_USER",
      payload: { ...obj,email,user_id}
  })
  } catch (err) {
    console.log(err);
    return dispatch({
      type: "SET_USER",
      payload: { ...obj,email,user_id}
  })
  }
}

export const updateUserInfo = (user_id, email, obj) => async (dispatch,getState) => {
  try {
    // const {email,user_id} = getState().user
    const res = await axios.put(`/cabinet/${user_id}/set`,{...obj})
    return dispatch({
      type: "SET_USER",
      payload: { ...obj,email,user_id}
  })
  } catch (err) {
    console.log(err.data);
    return dispatch({
      type: "SET_USER",
      payload: { ...obj,email,user_id}
  })
}
}

export const getMyTasks = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/my_tasks/${id}`)
    if (res.status===204) dispatch({
        type : 'SET_TASKS',
        payload : null
      })
    else dispatch({
      type : 'SET_TASKS',
      payload : res.data
    })
  } catch (err) {
    console.log(err);
    return (
      dispatch({
        type : 'SET_TASKS',
        payload : null
      })
    )
  }
}

export const getMyJobs = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/my_jobs/${id}`)
    console.log(res);
    if (res.status===204) dispatch({
        type : 'SET_JOBS',
        payload : null
      })
    else dispatch({
      type : 'SET_JOBS',
      payload : res.data
    })
  } catch (err) {
      dispatch({
        type : 'SET_JOBS',
        payload : null
      })
  }
}

// export const saveTewTask = (obj) => async (dispatch,getState) => {
//   const tasks = getState().tasks || []
//   console.log("In action",tasks);
//   tasks.push(obj)
//   return ({
//       type : 'SET_NEW_TASK',
//       payload : tasks
//   })
  
// }