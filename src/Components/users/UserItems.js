import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItems = props => {
    
        const { avatar_url, login } = props.user
        return (
            <div className="card text-center">
                <img
                    src={avatar_url}
                    alt="" className="round-img"
                    style={{ width: '60px' }}
                />
                <h3>{login}</h3>
                <div>
                    <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
                        more
                    </Link>
                </div>
            </div>
        )
}

UserItems.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItems;
