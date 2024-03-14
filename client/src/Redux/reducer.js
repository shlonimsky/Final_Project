const initState = {
    authenticated: false,
    // token: null,
    user: {},
    tasks : null,
    jobs : null,
    categories : null,
    allCities : null,
    notifications : 0,
    messages : 0
};

export const reducer = (state = initState, action = {}) => {
    console.log("state in reducer", state);
    switch (action.type) {
        case "GET_ALL_CATEGORIES" : return {...state, categories: action.payload};
        case "GET_ALL_CITIES" : return{...state, allCities: action.payload}
        case "IS_AUTH": return {...state, authenticated: action.payload, token: action.token};
        case "IS_AUTH_AFTER_REFRESH": return { ...state, token: action.token, user: action.user, authenticated: action.payload }
        case "SET_USER": return { ...state, user: action.payload };
        case "SET_TASKS" : return {...state, tasks: action.payload};
        case "SET_JOBS" : return {...state, jobs : action.payload};
        case "GET_NEW_NOTIFICATIONS" : return {...state, notifications: action.payload}
        case "GET_NEW_MESSAGES" : return {...state, messages: action.payload}

        default: return { ...state };
    }
};
