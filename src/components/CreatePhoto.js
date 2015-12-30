import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'

class CreatePhoto extends React.Component {
    constructor(props) {
        super(props)
    }

    onPhotoSelect = (event) => {
        let file = this.refs.fileUpload.files[0]
        let formData = new FormData()
        formData.append('fileUpload', file)
        this.props.createPhoto(formData)
    }

    render() {
        return (
            <div>
                <form encType="multipart/form-data">
                <input type='file' label='Select Photo' name='fileUpload'
                    ref='fileUpload' onChange={this.onPhotoSelect}/>
                </form>
            </div>
        )
    }
}

export default CreatePhoto