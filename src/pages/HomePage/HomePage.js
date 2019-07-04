import React, {Component} from 'react';
// import Axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
import Axios from 'axios';


class HomePage extends Component{
  constructor(props){
    super(props)
    const token = localStorage.getItem("token")
    let loggedIn =true
    if(token == null){
      loggedIn = false
    }
    this.state = {
      token : localStorage.getItem("token"),
      loggedIn
    }
  }
  componentDidMount(){
    const token = localStorage.getItem("token");
    Axios.post('rest-api-authentication-example/api/validate_token',{"jwt":token}, {
    headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
        }} )

    .then(response =>
    {
      this.setState({
        token: response.data.JwtSV,
    })
     console.log(this.state.token);
      // console.log(response.data.message);
      // console.log(response.data.JwtSV);
      // console.log(response);
    return response;    
    })
    .catch(error => {
    if (error) {
        console.log("Sorry.....Error");  }
        });
        // console.log(token);
        // console.log(this.state.token);
  
  console.log(this.state.token);
 
  }
  componentDidUpdate(){
      console.log(this.state.token);
      if(localStorage.getItem("token") !== this.state.token){
        localStorage.removeItem("token")
        this.setState({
          loggedIn: false
         });
        }

  }

  render(){
    if(this.state.loggedIn === false){
      return <Redirect to = "/login" />
    }
    return (
        <div className="container" >
            <h1> Trang chủ</h1>
            <Link to="/logout" > Đăng xuất</Link>
        </div>
    );
  }
} 

export default HomePage;
