import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Input from 'react-bootstrap/lib/Input'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Well from 'react-bootstrap/lib/Well'
import Alert from 'react-bootstrap/lib/Alert'
import Collapse from 'react-bootstrap/lib/Collapse'

class RouteControls extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: true }
    }

    handleSelect = (event, id) => {
        this.props.ParkingLotActions.setActiveParkingLot(id)
        this.props.ReportActions.setReportRouteDistance()
        this.setState({ open: false })
    }

    handleRouteReset = () => {
        this.props.ParkingLotActions.setActiveParkingLot()
        this.props.ReportActions.setReportRouteDistance()
    }

    componentWillUnmount() {
        this.props.ParkingLotActions.setActiveParkingLot()
        this.props.ReportActions.setReportRouteDistance()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Reports.createdReportRoute) {
            this.setState({ continueOpen: true })
        }

    }

    render() {
        var parkingLotItems = []
        if (this.props.ParkingLots.parkinglots) {
            parkingLotItems = this.props.ParkingLots
                .parkinglots.map(parkinglot => {
                    return <MenuItem key={parkinglot.id} eventKey={parkinglot.id}
                                >{parkinglot.name}</MenuItem>
                })
        }

        let distance = this.props.Reports.reportRouteDistance ?
                        (this.props.Reports.reportRouteDistance / 1000)
                        .toFixed(1) : 0
        return (
            <div>
            <Collapse in={this.state.open} unmountOnExit={true}>
                <Well>
                    Select a starting Parking Lot and begin clicking slowly along the route you skied.  The map will draw a line between the points making sure your route stays on the trail.  If you make a mistake click undo and the last section you traced will be removed.
                </Well>
            </Collapse>
            <Input>
                <div className={'text-center'}>
                <DropdownButton title={'Parking Lot'}
                    onSelect={this.handleSelect}
                    id={'parkingSelect'}>
                    {parkingLotItems}
                </DropdownButton>
                <Button onClick={this.handleRouteReset}>
                    <Glyphicon glyph='refresh'/> Start Again</Button>
                </div>
            </Input>
            <Input>
                <div className={'text-center'}>
                    <span>{distance + ' KM'}</span>
                </div>
            </Input>
            </div>
        )
    }
}
export default RouteControls
