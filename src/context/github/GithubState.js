import { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
  SET_LOADING,
} from '../types';


const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (text) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/search/users?q=${text}&client_id=${client_id}&client_secret=${client_secret}`

    setLoading();
    const res = await axios.get(url);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  const getUser = async (username) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${client_secret}`

    setLoading();
    const res = await axios.get(url);
    
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  }

  const getUserRepos = async (username) => {
    const client_id = process.env.REACT_APP_GH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GH_CLIENT_SECRET;
    const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${client_secret}`

    setLoading()
    const res = await axios.get(url);
    
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  }

  const clearUsers = () => dispatch({ type: CLEAR_USERS })
  const setLoading = () => dispatch({ type: SET_LOADING })

  return(
    <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      alert:state.alert,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos,
    }}>

      {props.children}

    </GithubContext.Provider>
  )
}

export default GithubState;