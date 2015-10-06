import alt from '../alt'
import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import ReportStore from '../stores/ReportStore'
import ParkingLotStore from '../stores/ParkingLotStore'
import ReportListContainer from './ReportListContainer'
import CreateReportContainer from './CreateReportContainer'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ReportMap from './ReportMap'
import AltContainer from 'alt/AltContainer'
import ReportActions from '../actions/ReportActions'

class Application extends React.Component {
    componentDidMount() {
        ReportStore.getReports()
    }

    render() {
        return (
            <div>
                <Row>
                <Col md={4}>
                    {this.props.children}
                </Col>
                <Col md={8}>
                    <AltContainer stores={{Reports: ReportStore,
                        ParkingLots: ParkingLotStore}} actions={ReportActions}>
                    <ReportMap/>
                    </AltContainer>
                </Col>
                </Row>
            </div>
        )
    }
}

React.render((
    <Router>
        <Route path='/' component={Application}>
            <IndexRoute component={ReportListContainer}/>
            <Route path='create' component={CreateReportContainer}/>
        </Route>
    </Router>
), document.getElementById('content'))


