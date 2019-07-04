import * as Types from './../constants/ActionType';
import callApi from './../utils/apiCaller';
import Axios from 'axios';

//gọi lên server lấy dl về
//action lấy dữ liệu gọi api lưu vào store
export const actFetchProductsRequest =()=>{
    return(dispatch) => {
        return callApi('products','GET', null).then(res =>{
            dispatch(actFetchProducts(res.data))
        });
    };
}
export const actFetchProducts = (products) => {
    return {
        type : Types.FETCH_PRODUCTS,
        products
    }
}
//gọi API
export const actDeleteProductRequest = (id) =>{//xử lý trên server
    return (dispatch) => {
        return callApi(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteProduct(id)); //xử lý trên store
        })
    }
}
export const actDeleteProduct = (id) => {
    return {
        type : Types.DELETE_PRODUCT,
        id
    }
}


export const actAddProductRequest = (products) =>{
    return dispatch =>{
        return callApi('products','POST', products).then(res =>{ //gọi api > nhận dc respon
            dispatch(actAddProduct(res.data)) //server trả về thêm thành công và dc cấp d mới
        });
    }
}
export const actAddProduct = (products) =>{
    return {
        type : Types.ADD_PRODUCT,
        products
    }
}

export const actGetProductRequest = (id) =>{
    return dispatch =>{
        return callApi(`products/${id}`,'GET', null).then(res =>{ //gọi api > nhận dc respon
            dispatch(actGetProduct(res.data)); //server trả về thêm thành công và dc cấp d mới
        });
    }
}
export const actGetProduct = (product) =>{ //trên store
    return {
        type : Types.EDIT_PRODUCT,
        product
    }
}

export const actUpdateProductRequest = (product) =>{
    return dispatch =>{
        return callApi (`products/${product.id}`,'PUT',product).then(res =>{
            dispatch(actUpdateProduct(res.data));
        });
    }  
}
export const actUpdateProduct = (product)=>{
    return {
        type : Types.UPDATE_PRODUCT,
        product
    }
}
export const userPostFetch = user => {
    return dispatch => {
      return fetch("http://localhost:8080/rest-api-authentication-example/api/create_user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }
   
  const loginUser = userObj => ({
      type: Types.LOGIN_USER,
      payload: userObj
  })
 
  export const userLoginFetch = user => {
    return dispatch => {
      return   Axios.post('/rest-api-authentication-example/api/login',{
          'email': this.state.email,
          'password': this.state.password
      })
      .then(response =>{
          console.log(response);
          this.setState({
              loggedIn: true,
              message: response.data.jwt
          })
          localStorage.getItem(localStorage.setItem("token", response.data.jwt))  
          console.log(localStorage.token);
          console.log(this.state);
          dispatch(loginUser(response.data.config.data))

          
  
      })
      .catch(err => {
          console.log(err);
          var {loggedIn} = this.state
          this.setState({
  
              loggedIn: !loggedIn
          })
      })
    }
  }
 
// export const userLoginFetch = user => {
//   return dispatch => {
//     return fetch("http://localhost:8080//rest-api-authentication-example/api/login", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({user})
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         if (data.message) {
//         } else {
//           localStorage.setItem("token", data.jwt)
//           dispatch(loginUser(data.user))
//         }
//       })
//   }
// }
export const getProfileFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return fetch("http://localhost:8080/rest-api-authentication-example/api/validate_token", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {
              localStorage.removeItem("token")
            } else {
              dispatch(loginUser(data.user))
            }
          })
      }
    }
  }