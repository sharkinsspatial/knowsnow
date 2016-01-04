import React from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import Label from 'react-bootstrap/lib/Label'
import moment from 'moment'
import PhotoCarousel from './PhotoCarousel'


class ReportList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let reportNodes = this.props.reports.map(report => {
            let date = moment(report.date).format('MMM DD')
            let dateDifference = moment(report.startTime).fromNow()
            let distance = (report.distance / 1000).toFixed(1) + ' KM'
            let glide = report.glideWax !== '' ?
                <h4 className={'headingPadding'}>
                    <Label bsStyle='success'>{report.glideWax}</Label>
                </h4> : <div/>

            let grip = report.gripWax !== '' ?
                <h4 className={'headingPadding'}>
                    <Label bsStyle='danger'>{report.gripWax}</Label>
                </h4> : <div/>

            let carousel = <PhotoCarousel images={report.imageMetadatas}/>

            return (
                <Panel header={dateDifference + ' by ' + report.displayName}
                    key={report.id} eventKey={report.id}>
                    <Panel>
                    <h4 className={'headingPadding'}>
                    <Label bsStyle='primary'>
                        {report.skiType + ' - ' + distance}</Label>
                    </h4>
                        {glide}
                        {grip}
                        {report.narrative}
                        {carousel}
                    </Panel>
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
}
ReportList.defaultProps = {reports: []}
export default ReportList
