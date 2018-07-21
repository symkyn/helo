import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state={
            searchTerm: '',
            includeSelf: true,
            posts: []
        }

        this.updateSearch=this.updateSearch.bind(this);
        this.checkBox=this.checkBox.bind(this);
        this.clearSearch=this.clearSearch.bind(this);
        this.searchPosts=this.searchPosts.bind(this);
    }

    render(){
        const post = this.state.posts.map((p, i) =>
            {
                return(
                    <div key={`post${i}`}>
                        <h2>{p.title}</h2>
                        by: <h4>{p.username}</h4>
                        <img src={p.prfile_pic} alt='no-profile-pic' />
                        <br />
                    </div>
                )
            })
        return(
            <div>
                <div className='searchBox'>
                    <input type='text' 
                            value = {this.state.searchTerm}
                            placeholder='Search by Title' 
                            onChange={this.updateSearch} />
                    <button onClick={this.searchPosts}>search</button>
                    <button onClick={this.clearSearch}>Reset</button>
                    My Posts: <input type='checkbox' onChange={this.checkBox} checked={this.state.includeSelf} />
                </div>
                <div className='postResults'>
                    {post}
                </div>
            </div>
        )
    }

    updateSearch(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    checkBox(e) {
        this.setState({
            includeSelf: e.target.checked
        });
    }

    clearSearch() {
        this.setState({
            searchTerm: '',
            includeSelf: true
        })
    }

    searchPosts() {
        axios.get(`/api/posts/${this.props.id}?search=${this.state.searchTerm}&includesSelf=${this.state.includeSelf}`)
            .then(results => {
                this.setState({
                posts: results.data
                })
            })
            .catch(console.log('failed'))
    }
}

export default connect(state=>state)(Dashboard);