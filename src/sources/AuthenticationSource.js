import axios from 'axios'
import AuthenticationActions from '../actions/AuthenticationActions'

const AuthenticationSource = {
    fetchUser: {
        remote(state) {
            var res
            let url = 'http://localhost:3000/api/Users/' + state.userId +
            '?filter[include][identities]&access_token=' + state.token
            return axios.get(url)
        },

        local(state) {
            return state.user ? state.user : null
        },

        success: AuthenticationActions.updateUser,
        error: AuthenticationActions.userFailed
    }
}

export default AuthenticationSource
