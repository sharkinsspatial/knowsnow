import React from 'react'
import classNames from 'classnames'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loading: false }
    }

    render() {
        let loginUrl = 'http://localhost:3000/auth/facebook'
        let btnClass = classNames({
            'fa': true,
            'fa-facebook': !this.state.loading,
            'fa-refresh': this.state.loading,
            'fa-spin': this.state.loading
        })
        return (
            <div className='text-center'>
                <a className='btn btn-lrg btn-social btn-facebook'
                    href={loginUrl} onClick={this.handleClick}>
                <i ref='btn' className={btnClass}></i>Login with Facebook</a>
            </div>
        )
    }
    handleClick = () => {
        this.setState({ loading: true })
    }
}

export default Login
