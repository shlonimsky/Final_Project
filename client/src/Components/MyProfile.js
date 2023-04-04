import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';


const MyProfile = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    
    return(
        <div>My Profile</div>
    )
}

export default MyProfile