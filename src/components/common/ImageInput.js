import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Input from "./Input";

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
    };
    this.renderImagen = this.renderImagen.bind(this);
  }

  componentDidMount() {
    if(this.props.base_url && this.props.idAdjunto)
    this.setState({ src: this.props.base_url+"/"+this.props.idAdjunto });
  }

  renderImagen(file) {
    let reader = new FileReader();
    reader.onload = e => {
      let src = e.target.result;
      this.setState({ src });
    };
    reader.readAsDataURL(file);
    if (this.props.modifier) {
      if (this.props.args) this.props.modifier(this.props.args, file);
      else this.props.modifier(file);
    }
  }

  render() {
    return (
      <Container fluid={true} className="pl-0 pr-0">
        {this.state.src !== "" ? (
          <Image
            src={this.state.src}
            className="d-block mb-3"
            style={{ maxWidth: "100%", width: "auto%", maxHeight: 200 }}
          />
        ) : (
          ""
        )}
        <Input
          type="file"
          modifier={this.renderImagen}
        />
      </Container>
    );
  }
}

export default ImageInput;
