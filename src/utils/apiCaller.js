import axios from 'axios';
import * as Config from './../constants/Config';


export default function callApi(endpoint, method = 'GET', body){ //tạo function callApi
    return axios({ 
        method : method,
        url : `${Config.API_URL}/${endpoint}`,//gọi config/endpoint
        data: body
    }).catch(err =>{
        console.log(err);
    });
};
