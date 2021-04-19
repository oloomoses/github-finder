import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import './App.css';
import AlertState from './context/alert/alertState';

const App = () => {
  // useEffect(() => {

  //   (async () => {
  //     const client_id = process.env.REACT_APP_GH_CLIENT_ID;
  //     const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
  //     const url = `https://api.github.com/users?client_id=${client_id}&client_secret=${client_secret}`

  //     setLoading(true);
  //     const res = await axios.get(url);
      
  //     setUsers(res.data);
  //     setLoading(false);
  //   })();
    
  //   //eslint-disable-next-line
  // }, []); 

  return (
    <GithubState>
      <AlertState>
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
                      <Search />
                      <Users />
                    </>
                  )} 
                />
                <Route exact path='/about' component={About} />
                <Route exact path='/users/:login' component={User} />
                
              </Switch>
                  
              
            </div>
            
          </div>
        </Router>
      </AlertState>
    </GithubState>
);
  
  
}

export default App;
