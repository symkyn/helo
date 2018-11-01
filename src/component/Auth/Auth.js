import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Button from '../Button/Button';
import * as Actions from '../../redux/reducer';

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
                <Button onClick={(e)=>this.login(e)}>login</Button>
                <Button onClick={(e)=>this.register(e)}>register</Button>
            </div>
        );
    }
    register(e) {
        e.preventDefault();
        let newUser=this.state;
        axios.post('/api/newUser', newUser)
            .then(results => {
                this.props.updateCurrentUser(results.data.id, results.data.username, results.data.password, results.data.prfile_pic)
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
                this.props.updateCurrentUser(results.data.id, results.data.username, results.data.password, results.data.prfile_pic)
                this.props.history.push('/dashboard');
            })
            .catch(err => console.warn(err))
    }
}


export default connect(state=>state, Actions)(Auth);