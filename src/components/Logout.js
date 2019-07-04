import React, {Component} from 'react';
// import Axios from 'axios';
import {Link} from 'react-router-dom';


class Logout extends Component{
  constructor(props){
    super(props)
    localStorage.removeItem("token")
  }
  render(){
 
    return (
        <div className="container" >
            <h1> Bạn đã đăng xuất</h1>
            <Link to="/login" > Đăng nhập lại</Link>
        </div>
    );
  }
} 

export default Logout;
