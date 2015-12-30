import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ReportStore from '../stores/ReportStore'
import ReportActions from '../actions/ReportActions'
import CreatePhoto from './CreatePhoto'

class CreatePhotoContainer extends React.Component {
    render() {
        return (
            <AltContainer store={ReportStore} actions={ReportActions}>
                <CreatePhoto/>
            </AltContainer>
        )
    }
}

export default CreatePhotoContainer
