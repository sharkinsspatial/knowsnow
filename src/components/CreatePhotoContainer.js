import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ReportStore from '../stores/ReportStore'
import ReportActions from '../actions/ReportActions'
import CreatePhoto from './CreatePhoto'
import {History} from 'react-router'

var CreatePhotoContainer = React.createClass({
    mixins: [History],
    render() {
        return (
            <AltContainer store={ReportStore} actions={ReportActions}>
                <CreatePhoto history={this.context.history}/>
            </AltContainer>
        )
    }
})

export default CreatePhotoContainer
