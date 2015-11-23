import alt from '../alt'

class AuthenticationActions {
    constructor() {
        this.generateActions('login', 'updateUser', 'userFailed',
                            'fetchToken', 'updateToken', 'tokenFailed')
    }
}

const authenticationActions = alt.createActions(AuthenticationActions)

export default authenticationActions
