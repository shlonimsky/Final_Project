const initState = {
    authenticated : false,
    accessToken : JSON.parse(localStorage.getItem("token")) || null,
    user : []
}

export const reducer = (state = initState, action = {}) => {
    console.log("user in reducer",state.user)
    switch(action.type){
        case 'IS_AUTH' :    
        console.log(state)
        return{...state, authenticated : action.payload}
        case 'SET_USER' : 
        return { ...state, user : action.payload}
     
        default : return {...state}
    }
}

