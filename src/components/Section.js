import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import AdminTable from "./common/AdminTable";

class Section extends Component {
  render() {    
    return (
      <Container fluid={true} className="pl-0 pr-0 mt-3 mb-3">
        <Row className="mb-1">
          <Col xs={8}>
            <h3>{this.props.title}</h3>
          </Col>
          <Col xs={4}>
            <Button onClick={this.props.onClick} block>
              Agregar
            </Button>
          </Col>
        </Row>
        <AdminTable
          headers={this.props.headers}
          rows={this.props.rows}
          editedRow={this.props.editedRow}
          idRow={this.props.idRow}
          saveRow={this.props.saveRow}
          inputModifier={this.props.inputModifier}
          deleteRow={this.props.deleteRow}
          reducer={this.props.reducer}          
        />
      </Container>
    );
  }
}

export default Section;
