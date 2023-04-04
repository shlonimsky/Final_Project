const initState = {
    authenticated: false,
    token: null,
    user: {},
};

export const reducer = (state = initState, action = {}) => {
    console.log("state in reducer", state);
    switch (action.type) {
        case "IS_AUTH": return {...state, authenticated: action.payload, token: action.token};
        case "IS_AUTH_AFTER_REFRESH": return { ...state, token: action.token, user: action.user, authenticated: action.payload }
        case "SET_USER": return { ...state, user: action.payload };
        default: return { ...state };
    }
};
