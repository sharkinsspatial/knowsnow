import axios from 'axios'
import AuthenticationActions from '../actions/AuthenticationActions'
let rootUrl = 'apiUrl'

const AuthenticationSource = {
    fetchUser: {
        remote(state) {
            let url = rootUrl + 'api/Users/' + state.userId +
            '?filter[include][identities]&access_token=' + state.token
            return axios.get(url)
        },

        local(state) {
            return state.user ? state.user : null
        },

        success: AuthenticationActions.updateUser,
        error: AuthenticationActions.userFailed
    },
    fetchToken: {
        remote(state) {
            let url = rootUrl + 'api/Users/login'
            return axios.post(url, state.credentials)
        },

        local(state) {
            return state.token ? state.user : null
        },

        success: AuthenticationActions.updateToken,
        error: AuthenticationActions.tokenFailed
    }
}

export default AuthenticationSource
