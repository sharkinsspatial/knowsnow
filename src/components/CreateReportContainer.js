import React from 'react'
import alt from '../alt'
import AltContainer from 'alt/AltContainer'
import ParkingLotStore from '../stores/ParkingLotStore'
import CreateReport from './CreateReport'
import ParkingLotActions from '../actions/ParkingLotActions'
import ReportActions from '../actions/ReportActions'

class CreateReportContainer extends React.Component {
    componentDidMount() {
        ParkingLotStore.getParkingLots()
        ReportActions.setActiveReport()
    }

    render() {
        return (
            <AltContainer store={ParkingLotStore}
                actions={{ParkingLotActions: ParkingLotActions,
                    ReportActions: ReportActions}}>
                <CreateReport/>
            </AltContainer>
        )
    }
}

export default CreateReportContainer
