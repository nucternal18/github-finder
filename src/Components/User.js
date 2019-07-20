import React, { useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Layout/Spinner/Spinner';
import Repos from './Repos/Repos';
import GithubContext from '../Context/github/githubContext';



const User = ({  match }) => {
    const githubContext = useContext(GithubContext)

    const { user, loading, getUser, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line 
    }, []);
    
    
        const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = user;

        if (loading) {
            return <Spinner />
        } else {
            return (
                <Fragment>
                    <Link to='/' className="btn btn-light" >
                        Back To Search
                    </Link>
                    Hireable: {' '}
                    {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
                    <div className="card grid-2">
                        <div className="all-center">
                            <img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
                            <h1>{name}</h1>
                            <p>Location: {location}</p>
                        </div>
                        <div>
                            {bio && (
                                <Fragment >
                                    <h3>Bio</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            )}
                            <a href={html_url} className="btn btn-dark my-1">Visit GitHub Profile</a>
                            <ul>
                                <li>
                                    {login && (
                                        <Fragment>
                                            <strong>Username: </strong> {login}
                                        </Fragment>
                                    )}
                                </li>
                                <li>
                                    {company && (
                                        <Fragment>
                                            <strong>Company: </strong> {company}
                                        </Fragment>
                                    )}
                                </li>
                                <li>
                                    {blog && (
                                        <Fragment>
                                            <strong>Website: </strong> {blog}
                                        </Fragment>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="badge badge-primary">Followers: {followers}</div>
                        <div className="badge badge-success">Following: {following}</div>
                        <div className="badge badge-light">Public Repos: {public_repos}</div>
                        <div className="badge badge-dark">Public Gist: {public_gists}</div>
                    </div>
                    <Repos repos={repos}/>
                </Fragment>
            )
        }
        
    
}


export default User
