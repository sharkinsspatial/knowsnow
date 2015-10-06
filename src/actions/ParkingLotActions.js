import alt from '../alt'

class ParkingLotActions {
    constructor() {
        this.generateActions('fetchingParkingLots', 'updateParkingLots',
                             'parkingLotsFailed', 'setActiveParkingLot')
    }
}

const parkingLotActions = alt.createActions(ParkingLotActions)

export default parkingLotActions
