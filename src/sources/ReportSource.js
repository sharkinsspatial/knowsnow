import axios from 'axios'
import ReportActions from '../actions/ReportActions'
import AuthenticationStore from '../stores/AuthenticationStore'
const rootUrl = 'apiUrl'
const ReportSource = {
    fetchReports: {
        remote(state) {
            let url = `${rootUrl}api/Reports?filter[order]=startTime` +
                    `%20DESC&filter[include]=imageMetadatas&` +
                    `filter[include][owner][identities]&filter[limit]=15`
            return axios.get(url)
        },

        local(state) {
            return state.reports ? state.reports : null
        },

        //loading: ReportActions.fetchingReports,
        success: ReportActions.updateReports,
        error: ReportActions.reportsFailed
    },

    createPhotoContainer: {
        remote(state) {
            let authenticationStoreState = AuthenticationStore.getState()
            let url = `${rootUrl}api/CloudStoreImages`
            let data = { name: state.activeReport }
            return axios.post(url, data)
        },

        shouldFetch() {
            return true
        },

        success: ReportActions.updatePhotoContainer,
        error: ReportActions.photoContainerFailed
    },

    createPhoto: {
        remote(state) {
            let authenticationStoreState = AuthenticationStore.getState()
            let url = `${rootUrl}api/CloudStoreImages/${state.activeReport}/upload`
            return axios.post(url, state.photo)
        },

        shouldFetch() {
            return true
        },

        success: ReportActions.updatePhotos,
        error: ReportActions.photoFailed
    },

    createReport: {
        remote(state) {
            let authenticationStoreState = AuthenticationStore.getState()
            let url = `${rootUrl}api/Reports?access_token=` +
                `${authenticationStoreState.token}`
            return axios.post(url, state.createdReport)
        },

        shouldFetch() {
            return true
        },

        loading: ReportActions.creatingReport.defer(),
        success: ReportActions.updateReport,
        error: ReportActions.createReportFailed
    }
}

export default ReportSource
