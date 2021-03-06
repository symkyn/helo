import React, { Component } from 'react';
import axios from 'axios';

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
                    <a href={`#/post/${p.post_id}`} key={`post${i}`}>
                    <div>
                        <h2>{p.title}</h2>
                        by: <h4>{p.username}</h4>
                        <img src={p.prfile_pic} alt='no-profile-pic' />
                        <br />
                    </div>
                    </a>
                )
            })
        return(
            <div>
                <div className='searchBox'>
                    <input type='text' 
                            value = {this.state.searchTerm}
                            placeholder='Search by Title' 
                            onChange={this.updateSearch} />
                    <button onClick={(e) => this.searchPosts(e)}>search</button>
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

    searchPosts(e) {
        e.preventDefault();
        axios.get(`/api/posts/?search=${this.state.searchTerm}&includesSelf=${this.state.includeSelf}`)
            .then(results => {
                this.setState({
                posts: results.data
                })
            })
            .catch(err => console.warn(err))
    }
}

export default Dashboard;