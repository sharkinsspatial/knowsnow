import React from 'react'
import alt from '../alt'
import AltContainer from 'alt/AltContainer'
import ParkingLotStore from '../stores/ParkingLotStore'
import ReportStore from '../stores/ReportStore'
import RouteControls from './RouteControls'
import CreateReportInputs from './CreateReportInputs.js'
import ParkingLotActions from '../actions/ParkingLotActions'
import ReportActions from '../actions/ReportActions'

class CreateReportContainer extends React.Component {
    componentDidMount() {
        ParkingLotStore.getParkingLots()
        ReportActions.setActiveReport()
    }

    render() {
        return (
            <AltContainer stores={{ParkingLots: ParkingLotStore, Reports: ReportStore}}
                actions={{ParkingLotActions: ParkingLotActions,
                    ReportActions: ReportActions}}>
                <RouteControls/>
                <CreateReportInputs/>
            </AltContainer>
        )
    }
}

export default CreateReportContainer
