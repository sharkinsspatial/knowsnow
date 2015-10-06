import React from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import moment from 'moment'

class ReportList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let reportNodes = this.props.reports.map(report => {
            let date = moment(report.date).format('MMM DD')
            let dateDifference = moment(report.date).fromNow()
            return (
                <Panel header={date + ' (' + dateDifference + ') by ' +
                    report.userName} key={report.id} eventKey={report.id}>
                    {report.narrative}
                </Panel>
            )
        })
        return (
            <Accordion activeKey={this.props.activeReport}
                onSelect={this.props.setActiveReport}>
                {reportNodes}
            </Accordion>
        )
    }

    componentWillUnmount() {
        this.props.setActiveReport()
    }
}
ReportList.defaultProps = {reports: []}
export default ReportList
