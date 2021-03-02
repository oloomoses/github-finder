import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {

    (async () => {
      const client_id = process.env.REACT_APP_GH_CLIENT_ID;
      const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
      const url = `https://api.github.com/users?client_id=${client_id}&client_secret=${client_secret}`

      setLoading(true);
      const res = await axios.get(url);
      
      setUsers(res.data);
      setLoading(false);
    })();
    
    //eslint-disable-next-line
  }, []);
  
  const searUsers = async (text) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/search/users?q=${text}&client_id=${client_id}&client_secret=${client_secret}`

    setLoading(true);
    const res = await axios.get(url);
    
    setUsers(res.data.items);
    setLoading(false);
  }

  const getUser = async (username) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${client_secret}`

    setLoading(true);
    const res = await axios.get(url);
    
    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${client_secret}`

    setLoading(true)
    const res = await axios.get(url);
    
    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })

    setTimeout(() => setAlert(null), 2000);
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className = "container">
          <Alert alert={ alert } />

          <Switch>
            <Route 
              exact 
              path = '/' 
              render={props => (
                <>
                  <Search 
                    searchUsers = { searUsers } 
                    clearUsers = { clearUsers }
                    showClear = { users.length >0 ? true : false }
                    setAlert = { showAlert }
                  />
                  <Users loading = { loading } users = { users } />
                </>
              )} 
            />
            <Route exact path='/about' component={About} />
            <Route exact path='/users/:login' render={ props => (
              <User 
                { ...props } 
                getUser={ getUser }
                getUserRepos = { getUserRepos }
                repos = { repos }
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

export default App;
