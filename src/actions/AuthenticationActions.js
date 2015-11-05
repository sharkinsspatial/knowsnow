import alt from '../alt'

class AuthenticationActions {
    constructor() {
        this.generateActions('login', 'updateUser', 'userFailed')
    }
}

const authenticationActions = alt.createActions(AuthenticationActions)

export default authenticationActions
