import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import axios from '../../../src/axios';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import FullPost from './FullPost/FullPost';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        console.log(this.props);
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={
                                    {
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }
                                }>Home
                            </NavLink></li>
                            <li><NavLink to={{
                                // pathname: `${this.props.match.url}/new-post`,
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>  
                        </ul>
                    </nav>
                </header>
                
                <Switch>
                    {/* { this.state.auth ? <Route path="/new-post" component={NewPost}/> : null } */}
                    { this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null }
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>route not found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts}/> */}
                </Switch>
                {/* <Route path="/" exact render={() => <h1>Home sweet home!</h1>}/> */}
                {/* <Route path="/" render={() => <h1>Home sweet home...2!</h1>}/> */}
            </div>
        );
    }
}

export default Blog;