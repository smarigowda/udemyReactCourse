import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import axios from '../../../src/axios';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    render () {
        console.log(this.props);
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
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
                <Route path="/" exact component={Posts}/>
                <Switch>
                    <Route path="/new-post" component={NewPost}/>
                    <Route path="/:id" component={FullPost}/>
                </Switch>
                {/* <Route path="/" exact render={() => <h1>Home sweet home!</h1>}/> */}
                {/* <Route path="/" render={() => <h1>Home sweet home...2!</h1>}/> */}
                {/* <Posts /> */}
                {/* <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;