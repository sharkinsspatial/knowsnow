import React from 'react'
import Well from 'react-bootstrap/lib/Well'

class Help extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
            <Well>Gatineau XC is an experimental application and still under development.  Please contact us with any issues, questions or recommendations you might have.</Well>
            <div className='text-center'>
                <a href='mailto:gatineauxc@gmail.com'>Gatineau XC</a>
            </div>
            </div>
        )
    }
}

export default Help
