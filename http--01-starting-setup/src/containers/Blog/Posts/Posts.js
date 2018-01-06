import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../../src/axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css'; // we are not using css modules in this project

class Posts extends Component {
  state = {
    posts: []
  }
  postSelectedHandler = id => {
    this.props.history.push({
      pathname: `/${id}`
    })
    // this.props.history.push(`/${id}`)
  }
  componentDidMount() {
    console.log(this.props);
    // async
    axios.get('/posts')
         .then(response => {
            console.log(response);
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max',
                }
            })
            this.setState({posts: updatedPosts})
         })
         .catch(error => {
             console.log(`[Blog.js] ${error}`);
            // this.setState({error: true});
         });
  }
  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong !</p>;
    if(!this.state.error) {
        posts = this.state.posts.map(post => {
            return (
            // <Link to={`/${post.id}`} >
              <Post
                  key={post.id}
                  title={post.title}
                  author={post.author}
                  clicked={() => { this.postSelectedHandler(post.id)}}
              />
            // </Link>
          )
        });
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path="/:id" component={FullPost}/>
      </div>
    )
  }
}

export default Posts;