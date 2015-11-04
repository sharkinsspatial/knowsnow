import alt from '../alt'

class AuthenticationActions {
    constructor() {
        this.generateActions('login')
    }
}

const authenticationActions = alt.createActions(AuthenticationActions)

export default authenticationActions
