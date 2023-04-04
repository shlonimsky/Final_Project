import axios from "axios"
import { useDispatch } from "react-redux"
import { setMyInfo } from "../Redux/actions"

export const GetMyInfo = async (id, email) => {
    const dispatch = useDispatch()
    try {
        const {data} = await axios.get(`/cabinet/${id}`)
        console.log("data in helper getMyInfo", data)
       dispatch(setMyInfo(data))
        
    } catch (err) {
        console.log(err)
    }
};