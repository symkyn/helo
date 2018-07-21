import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../redux/reducer';

function Nav(props) {
    console.log(props)
    return (
        <div>
            <img src={props.profile_pic} alt='error' />
            <Link to='/dashboard'><button>Home</button></Link>
            <Link to='/new'><button>New Post</button></Link>
            <Link to='/'><button>Logout</button></Link>
        </div>
    )
}

export default connect(state=>state, Actions)(Nav);