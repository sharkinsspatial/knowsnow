import alt from '../alt'
import AuthenticationSource from '../sources/AuthenticationSource'
import AuthenticationActions from '../actions/AuthenticationActions'

class AuthenticationStore {
    constructor() {
        this.state = {}
        this.registerAsync(AuthenticationSource)
        this.bindAction(AuthenticationActions.login, this.onLogin)
        this.bindAction(AuthenticationActions.fetchToken, this.onFetchToken)
        this.bindAction(AuthenticationActions.updateUser, this.onUpdateUser)
        this.bindAction(AuthenticationActions.updateToken, this.onUpdateToken)
        this.bindAction(AuthenticationActions.sendRegistration, this.onSendRegistration)
        this.bindAction(AuthenticationActions.register, this.onRegister)
        this.bindAction(AuthenticationActions.registrationFailed, this.onRegistrationFailed)
        this.bindAction(AuthenticationActions.tokenFailed, this.onLoginFailed)
        this.bindAction(AuthenticationActions.userFailed, this.onLoginFailed)

        this.exportPublicMethods({
            isLoggedIn: this.isLoggedIn
        })
    }

    onUpdateUser(response) {
        this.setState({ user: response.data, loginError: false,
            loginErrorMessage: null})
    }

    onUpdateToken(response) {
        this.setState({ token: response.data.id, userId: response.data.userId })
        this.getInstance().fetchUser()
    }

    onLogin(login) {
        this.setState({ token: login.token, userId: login.userId })
        this.getInstance().fetchUser()
    }

    onFetchToken(credentials) {
        this.setState({ credentials: credentials })
        this.getInstance().fetchToken()
    }

    onSendRegistration(registration) {
        this.setState({ registration: registration })
        this.getInstance().sendRegistration()
    }

    onRegister(response) {
        this.setState({ registered: true, registrationError: false,
            registrationErrorMessage: null })
    }

    onRegistrationFailed(response) {
        this.setState({ registrationError: true, registrationErrorMessage:
            response.data.error.message })
    }

    onLoginFailed(response) {
        this.setState({ loginError: true, loginErrorMessage:
                      response.data.error.message })
    }

    isLoggedIn() {
        return !!this.state.token
    }

}

const authenticationStore = alt.createStore(AuthenticationStore, 'authStore')

export default authenticationStore
