import React, { Component } from 'react'
import { connect } from 'react-redux';
import {addImage} from '../../../Redux/Actions'
 class FileUpload extends Component {
    state={
        image:null
    }
    onImageChange=(e)=>{

        if(e.target.files && e.target.files[0]){
            const image =e.target.files[0];
            this.setState({image:URL.createObjectURL(image)})
        }
    }
    render() {
        if(this.state.image)
            this.props.addImage(this.state.image)
        return (
            <div className="p-2 w-full h-full bg-black flex justify-center items-center">
                <input className="" style={{color:'white'}} type='file' id="img" name='uploadImage'  onChange={this.onImageChange.bind(this)}/>
            </div>
        )
    }
}
export default connect(null,{addImage})(FileUpload)