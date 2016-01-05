import React from 'react'
import PhotoCarousel from './PhotoCarousel'
import classNames from 'classnames'
import Well from 'react-bootstrap/lib/Well'
import Button from 'react-bootstrap/lib/Button'

class CreatePhoto extends React.Component {
    constructor(props) {
        super(props)
        this.state = { submitting: false }
    }

    onPhotoSelect = (event) => {
        this.state = { submitting: true }
        let file = this.refs.fileUpload.files[0]
        let formData = new FormData()
        formData.append('fileUpload', file)
        this.props.createPhoto(formData)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.activeReportImages !== this.props.activeReportImages) {
            this.setState({ submitting: false })
        }
    }

    returnToReports = () => {
        this.props.history.pushState(null, '/', null)
    }

    render() {
        let btnClass = classNames({
            'fa': true,
            'fa-refresh': this.state.submitting,
            'fa-spin': this.state.submitting,
            'fa-3x': this.state.submitting,
            'spinnerSpacing': this.state.submitting
        })

        let carousel = <PhotoCarousel images={this.props.activeReportImages}
            setActiveImage={this.props.setActiveReportImage}
            activeImage={this.props.activeReportImage}/>
        return (
            <div>
                <Well>
                    You can include photos in your report as well.  If they contain GPS information their location will also be displayed on the map.
                </Well>
                <form encType="multipart/form-data">
                <input type='file' label='Select Photo' name='fileUpload'
                    ref='fileUpload' onChange={this.onPhotoSelect}/>
                </form>
                <div className={'text-center'}>
                    <div><i className={btnClass}></i></div>
                </div>
                {carousel}
                <div className={'text-center textPadding'}>
                    <Button onClick={this.returnToReports}
                    >Back To Reports</Button>
                </div>
            </div>
        )
    }
}

export default CreatePhoto
