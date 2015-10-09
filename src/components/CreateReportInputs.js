import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from 'moment'

class CreateReportInputs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {skiType: props.skiType}
    }

    static contextTypes= {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    }

    handleSubmit = (event) => {
        let report = this.serializeForm()
        this.props.ReportActions.createReport(report)
        this.context.history.pushState(null, '/', null)
    }

    handleSkiTypeChange = (event) => {
        this.setState({skiType: this.refs.skiType.getValue()})
    }

    handleDateChange = (date) => {
        this.setState({ date: date })
    }

    handleStartTimeChange = (time) => {
        this.setState({startTime: time})
    }

    serializeForm = () => {
        let literal = {}
        for (var key of Object.keys(this.refs)) {
            literal[key] = this.refs[key].getValue()
        }
        literal.route = this.props.Reports.createdReportRoute
        literal.id = 22
        return literal
    }

    render() {
        let route = this.props.Reports.createdReportRoute
        var submitDisabled = true
        if (route && this.state.date && this.state.startTime) {
            submitDisabled = false
        }
        let storageFormat = 'YYYY-DD-MM hh:mm:ss'
        let now = moment().format(storageFormat)
        return (
            <div>
            <Input type='select' label='Ski Type' ref='skiType'
                defaultValue='Skate' onChange={this.handleSkiTypeChange}
                disabled={!route ? true : false}>
                <option value='Skate'>Skate</option>
                <option value='Classic'>Classic</option>
            </Input>
            <Input type='text' label='Glide Wax' ref='glideWax'
                disabled={!route ? true : false}/>
            <Input type='text' label='Grip Wax' ref='gripWax'
                disabled={this.state.skiType == 'Skate' ? true : false}/>
            <Input label='Ski Date'>
                <DateTimeField defaultText='Please select the ski date'
                    onChange={this.handleDateChange} inputFormat='MM/DD/YYYY'
                    ref='date' format={storageFormat} dateTime={now}/>
            </Input>
            <Input label='Start Time'>
                <DateTimeField dateTime={this.state.date}
                    defaultText='Please select a start time' mode='time'
                    onChange={this.handleStartTimeChange} inputFormat='h:mm'
                    ref='startTime' format={storageFormat}/>
            </Input>
            <Input label='Finish Time'>
                <DateTimeField dateTime={this.state.startTime}
                    defaultText='Please select a finish time' mode='time'
                    inputFormat='h:mm' ref='endTime' format={storageFormat}/>
            </Input>
            <Input type='textarea' label='Report' ref='narrative'
                placeholder='Your report here' disabled={!route ? true : false}/>
            <ButtonInput type='submit' value='Submit Report'
                onClick={this.handleSubmit} disabled={submitDisabled}/>
            </div>
        )
    }
}

CreateReportInputs.defaultProps = { skiType: 'Skate' }
export default CreateReportInputs
