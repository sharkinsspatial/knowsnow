import alt from '../alt'
import ReportSource from '../sources/ReportSource'
import ReportActions from '../actions/ReportActions'
import moment from 'moment'

class ReportStore {
    constructor() {
        this.state = {}
        this.reports = new Map()
        this.reportRoute = {}
        this.registerAsync(ReportSource)
        this.bindAction(ReportActions.updateReports, this.onUpdateReports)
        this.bindAction(ReportActions.fetchingReports, this.onFetchingReports)
        this.bindAction(ReportActions.setActiveReport, this.onSetActiveReport)
        this.bindAction(ReportActions.updateReportRoute, this.onUpdateReportRoute)
        this.bindAction(ReportActions.createReport, this.onCreateReport)
        this.bindAction(ReportActions.updateReport, this.onUpdateReport)

        this.exportPublicMethods({
            getReports: this.getReports
        })
    }

    onFetchingReports() {
        this.setState({loading: true})
    }

    onUpdateReportRoute(route) {
        this.reportRoute = route
    }

    loadReports(reports) {
        let mostRecent = reports.reduce((accumulator, current) => {
            let moreRecent = moment(current.date).isAfter(accumulator.date) ?
                current : accumulator
            //Setting lookup map here since we are iterating
            this.reports.set(current.id, current)
            return moreRecent
        }, {id:0, date: moment('2010', 'YYYY')})
        return mostRecent
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

    onCreateReport(report) {
        //if (!this.getInstance().isLoading) {
            this.getInstance().createReport(report)
        //}
    }

    onUpdateReport(response) {
        let test = response.data
    }

    getReports() {
        if (!this.isLoading()) {
            this.fetchReports()
        }
    }
}

const reportStore = alt.createStore(ReportStore)

export default reportStore
