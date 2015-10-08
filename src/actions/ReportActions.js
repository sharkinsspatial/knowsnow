import alt from '../alt'

class ReportActions {
    constructor() {
        this.generateActions('fetchingReports', 'updateReports', 'reportsFailed',
             'createReport', 'creatingReport', 'updateReport', 'createReportFailed',
             'setActiveReport',
             'createReportRoute')
    }
}

const reportActions = alt.createActions(ReportActions)

export default reportActions
