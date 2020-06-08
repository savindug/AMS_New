import React, {Component} from 'react';
import Dropzone from 'react-dropzone'

class FreportComponent extends Component {
    render() {
        return (
            <div>
                <h1>FieldReports Here</h1>

                <input type="file" id="file"  ref="fileUploader" />

                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
    {({getRootProps, getInputProps}) => (
        <section>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        </section>
    )}
    </Dropzone>

                <div className="text-center">
                <button className="btn btn-success"><b>Upload Report</b></button>
                </div>

            </div>
        );
    }
}

export default FreportComponent;