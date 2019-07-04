import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Alert } from 'reactstrap';
// import setAuthToken from './setAuthToken';

class Logins extends Component{
    constructor(props){
        super(props);

        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
          loggedIn = false
        }
        this.state= {
            email: '',
            password: '',
            loggedIn 
        };
        this.change =this.change.bind(this);
        this.submit =this.submit.bind(this);

    }

    change(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submit(e){
        // data
        e.preventDefault();//Chặn việc submit load trang
        
        axios.post('/rest-api-authentication-example/api/login',{
            'email': this.state.email,
            'password': this.state.password
        })
        .then(response =>{
            // console.log(response);
            this.setState({
                loggedIn: true,
                message: response.data.jwt
            })
            const token = response.data.jwt;
            localStorage.getItem(localStorage.setItem("token", token))  
            // console.log(localStorage.token);
            // setAuthToken(token);
            // console.log(setAuthToken);
            
            this.props.history.push("/");
        })
        .catch(err => {
            console.log(err);
            var {loggedIn} = this.state
            this.setState({

                loggedIn: !loggedIn
            })
        })
    }
    render(){
        var {email , password, loggedIn } = this.state;
        
        if(loggedIn === true ){ 
            return <Redirect to={"/"} />
          }
        //   else{
        //     // console.log(this.state);
        //     // alert('Thông tin đăng nhập sai vui lòng nhập lại!')
        // }         
        return(
            <div>
            {
                this.state.message !== ''? (
                <Alert color="danger">{this.state.message}</Alert>
                     ) : ''
            }
                <form onSubmit={this.submit}>
                    <label>Email :</label><br/>
                    <input type="text"
                            name = "email"
                            onChange={e=> this.change(e)}
                            value ={email}
                    /><br/>
                    <label>Password :</label><br/>
                    <input type="password"
                            name = "password"
                            onChange={e=> this.change(e)}
                            value ={password}
                    /><br/>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}
export default Logins;