import alt from '../alt'
import ParkingLotSource from '../sources/ParkingLotsSource'
import ParkingLotActions from '../actions/ParkingLotActions'

class ParkingLotStore {
    constructor() {
        this.state = {}
        this.parkinglots = new Map()
        this.registerAsync(ParkingLotSource)
        this.bindAction(ParkingLotActions.updateParkingLots, this.onUpdate)
        this.bindAction(ParkingLotActions.fetchingParkingLots, this.onFetching)
        this.bindAction(ParkingLotActions.setActiveParkingLot, this.onSetActive)

        this.exportPublicMethods({
            getParkingLots: this.getParkingLots
        })
    }

    onFetching() {
        this.setState({ loading: true })
    }

    onUpdate(response) {
        let parkinglots = response.data.features.map(feature => {
            //Setting lookup map here sincel we are iterating
            this.parkinglots.set(feature.id, feature)
            return {name: feature.properties.name, id: feature.id}
        })
        this.setState({parkinglots: parkinglots})
    }

    getParkingLots() {
        if (!this.isLoading()) {
            this.fetchParkingLots()
        }
    }

    onSetActive(id) {
        let activeParkingLot = this.parkinglots.get(id)
        this.setState({activeParkingLot: activeParkingLot})
    }
}

const parkingLotStore = alt.createStore(ParkingLotStore)
export default parkingLotStore
