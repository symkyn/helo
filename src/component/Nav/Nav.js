import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Actions from '../../redux/reducer';

class Nav extends Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        axios.get('/api/auth/me')
        .then(results => {
            this.props.updateCurrentUser(results.data.id, results.data.username, results.data.password, results.data.prfile_pic)
        })
        .catch(err => console.warn(err))
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <img src={this.props.profile_pic} alt='error' />
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/new'><button>New Post</button></Link>
                <Link to='/'><button onClick={() => this.logout()}>Logout</button></Link>
            </div>
    )}

    logout() {
        
        axios.post('/api/auth/logout')
            
    }
}

export default connect(state=>state, Actions)(Nav);