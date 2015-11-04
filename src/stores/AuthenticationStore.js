import alt from '../alt'
import AuthenticationActions from '../actions/AuthenticationActions'

class AuthenticationStore {
    constructor() {
        this.state = {}
        this.bindAction(AuthenticationActions.login, this.onLogin)

        this.exportPublicMethods({
            isLoggedIn: this.isLoggedIn,
            getToken: this.getToken
        })
    }

    onLogin(token) {
        this.setState({ token: token })
    }

    isLoggedIn() {
        return !!this.state.token
    }

    getToken() {
        return this.state.token
    }
}

const authenticationStore = alt.createStore(AuthenticationStore)

export default authenticationStore
