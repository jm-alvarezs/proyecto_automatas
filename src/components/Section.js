import React, { Component } from "react";
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import AdminTable from "./common/AdminTable";

class Section extends Component {
  render() {    
    return (
      <Container fluid={true} className="pl-0 pr-0 mt-4 mb-4">
        <Card className="p-4 shadow">
        <Row className="mb-1">
          <Col xs={8}>
            <h3>{this.props.title}</h3>
          </Col>
          <Col xs={4}>
            <Button variant="outline-primary" onClick={this.props.onClick} block>
              + Agregar
            </Button>
          </Col>
        </Row>
        <AdminTable          
          rows={this.props.rows}
          idRow={this.props.idRow}
          headers={this.props.headers}
          reducer={this.props.reducer}          
          saveRow={this.props.saveRow}
          editedRow={this.props.editedRow}          
          deleteRow={this.props.deleteRow}
          inputModifier={this.props.inputModifier}
        />
        </Card>
      </Container>
    );
  }
}

export default Section;
