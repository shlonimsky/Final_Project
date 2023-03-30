import axios from 'axios';

export const ifUserAuthorized = async () => {
    try {
        const response = await axios.get('/token');
        console.log("response.data",response.data);
        console.log(response)
    } catch (err) {
        console.log("error.msg",err.response.data.msg)
        console.log(err)
    }
}