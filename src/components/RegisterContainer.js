import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import AuthenticationStore from '../stores/AuthenticationStore'
import Register from './Register'
import AuthenticationActions from '../actions/AuthenticationActions'

class RegisterContainer extends React.Component {
    render() {
        return (
            <AltContainer store={AuthenticationStore} actions={AuthenticationActions}>
                <Register/>
            </AltContainer>
        )
    }
}

export default RegisterContainer
