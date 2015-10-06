import axios from 'axios'
import ReportActions from '../actions/ReportActions'

const ReportSource = {
    fetchReports: {
        remote(state) {
            var res
            axios.get('/Reports.json').then(function (response) {
                res = response
            })
            // Add delay for load animation testing
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

        local(state) {
            return state.reports ? state.reports : null
        },

        loading: ReportActions.fetchingReports,
        success: ReportActions.updateReports,
        error: ReportActions.reportsFailed
    },

    createReport: function(report) {
        return {
            remote(state) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        // change this to `false` to see the error action being handled.
                        if (true) {
                            resolve({data:{}})
                        } else {
                            reject('Things have broken')
                        }
                    }, 1000)
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
}

export default ReportSource
