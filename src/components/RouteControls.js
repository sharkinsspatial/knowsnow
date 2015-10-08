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

    render() {
        var parkingLotItems = []
        if (this.props.ParkingLots.parkinglots) {
            parkingLotItems = this.props.ParkingLots
                .parkinglots.map(parkinglot => {
                    return <MenuItem key={parkinglot.id} eventKey={parkinglot.id}
                                >{parkinglot.name}</MenuItem>
                })
        }

        return (
            <div>
            <Input>
                <DropdownButton title={'Starting Parking Lot'}
                    onSelect={this.handleSelect}
                    id={'parkingSelect'}>
                    {parkingLotItems}
                </DropdownButton>
                <Button><Glyphicon glyph='refresh'/> Reset Route</Button>
            </Input>
            </div>
        )
    }
}
export default RouteControls
