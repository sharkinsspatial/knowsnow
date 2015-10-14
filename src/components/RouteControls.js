import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Input from 'react-bootstrap/lib/Input'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class RouteControls extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSelect = (event, id) => {
        this.props.ParkingLotActions.setActiveParkingLot(id)
    }

    handleRouteReset = () => {
        this.props.ParkingLotActions.setActiveParkingLot()
        this.props.ReportActions.setReportRouteDistance()
    }

    componentWillUnmount() {
        this.props.ParkingLotActions.setActiveParkingLot()
        this.props.ReportActions.setReportRouteDistance()
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
            <Input>
                <DropdownButton title={'Starting Parking Lot'}
                    onSelect={this.handleSelect}
                    id={'parkingSelect'}>
                    {parkingLotItems}
                </DropdownButton>
                <Button onClick={this.handleRouteReset}>
                    <Glyphicon glyph='refresh'/> Start Again</Button>
                <span>{distance + ' KM'}</span>
            </Input>
            </div>
        )
    }
}
export default RouteControls
