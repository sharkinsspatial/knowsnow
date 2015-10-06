import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

class CreateReport extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSelect = (event, id) => {
        this.props.ParkingLotActions.setActiveParkingLot(id)
    }

    handleClick = () => {
        this.props.ReportActions.createReport()
    }

    render() {
        let parkingLotItems = this.props.parkinglots.map(parkinglot => {
            return <MenuItem key={parkinglot.id} eventKey={parkinglot.id}
                >{parkinglot.name}</MenuItem>
        })
        return (
            <div>
                <DropdownButton title={'Starting Parking Lot'}
                    onSelect={this.handleSelect}
                    id={'parkingSelect'}>
                    {parkingLotItems}
                </DropdownButton>
                <Button title={'Create Report'}
                    onClick={this.handleClick}/>
            </div>
        )
    }
}
CreateReport.defaultProps = {parkinglots: []}
export default CreateReport
