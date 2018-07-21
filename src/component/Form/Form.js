import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends Component {
    constructor(props){
        super(props)

        this.state={
            title: '',
            image: '',
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
                Image: <input type='text' name='image' value={this.state.image} onChange={(e) => this.handleChange(e)} />
                <br />
                Content: <input type='text' name='content' value={this.state.content} onChange={(e) => this.handleChange(e)} />
                <br />
                Image Preview: <img src={this.state.image} alt='broken pic' />
                <br />
                <button onClick={this.submitPost}>submit</button>
            </div>
        )
    }

    submitPost(){
        const newPost= {...this.state, auth_id: this.props.id};
        console.log(newPost)
    }
}

export default connect(state=>state)(Form);