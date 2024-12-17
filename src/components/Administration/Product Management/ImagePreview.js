import React, { Component } from 'react'; 
import { Image } from "react-bootstrap"; 

class ImagePreview extends Component {     
  constructor(props) {         
    super(props);         
    this.state = {             
      edit: false,             
      product: this.props.product         
    };         
    this.fileInput = React.createRef();         
    this.changeStatus = this.changeStatus.bind(this);     
  }     
  
  changeStatus = () => {         
    if (this.state.edit === true) {             
      this.setState({ edit: false })         
    } else {             
      this.setState({ edit: true })         
    }     
  }     
  
  render() {         
    if (this.state.edit === false) {             
      return (                 
        <div>                     
          <p>Thêm hình ảnh</p>                     
          <Image                         
            src={ `http://localhost:3000/images/${ this.state.product.image }` }                         
            width="400px"                         
            height="400px" />                     
          <button onClick={ this.changeStatus }>Chỉnh sửa hình ảnh</button>                 
        </div>             
      );         
    } else {             
      return (                 
        <div>                     
          <p>Thêm hình ảnh</p>                     
          <label htmlFor="fileUpload" className="customeFileUplad">                         
            Chọn tệp                     
          </label>                     
          <input                         
            className="form-control"                         
            type="file"                         
            id="fileUpload"                         
            onChange={ this.props.handleImageChange }                         
            multiple                         
            required />                     
          <span>(jpg, jpeg hoặc png)</span>                 
        </div>             
      );         
    }     
  } 
}  

export default ImagePreview;
