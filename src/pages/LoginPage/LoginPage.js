import React,{Component} from 'react';
import axios from 'axios';
// import Auth from './Auth';

class Logins extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        };
        // this.Auth = new Auth();
        this.change =this.change.bind(this);
        this.submit =this.submit.bind(this);

    }
    change(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submit(e){
        e.preventDefault();
        
        const email = this.state.email
        const password = this.state.password

        this.setState({
            loading: true
        })
        const data = {
            email,
            password
        }
        axios.post('/rest-api-authentication-example/api/login',data
        // {
        //     email: this.state.email,
        //     password: this.state.password
        // }
        ).then(response =>{
            console.log(response);
            this.setState({
                loading: false,
                message: response.data
            })        
        })
        .catch(err => {
            console.log(err);
            this.setState({
                loading: false
            })
        })
        // .then(res=> localStorage.setItem('cool-jwt', res.data));
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.submit.bind(this)}>
                    <label>Email :</label><br/>
                    <input type="text"
                            name = "email"
                            onChange={e=> this.change(e)}
                            value ={this.state.email}
                    />
                    <label>Email :</label><br/>
                    <input type="password"
                            name = "password"
                            onChange={e=> this.change(e)}
                            value ={this.state.password}
                    />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}
export default Logins;