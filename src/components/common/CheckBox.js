import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class CheckBox extends Component {

  //Modifier: An action to make changes in the parent component or through Redux
  toggle() {
    let checked = !this.props.checked;
    if (this.props.modifier) {
      if (this.props.args !== undefined) {
        this.props.modifier(this.props.args, checked);
      } else this.props.modifier(checked);
    }
  }

  render() {
    return (
      <Button
        className={
          (this.props.checked ? "checked" : "unchecked") + " checkbox text-light mr-2"
        }
        disabled={this.props.disabled}
        onClick={() => this.toggle()}
        style={{ width: 25, height: 25, padding: 0 }}
        variant="light"
      >
        <i className="fa fa-check small"></i>
      </Button>
    );
  }
}

export default CheckBox;
