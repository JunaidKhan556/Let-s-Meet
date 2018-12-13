import React, { Component } from "react";
import "../App.css"
import ImageUploader from "react-images-upload";

class Images extends Component {
  constructor(props){
    super(props);

  }
  next2 = () => {
    this.props.history.push("/Beverages");
  };

  render() {
    return ( <div className="container card" id="images">
          <ImageUploader
            onChange={this.props.image1}
            singleImage={true}
            withIcon={true}
            withPreview={true}
            buttonText="Upload Image 1"
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        <button onClick={this.next2} className="btn btn-primary btn-block">Next</button>
        </div>
    );
  }
}

export default Images;
