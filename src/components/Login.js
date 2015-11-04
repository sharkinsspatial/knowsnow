import React from 'react'

class Login extends React.Component {
    render() {
        let loginUrl = 'http://localhost:3000/auth/facebook'
        return (
            <div className="login">
                <a className='btn btn-lrg btn-social btn-google' href={loginUrl}>
                <i className='fa fa-google'></i>Login With Google</a>
            </div>
        )
    }
}

export default Login
