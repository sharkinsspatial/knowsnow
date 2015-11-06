import alt from '../alt'
import ReportSource from '../sources/ReportSource'
import ReportActions from '../actions/ReportActions'
import moment from 'moment'
import AuthenticationStore from './AuthenticationStore'

class ReportStore {
    constructor() {
        this.state = { createMode: false }
        this.reports = new Map()
        this.reportRoute = {}
        this.registerAsync(ReportSource)
        this.bindAction(ReportActions.updateReports, this.onUpdateReports)
        this.bindAction(ReportActions.fetchingReports, this.onFetchingReports)
        this.bindAction(ReportActions.setActiveReport, this.onSetActiveReport)
        this.bindAction(ReportActions.createReportRoute, this.onCreateReportRoute)
        this.bindAction(ReportActions.createReport, this.onCreateReport)
        this.bindAction(ReportActions.updateReport, this.onUpdateReport)
        this.bindAction(ReportActions.setReportRouteDistance, this.onSetDistance)
        this.bindAction(ReportActions.setCreateMode, this.onSetCreateMode)

        this.exportPublicMethods({
            getReports: this.getReports
        })
    }

    onFetchingReports() {
        this.setState({loading: true})
    }

    loadReports(reports) {
        let mostRecent = reports.reduce((accumulator, current) => {
            let moreRecent = moment(current.date).isAfter(accumulator.date) ?
                current : accumulator
            //Setting lookup map here since we are iterating
            current.displayName = current.owner.identities[0].profile.displayName
            this.reports.set(current.id, current)
            return moreRecent
        }, {id:0, date: moment('2010', 'YYYY')})
        return mostRecent
    }

    addReport(report) {
        this.reports.set(report.id, report)
        let authenticationStoreState = AuthenticationStore.getState()
        report.displayName = authenticationStoreState.user.identities[0]
            .profile.displayName
        //State is immutable so we need a new array from concat here
        this.setState({reports: this.state.reports.concat([report]),
            createdReportRoute: null})
    }

    onUpdateReports(response) {
        let mostRecent = this.loadReports(response.data)
        let activeReport = this.reports.get(mostRecent.id)
        this.setState({ reports: response.data, loading: false, activeReport:
            mostRecent.id, activeReportRoute: activeReport.route })
    }

    onSetActiveReport(id) {
        let activeReport = this.reports.get(id)
        if (activeReport) {
            this.setState({ activeReport: id, activeReportRoute: activeReport.route })
        }
        else {
            this.setState({ activeReport: null, activeReportRoute: null })
        }
    }

    onSetDistance(distance) {
        this.setState({ reportRouteDistance: distance })
    }

    onCreateReportRoute(route) {
        this.setState({ createdReportRoute: route })
    }

    onCreateReport(report) {
        //if (!this.getInstance().isLoading) {
            this.setState({ createdReport: report })
            this.getInstance().createReport()
        //}
    }

    onUpdateReport(response) {
        this.addReport(response.data)
    }

    onSetCreateMode(mode) {
        this.setState({ createMode: mode })
    }
    getReports() {
        if (!this.isLoading()) {
            this.fetchReports()
        }
    }
}

const reportStore = alt.createStore(ReportStore)

export default reportStore
