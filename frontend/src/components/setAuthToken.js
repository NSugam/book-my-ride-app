import axios from "axios";

const setAuthToken = (token)=> {
    if (token) {
        axios.defaults.headers = {
            Authentication: token
        }
    } else {
        delete axios.defaults.headers.Authentication;
    }
}

export default setAuthToken;