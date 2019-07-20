import React, { useState, useContext } from 'react';
import GithubContext from '../../Context/github/githubContext';
import AlertContext from '../../Context/Alert/AlertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext)

    const [text, setText] = useState('');

    const { setAlert } = alertContext;
    
    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            setAlert('A name is required', 'light')
        } else {
            githubContext.searchUsers(text)
            setText({ text: '' });
        }
    }

    const onChange = e => setText( e.target.value );

        return (
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"

                />
                {githubContext.users.length > 0 && (
                    <button
                        className="btn btn-light btn-block"
                        onClick={githubContext.clearUsers}
                    >
                        Clear
                    </button>
                )}
                
            </form>
        )
    
}


export default Search;
