import React from 'react';
import UserItem from './UserItems';
import Spinner from '../Layout/Spinner/Spinner';
import PropTypes from 'prop-types';

const Users = props => {

    if(props.loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {props.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }

        
        
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
