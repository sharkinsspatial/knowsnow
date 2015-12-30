import alt from '../alt'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router'
import ReportStore from '../stores/ReportStore'
import ParkingLotStore from '../stores/ParkingLotStore'
import AuthenticationStore from '../stores/AuthenticationStore'
import ReportListContainer from './ReportListContainer'
import CreateReportContainer from './CreateReportContainer'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Panel from 'react-bootstrap/lib/Panel'
import ReportMap from './ReportMap'
import AltContainer from 'alt-container'
import ReportActions from '../actions/ReportActions'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import {LinkContainer} from 'react-router-bootstrap'
import Login from './Login'
import AuthenticationActions from '../actions/AuthenticationActions'
import RegisterContainer from './RegisterContainer'
import LoginContainer from './LoginContainer'
import Legend from './Legend'
import CreatePhotoContainer from './CreatePhotoContainer'


class Application extends React.Component {
    componentDidMount() {
        ReportStore.getReports()
    }

    render() {
        return (
            <div>
                <Navbar fluid fixedTop toggleNavKey={0}>
                <Nav right eventKey={0}>
                    <LinkContainer to='/create'>
                        <NavItem eventKey={1}>Create Report</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/#'>
                        <NavItem eventKey={2}>Reports</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/legend'>
                        <NavItem eventKey={3}>Legend</NavItem>
                    </LinkContainer>
                </Nav>
                </Navbar>
                <Grid fluid>
                <Row>
                <Col className={'scroll'} md={4}>
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
                </Grid>
            </div>
        )
    }
}

function requireAuthorization(nextState, replaceState) {
    if(!AuthenticationStore.isLoggedIn()) {
        if (nextState.location.query.access_token) {
            let login = {token: nextState.location.query.access_token,
                userId: nextState.location.query.userId}
            AuthenticationActions.login(login)
        }
        else {
            replaceState({ nextPathname: nextState.location.pathname }, '/login')
        }
    }
}

ReactDOM.render((
    <Router>
        <Route path='/' component={Application}>
            <IndexRoute component={ReportListContainer}/>
            <Route path='login' component={LoginContainer}/>
            <Route path='create' component={CreateReportContainer}
                onEnter={requireAuthorization}/>
            <Route path='upload' component={CreatePhotoContainer}
                onEnter={requireAuthorization}/>
            <Route path='register' component={RegisterContainer}/>
            <Route path='legend' component={Legend}/>
        </Route>
    </Router>
), document.getElementById('content'))


