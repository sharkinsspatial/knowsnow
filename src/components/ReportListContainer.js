import React from 'react'
import alt from '../alt'
import AltContainer from 'alt/AltContainer'
import ReportStore from '../stores/ReportStore'
import ReportList from './ReportList'
import ReportActions from '../actions/ReportActions'

class ReportListContainer extends React.Component {
    render() {
        return (
            <AltContainer store={ReportStore} actions={ReportActions}>
                <ReportList/>
            </AltContainer>
        )
    }
}

export default ReportListContainer
