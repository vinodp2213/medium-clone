import React from 'react';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import logo from './medium.png'

import Home from './components/home/storyList'
import UserRegister from './components/users/register'
import UserLogin from './components/users/login'

import ListStories from './components/story/list'
import NewStory from './components/story/new'
import StoryShow from './components/story/show'
import StoryEdit from './components/story/edit'

import ListTopics from './components/topic/listTopics'
import NewTopics from './components/topic/newTopic'
import TopicShow from './components/topic/showTopic'
import EditTopic from './components/topic/topicEdit'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      isAuthenticated: !!localStorage.getItem('token')
    }
  }
  handleIsAuthenticated =(bool)=>{
    this.setState(() => ({
      isAuthenticated : bool
    }))
  }
  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand mr-auto" href="http://medium.com">
            <img src={logo} className="img-fluid" alt="logo"/>
            &nbsp;Medium Clone
          </a>
          <ul className="navbar-nav">
            <Link to='/' className='nav-links'>Home</Link>
          </ul>
              {
                this.state.isAuthenticated && (
                  <div>
                    <Link to='/stories' className='nav-links'>Story</Link>
                    <Link to='/topics' className='nav-links'>Topic</Link>
                    <Link to='/users/logout' className='nav-links'>Logout</Link>
                  </div>
                )
              }
              {
                !this.state.isAuthenticated && (
                  <div>
                    <Link to='/users/register' className='nav-links'>Register</Link>
                    <Link to='/users/login' className='nav-links'>Login</Link>
                  </div>
                )
              }
          
        </nav>
                
        <Switch>
          <Route path='/' component={Home} exact={true}></Route>
          <Route path='/users/register' component={UserRegister} exact={true}></Route>
          <Route path='/users/login' render={() => <UserLogin  handleIsAuthenticated={this.handleIsAuthenticated}/> }></Route> 
          <Route path='/users/logout' component={(props) => { 
            localStorage.clear()
            axios.defaults.headers['x-auth'] = null
                  return (
                    <div>
                      <p> You have successfully logged out</p>
                    </div>
                  )
                  }}></Route>
          <Route path='/stories' component={ListStories} exact= {true}></Route>
          <Route path='/stories/new' component = { NewStory } exact={true}></Route>
          <Route path='/stories/:id' component = {StoryShow} exact = {true}></Route>
          <Route path='/stories/edit/:id' component = {StoryEdit} exact = {true}></Route>

          <Route path="/topics" component={ListTopics} exact = {true}></Route>
          <Route path="/topics/new" component={NewTopics} exact = {true}></Route>
          <Route path="/topics/:id" component={TopicShow} exact = {true}></Route>
          <Route path="/topics/edit/:id" component={EditTopic} exact = {true}></Route>
        </Switch>
        
      </BrowserRouter>
    );
  }
}

export default App;
