import React, { Component } from 'react'
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class User extends Component {

  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {

    const {
      name,
      avatar_url,
      location,
      company,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading } = this.props;

    if (loading) return <Spinner />
    return (
      <>
        <Link to='/' className='btn btn-light'>Back to Search</Link>
        Hireable: {' '}
        {hireable ? (
          <i className='fas fa-check text-success' />
          ) : (
            <i className='fas fa-times-circle text-danger' />
        )}

        <div className='card grid-2'>
          <div className='all-center'>
            <img 
              src={ avatar_url }
              className='round-img'
              alt=''
              style={{ width: '200px' }}
            />
            <h1>{name}</h1>
            <strong>Location: {location}</strong>
          </div>

          <div>

            { bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}
            <a href={ html_url } className='btn btn-dark my-1'>
              See Github Profile
            </a>

            <ul>
              <li>
                {login && (
                  <>
                    <strong>Username: </strong>{ login }
                  </>
                )}
              </li>

              <li>
                {company && (
                  <>
                    <strong>Company: </strong>{ company }
                  </>
                )}
              </li>

              <li>
                {blog && (
                  <>
                    <strong>Website: </strong>{ blog }
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className='card text-center'>
          <div className='badge badge-success'>Followers: {followers}</div>
          <div className='badge badge-light'>Following: {following}</div>
          <div className='badge badge-danger'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
      </>
    )
  }
}

export default User
