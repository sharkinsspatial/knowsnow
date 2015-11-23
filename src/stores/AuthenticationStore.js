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

        this.exportPublicMethods({
            isLoggedIn: this.isLoggedIn
        })
    }

    onUpdateUser(response) {
        this.setState({ user: response.data })
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

    isLoggedIn() {
        return !!this.state.token
    }

}

const authenticationStore = alt.createStore(AuthenticationStore, 'authStore')

export default authenticationStore
