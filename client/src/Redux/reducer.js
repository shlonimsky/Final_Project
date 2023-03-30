const initState = {
    authenticated : false,
    accessToken : JSON.parse(localStorage.getItem("token")) || "",
    user : []
}

export const reducer = (state = initState, action = {}) => {
    return {...state}
}