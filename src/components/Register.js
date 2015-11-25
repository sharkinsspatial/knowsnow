import React from 'react'
import classNames from 'classnames'
import Input from 'react-bootstrap/lib/Input'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'
import Well from 'react-bootstrap/lib/Well'
import Collapse from 'react-bootstrap/lib/Collapse'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: false, disabled: 'disabled'}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.registered) {
            this.setState({ loading: false })
        }
    }

    render() {
        let btnClass = classNames({
            'fa': true,
            'fa-refresh': this.state.loading,
            'fa-spin': this.state.loading,
        })
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })
        return (
            <div>
                <div className={textClass}>
                    <div>Register For A New Know Snow Account</div>
                </div>
                <Input type='text' label='Email' ref='email'
                    onChange={this.handleChange}/>
                <Input type='text' label='First Name' ref='firstName'
                    onChange={this.handleChange}/>
                <Input type='text' label='Last Name' ref='lastName'
                    onChange={this.handleChange}/>
                <Input type='text' label='Password' ref='password'
                    onChange={this.handleChange}/>
                <div className='text-center headingPadding'>
                    <a className='btn btn-default' onClick={this.handleClick}
                        disabled={this.state.disabled}>
                    <i className={btnClass}></i> Register</a>
                </div>
                <Collapse in={this.props.registered}>
                    <Well>
                        You will receive a verification email shortly.
                        Please follow the instructions to complete your registration.
                    </Well>
                </Collapse>
                <Collapse in={this.props.registrationError}>
                    <Well>
                    {this.props.registrationErrorMessage}
                    </Well>
                </Collapse>
            </div>
        )
    }

    serializeForm = () => {
        let literal = {}
        literal.email = this.refs.email.getValue()
        literal.password = this.refs.password.getValue()
        literal.username = this.refs.firstName.getValue() + ' ' +
            this.refs.lastName.getValue()
        return literal
    }

    handleClick = () => {
        this.setState({ loading: true })
        let registration = this.serializeForm()
        this.props.sendRegistration(registration)
    }

    handleChange = () => {
        let disabled = ''
        for (var key of Object.keys(this.refs)) {
            if (this.refs[key].getValue().length == 0) {
                disabled = 'disabled'
            }
        }
        this.setState({ disabled: disabled })
    }
}

export default Register
