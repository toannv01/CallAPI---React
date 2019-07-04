export function PostData(userData) {
    // let BaseURL = 'localhost:8080/rest-api-authentication-example/api/login';
    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
    return new Promise((resolve, reject) =>{
    fetch('http://localhost:8080/rest-api-authentication-example/api/login',{
        method: 'POST',
        headers:{
            "Accept":"aplication/json",
            "Content" : "aplication/json"
        },
        body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        });
    });
   }