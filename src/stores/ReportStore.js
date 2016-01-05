import alt from '../alt'
import ReportSource from '../sources/ReportSource'
import ReportActions from '../actions/ReportActions'
import moment from 'moment'
import AuthenticationStore from './AuthenticationStore'

class ReportStore {
    constructor() {
        this.state = { createMode: false, activeReportImages: [] }
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
        this.bindAction(ReportActions.createPhoto, this.onCreatePhoto)
        this.bindAction(ReportActions.updatePhotos, this.onUpdatePhotos)
        this.bindAction(ReportActions.setActiveReportImage, this.onSetActiveReportImage)

        this.exportPublicMethods({
            getReports: this.getReports
        })
    }

    onFetchingReports() {
        this.setState({loading: true})
    }

    loadReports(reports) {
        let mostRecent = reports.reduce((accumulator, current) => {
            let moreRecent = moment(current.startTime).isAfter(accumulator.startTime) ?
                current : accumulator
            //Setting lookup map here since we are iterating
            current.displayName = current.owner.identities.length > 0 ?
                current.owner.identities[0].profile.displayName : current.owner.username
            this.reports.set(current.id, current)
            return moreRecent
        }, {id:0, startTime: moment('2010', 'YYYY')})
        return mostRecent
    }

    addReport(report) {
        this.reports.set(report.id, report)
        let authenticationStoreState = AuthenticationStore.getState()
        report.displayName = authenticationStoreState.user.identities.length > 0 ?
                authenticationStoreState.user.identities[0].profile.displayName :
                    authenticationStoreState.user.username
        report.imageMetadatas = []
        //State is immutable so we need a new array here
        let newArray = this.state.reports.slice()
        newArray.unshift(report)
        this.setState({ reports: newArray, createdReportRoute: null,
            activeReport: report.id, activeReportRoute: report.route,
            createMode: false})
    }

    onUpdateReports(response) {
        let mostRecent = this.loadReports(response.data)
        let activeReport = this.reports.get(mostRecent.id)
        this.setState({ reports: response.data, loading: false, activeReport:
            mostRecent.id, activeReportRoute: activeReport.route,
            activeReportImages: activeReport.imageMetadatas })
    }

    onSetActiveReport(id) {
        let activeReport = this.reports.get(id)
        if (activeReport) {
            this.setState({ activeReport: id,
                          activeReportRoute: activeReport.route,
                          activeReportImages: activeReport.imageMetadatas
            })
        }
        else {
            this.setState({ activeReport: null, activeReportRoute: null,
                            activeReportImages: []
            })
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

    onCreatePhoto(photo) {
        this.setState({ photo: photo })
        this.getInstance().createPhoto()
    }

    onUpdateReport(response) {
        this.addReport(response.data)
    }

    onUpdatePhotos(response) {
        let activeReport = this.reports.get(response.data.imageMetadata.reportId)
        //State is immutable so we need a new array here
        let newArray = activeReport.imageMetadatas.slice()
        newArray.push(response.data.imageMetadata)
        activeReport.imageMetadatas = newArray
        this.setState({ activeReportImages: activeReport.imageMetadatas,
                        activeReportImage: response.data.imageMetadata.id
        })
    }

    onSetActiveReportImage(id) {
        this.setState({ activeReportImage: id })
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

const reportStore = alt.createStore(ReportStore, 'reportStore')

export default reportStore
