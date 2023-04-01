const initState = {
    authenticated : false,
    accessToken : JSON.parse(localStorage.getItem("token")) || "",
    user : []
}

export const reducer = (state = initState, action = {}) => {
    console.log("token in reducer",state)
    switch(action.type){
        case 'IS_AUTH' : 
        console.log(state)
        return{...state, authenticated : action.payload}
        default : return {...state}
    }
}