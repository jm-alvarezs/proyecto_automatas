import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Input from "./Input";
import ReactDOM from "react-dom";

class MultiLanguageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      value: undefined
    };
    this.setSelected = this.setSelected.bind(this);
  }

  setSelected() {
    let selected = ReactDOM.findDOMNode(this.select);
    if(selected) this.setState({ selected });
    else this.setState({ selected: this.props.lenguajes[0].idLenguaje });
  }

  setValue() {
    let language = this.getLanguage();
    if (language !== undefined) {
      if (this.props.values) {
        this.setState({ selected: language });
      }
    }
  }

  hasLabel() {
    if (this.props.label) return <Form.Label className="mt-3" />;
    return <></>;
  }

  componentDidMount() {
    this.setSelected();
  }

  getLanguage() {
    let select = ReactDOM.findDOMNode(this.select);
    if (select) {
      return select.value;
    }
    return undefined;
  }

  getValue() {
    if (Array.isArray(this.props.values)) {
      return this.arrayToObject(
        this.props.values,
        this.props.keyName,
        this.props.valName
      )[this.state.selected];
    }
    return this.props.values ? this.props.values[this.state.selected] : "";
  }

  arrayToObject(array, keyName, valName) {
    if (!array) return [];
    let object = {};
    for (let i = 0; i < array.length; i++) {
      object[array[i][keyName]] = array[i][valName];
    }
    return object;
  }

  renderLanguages() {
    if (this.props.lenguajes)
      return this.props.lenguajes.map(lenguaje => (
        <option key={lenguaje.idLenguaje} value={lenguaje.idLenguaje}>
          {lenguaje.nombre}
        </option>
      ));
  }

  render() {
    const props = this.props.lenguajes.length > 1 ? ({ xs: 12, sm: 9, md: 10, lg: 11 }) : {};

    return (
      <Row>
        <Col {...props}>
          <Input
            as={this.props.as}
            rows={this.props.rows}
            type="text"
            placeholder={this.props.placeholder}
            label={this.props.label ? this.props.label : undefined}
            className={this.props.className ? this.props.className : ""}
            value={this.getValue()}
            modifier={this.props.modifier}
            args={this.state.selected}
          />
        </Col>
        {this.props.lenguajes.length > 1 ? 
        <Col xs={12} sm={3} md={2} lg={1} className="pl-0">
          {this.hasLabel()}
          <Form.Control
            as="select"
            className="pr-0"
            ref={select => (this.select = select)}
            onChange={this.setSelected}            
          >
            {this.renderLanguages()}
          </Form.Control>
        </Col> : ""}
      </Row>
    );
  }
}

export default MultiLanguageInput;
