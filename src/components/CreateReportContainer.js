import React from 'react'
import alt from '../alt'
import AltContainer from 'alt/AltContainer'
import ParkingLotStore from '../stores/ParkingLotStore'
import ReportStore from '../stores/ReportStore'
import RouteControls from './RouteControls'
import CreateReportInputs from './CreateReportInputs.js'
import ParkingLotActions from '../actions/ParkingLotActions'
import ReportActions from '../actions/ReportActions'
import {History} from 'react-router'

var CreateReportContainer = React.createClass({
    mixins: [History],
    componentDidMount() {
        ParkingLotStore.getParkingLots()
        ReportActions.setCreateMode(true)
        ReportActions.setActiveReport()
    },
    render() {
        return (
            <AltContainer stores={{ParkingLots: ParkingLotStore,
                Reports: ReportStore}}
                actions={{ParkingLotActions: ParkingLotActions,
                ReportActions: ReportActions}}>
                <RouteControls/>
                <CreateReportInputs history={this.context.history}/>
            </AltContainer>
        )
    }
})

export default CreateReportContainer
