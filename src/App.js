import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }
  async componentDidMount() {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/users?client_id=${client_id}&client_secret=${client_secret}`

    this.setState({ loading: true })
    const res = await axios.get(url);
    
    this.setState({users: res.data, loading: false });
  }
  
  searUsers = async (text) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/search/users?q=${text}&client_id=${client_id}&client_secret=${client_secret}`

    this.setState({ loading: true })
    const res = await axios.get(url);
    
    this.setState({users: res.data.items, loading: false });
  }

  getUser = async (username) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${client_secret}`

    this.setState({ loading: true })
    const res = await axios.get(url);
    
    this.setState({user: res.data, loading: false });
  }

  clearUsers = () => this.setState({users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type }})

    setTimeout(() => this.setState({ alert: null }), 2000);
  }
  
  render() {
    const { users, user, loading } = this.state;
      return (
        <Router>
          <div className="App">
            <Navbar />
            <div className = "container">
              <Alert alert={this.state.alert} />

              <Switch>
                <Route 
                  exact 
                  path = '/' 
                  render={props => (
                    <>
                      <Search 
                        searchUsers = { this.searUsers } 
                        clearUsers = {this.clearUsers}
                        showClear = { users.length >0 ? true : false }
                        setAlert = {this.setAlert}
                      />
                      <Users loading = { loading } users = { users } />
                    </>
                  )} 
                />
                <Route exact path='/about' component={About} />
                <Route exact path='/users/:login' render={ props => (
                  <User 
                    { ...props } 
                    getUser={this.getUser} 
                    user={user}
                    loading={loading}
                  />
                )} />
                
              </Switch>
                  
              
            </div>
            
          </div>
        </Router>
    );
  }
  
}

export default App;
