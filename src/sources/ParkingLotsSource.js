import axios from 'axios'
import ParkingLotActions from '../actions/ParkingLotActions'


const ParkingLotSource = {
    fetchParkingLots: {
        remote(state) {
            return axios.get('/ParkingLots.geojson')
        },

        local(state) {
            return state.parkinglots ? state.parkinglots : null
        },

        loading: ParkingLotActions.fetchingParkingLots,
        success: ParkingLotActions.updateParkingLots,
        error: ParkingLotActions.parkingLotsFailed

    }
}

export default ParkingLotSource
