import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props){
        super(props)

        this.state={
            title: '',
            img: '',
            content: ''
        }
        this.submitPost=this.submitPost.bind(this);
    }

    handleChange(e) {
        e.preventDefault();

        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                Title: <input type='text' name='title' value={this.state.title} onChange={(e) => this.handleChange(e)} />
                <br />
                Image: <input type='text' name='img' value={this.state.img} onChange={(e) => this.handleChange(e)} />
                <br />
                Content: <input type='text' name='content' value={this.state.content} onChange={(e) => this.handleChange(e)} />
                <br />
                Image Preview: <img src={this.state.img} alt='broken pic' />
                <br />
                <button onClick={this.submitPost}>submit</button>
            </div>
        )
    }

    submitPost(){
        const newPost= {...this.state};
        axios.post(`/api/post/`, newPost)
            .then(this.props.history.push('/dashboard'))
            .catch(err => console.warn(err))
    }
}

export default Form;