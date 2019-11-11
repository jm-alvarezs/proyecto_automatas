import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: ""
    };
    this.search = this.search.bind(this);
  }

  search(query) {
    if (this.props.searchModifier)
      this.props.searchModifier(query, this.state.property);
  }

  componentDidMount() {
    if (this.props.filters) this.setProperty();
  }

  setProperty() {
    let property = ReactDOM.findDOMNode(this.select).value;
    this.setState({ property });
  }

  renderFilters() {
    if (this.props.filters) {
      return (
        <>
          <Col xs={12} sm={8} md={9} className="pr-0">
            <Form.Control
              type="text"
              placeholder="Search products..."
              onChange={e => this.search(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={4} md={3}>
            <Form.Control
              as="select"
              ref={select => (this.select = select)}
              onChange={this.setProperty}
            >
              <option value="nombre">Nombre</option>
            </Form.Control>
          </Col>
        </>
      );
    }
    return (
      <Col>
        <Form.Control
          type="text"
          placeholder={this.props.placeholder ? this.props.placeholder : "Search..."}
          onChange={e => this.search(e.target.value)}
        />
      </Col>
    );
  }

  render() {
    return <Row className="mb-3">{this.renderFilters()}</Row>;
  }
}

export default SearchBox;
