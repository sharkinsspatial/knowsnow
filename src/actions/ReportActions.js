import alt from '../alt'

class ReportActions {
    constructor() {
        this.generateActions('fetchingReports', 'updateReports', 'reportsFailed',
             'createReport', 'creatingReport', 'updateReport', 'createReportFailed',
             'setActiveReport',
             'createReportRoute',
             'setReportRouteDistance',
             'setCreateMode',
             'createPhoto', 'updatePhotos', 'photoFailed',
             'setActiveReportImage')
    }
}

const reportActions = alt.createActions(ReportActions)

export default reportActions
