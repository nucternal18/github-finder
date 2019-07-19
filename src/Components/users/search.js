import React, { Component } from 'react'
import PropTypes from 'prop-types'

class search extends Component {
    state = {
        text: '',
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('A name is required', 'light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {
        const { showClear, clearUsers } = this.props;

        return (
            <form onSubmit={this.onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={this.state.text}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"

                />
                {showClear && <button
                    className="btn btn-light btn-block"
                    onClick={clearUsers}
                >Clear</button>}
                
            </form>
        )
    }
}

export default search
