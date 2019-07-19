import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './Components/Layout/Navbar';
import axios from 'axios';
import Users from './Components/users/Users';
import Search from './Components/users/search';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
import User from './Components/User';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  //Search GitHub Users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
    this.setState({ users: res.data.items, loading: false });
  }

  // Get single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
    this.setState({ user: res.data, loading: false });
  }

  // Get User Repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=5&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
    this.setState({ repos: res.data, loading: false });
  }

  //Clear Users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set alert message if no user is entered
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 1000);
  }
  
  render() {
    const { users, user, loading, alert, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={loading}
                      users={users} /> 
                  </Fragment>
                )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={this.getUserRepos}
                  repos={repos}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
