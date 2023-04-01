import axios from "axios";

export const verifyToken =  () => async (dispatch) => {
console.log('in action')
    try {
        const res = await axios.get('/token');
        return(
            dispatch({
                type : 'IS_AUTH',
                payload : true
            })
        )
        console.log("in action res",res)
    } catch (err) {
        console.log("err in action",err)
        return(
            dispatch({
                type : 'IS_AUTH',
                payload : false
            })
        )
    }
}