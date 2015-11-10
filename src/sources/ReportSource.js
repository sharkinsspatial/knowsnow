import axios from 'axios'
import ReportActions from '../actions/ReportActions'
import AuthenticationStore from '../stores/AuthenticationStore'
const rootUrl = 'apiUrl'
const ReportSource = {
    fetchReports: {
        remote(state) {
            //var res
            return axios.get(
                rootUrl + 'api/Reports?filter[order]=endTime' +
                    '%20DESC&filter[include][owner][identities]')
                    //.then(function (response) {
                        //res = response
                    //})
            // Add delay for load animation testing
            //return new Promise(function (resolve, reject) {
                //setTimeout(function () {
                    //// change this to `false` to see the error action being handled.
                    //if (true) {
                        //resolve(res)
                    //} else {
                        //reject('Things have broken')
                    //}
                //}, 2000)
            //})
        },
        local(state) {
            return state.reports ? state.reports : null
        },

        //loading: ReportActions.fetchingReports,
        success: ReportActions.updateReports,
        error: ReportActions.reportsFailed
    },

    createReport: {
        remote(state) {
            var res
            let authenticationStoreState = AuthenticationStore.getState()
            let url = rootUrl + 'api/Reports?access_token=' +
                authenticationStoreState.token
            axios.post(url, state.createdReport)
                .then(function (response) {
                    res = response
            })
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    // change this to `false` to see the error action being handled.
                    if (true) {
                        resolve(res)
                    } else {
                        reject('Things have broken')
                    }
                }, 2000)
            })
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
