import alt from '../alt'
import AuthenticationSource from '../sources/AuthenticationSource'
import AuthenticationActions from '../actions/AuthenticationActions'

class AuthenticationStore {
    constructor() {
        this.state = {}
        this.registerAsync(AuthenticationSource)
        this.bindAction(AuthenticationActions.login, this.onLogin)
        this.bindAction(AuthenticationActions.updateUser, this.onUpdateUser)

        this.exportPublicMethods({
            isLoggedIn: this.isLoggedIn
        })
    }

    onUpdateUser(response) {
        this.setState({ user: response.data })
    }

    onLogin(login) {
        this.setState({ token: login.token, userId: login.userId })
        this.getInstance().fetchUser()
    }

    isLoggedIn() {
        return !!this.state.token
    }

}

const authenticationStore = alt.createStore(AuthenticationStore)

export default authenticationStore
