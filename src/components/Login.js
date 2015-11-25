import React from 'react'
import classNames from 'classnames'
import Input from 'react-bootstrap/lib/Input'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'
import { Router, Route, Link } from 'react-router'
import Collapse from 'react-bootstrap/lib/Collapse'
import Alert from 'react-bootstrap/lib/Alert'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { facebookLoading: false, loginLoading: false }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            setTimeout(() => {
                this.props.history.pushState(null, '/create', null)
            }, 0)
        }
        if (nextProps.loginError) {
            this.setState({ loginLoading: false })
        }
    }

    render() {
        let loginUrl = 'apiUrl' + 'auth/facebook'
        let btnClass = classNames({
            'fa': true,
            'fa-facebook': !this.state.facebookLoading,
            'fa-refresh': this.state.facebookLoading,
            'fa-spin': this.state.facebookLoading
        })
        let loginBtnClass = classNames({
            'fa': true,
            'fa-refresh': this.state.loginLoading,
            'fa-spin': this.state.loginLoading,
        })
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })

        return (
            <div>
            <div className='text-center'>
                <a className='btn btn-lrg btn-social btn-facebook'
                    href={loginUrl} onClick={this.handleFacebookClick}>
                <i ref='btn' className={btnClass}></i>Login with Facebook</a>
            </div>
            <div>
            </div>
                <div className={textClass}>
                <div>Don't use Facebook ?</div>
                <div>Login with your Know Snow account</div>
                </div>
                <Input type='text' label='Email' ref='loginEmail'/>
                <Input type='text' label='Password' ref='loginPassword'/>
                <div className='text-center'>
                    <a className='btn btn-default'
                        onClick={this.handleLoginClick}>
                    <i ref='btn' className={loginBtnClass}></i> Login</a>
                </div>
                <div className={textClass}>Or register for a new Know Snow account</div>
                <div className='text-center'>
                    <Link to={'/register'}>Register Here</Link>
                </div>
                <Collapse in={this.props.loginError}>
                    <Alert bsStyle='danger'>
                        <h5>{this.props.loginErrorMessage}</h5>
                    </Alert>
                </Collapse>
            </div>
        )
    }

    handleFacebookClick = () => {
        this.setState({ facebookLoading: true })
    }

    handleLoginClick = () => {
        this.setState({ loginLoading: true })
        let credentials = { 'email': this.refs.loginEmail.getValue(),
                'password': this.refs.loginPassword.getValue() }
        this.props.fetchToken(credentials)
    }
}

export default Login
