import alt from '../alt'

class ReportActions {
    constructor() {
        this.generateActions('fetchingReports', 'updateReports', 'reportsFailed',
             'createReport', 'creatingReport', 'updateReport', 'createReportFailed',
             'setActiveReport',
             'createReportRoute',
             'setReportRouteDistance',
             'setCreateMode',
             'updatePhotoContainer', 'createPhoto', 'updatePhotos', 'photoFailed')
    }
}

const reportActions = alt.createActions(ReportActions)

export default reportActions
