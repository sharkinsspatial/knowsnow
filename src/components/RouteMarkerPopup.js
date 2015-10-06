import React from 'react'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class RouteMarkerPopup extends React.Component {
    render() {
        return (
            <ButtonGroup>
                <Button bsSize='xsmall' className={'undo'}>
                    <Glyphicon glyph='share-alt'/> Undo</Button>
                <Button bsSize='xsmall' className={'finish'}>
                    <Glyphicon glyph='ok'/> Finish</Button>
            </ButtonGroup>
        )
    }
}

export default RouteMarkerPopup
