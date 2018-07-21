import React, { Component } from 'react';
import axios from 'axios';

class Auth extends Component {
    constructor(props){
        super(props)

        this.state={
            username: '',
            password: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.register=this.register.bind(this);
        this.login=this.login.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div className='authorization'>
                Username:<input name='username' type='text' onChange={(e) => this.handleChange(e)} />
                <br />
                Password: <input name='password' type='password' onChange={(e) =>this.handleChange(e)} />
                <br />
                <button onClick={(e)=>this.login(e)}>login</button>
                <button onClick={(e)=>this.register(e)}>register</button>
            </div>
        );
    }
    register(e) {
        e.preventDefault();
        let newUser=this.state;
        axios.post('/api/newUser', newUser)
            .then(results => {
                this.props.history.push('/dashboard');
            })
            .catch(err => console.warn(err))
    }
    
    login(e) {
        e.preventDefault();
        let user = this.state;
        axios.post('/api/login', user)
            .then(results => {
                console.log(results)
                this.props.history.push('/dashboard');
            })
            .catch(err => console.warn(err))
    }
}


export default Auth;