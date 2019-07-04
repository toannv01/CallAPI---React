import Axios from "axios";

export function login(data){
    return dispatch =>{
        return Axios.post('/rest-api-authentication-example/api/login',data);
    }
}