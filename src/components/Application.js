import alt from '../alt'
import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import ReportStore from '../stores/ReportStore'
import ParkingLotStore from '../stores/ParkingLotStore'
import AuthenticationStore from '../stores/AuthenticationStore'
import ReportListContainer from './ReportListContainer'
import CreateReportContainer from './CreateReportContainer'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Panel from 'react-bootstrap/lib/Panel'
import ReportMap from './ReportMap'
import AltContainer from 'alt/AltContainer'
import ReportActions from '../actions/ReportActions'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import {LinkContainer} from 'react-router-bootstrap'
import Login from './Login'
import AuthenticationActions from '../actions/AuthenticationActions'


class Application extends React.Component {
    componentDidMount() {
        ReportStore.getReports()
    }

    render() {
        return (
            <div>
                <Navbar brand='Know Snow' toggleNavKey={0}>
                <Nav right eventKey={0}>
                    <LinkContainer to='/create'>
                        <NavItem eventKey={1}>Create Report</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/#'>
                        <NavItem eventKey={2}>Reports</NavItem>
                    </LinkContainer>
                </Nav>
                </Navbar>
                <Row>
                <Col md={4}>
                <Panel>
                    {this.props.children}
                </Panel>
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
function requireAuthorization(nextState, replaceState) {
    if(!AuthenticationStore.isLoggedIn()) {
        if (nextState.location.query.access_token) {
            let test = nextState.location.query.access_token
            AuthenticationActions.login(nextState.location.query.access_token)
            //TractActions.login(token)
        }
        else {
            replaceState({ nextPathname: nextState.location.pathname }, '/login')
        }
    }
}

React.render((
    <Router>
        <Route path='/' component={Application}>
            <IndexRoute component={ReportListContainer}/>
            <Route path='login' component={Login}/>
            <Route path='create' component={CreateReportContainer}
            onEnter={requireAuthorization}/>
        </Route>
    </Router>
), document.getElementById('content'))


