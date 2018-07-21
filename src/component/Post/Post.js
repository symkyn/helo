import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    constructor(props){
        super(props)

        this.state={
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    componentWillMount(){
        axios.get(`/api/post/${this.props.match.params.postid}`)
            .then(results =>
                this.setState({
                    title: results.data.title,
                    img: results.data.img,
                    content: results.data.content,
                    username: results.data.username,
                    profile_pic: results.data.prfile_pic
            }))
            .catch(err => console.warn(err))
    }

    render(){
        return(
            <div>
                <h1>{this.state.title}</h1>
                <img src={this.state.img} alt='broken pic' />
                {this.state.content}
                <span className='authorInfo'>
                {this.state.username}
                <img src={this.state.profile_pic} alt='broken pic' />
                </span>
            </div>
        )
    }
}

export default Post;