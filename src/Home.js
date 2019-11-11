import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Input from "./components/common/Input";
import Section from "./components/Section";
import {
  editRow,
  setPropertyRow,
  saveRow,
  createRow,
  deleteRow
} from "./actions/tableActions";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cadena: "",
      inicial: -1
    };
    this.submit = this.submit.bind(this);
    this.agregar = this.agregar.bind(this);
  }

  submit() {}

  agregar(reducer) {
    let schema = {};
    switch (reducer) {
      case "SIMBOLO":
        schema = { id: this.props.simbolos.length, simbolo: "" };
        break;
      case "ESTADO":
        schema = { id: this.props.estados.length, nombre: "", inicial: 0, final: 0 };
        break;
      case "TRANSICION":
        schema = {
          id: this.props.transiciones.length,
          inicial: "",
          simbolo: "",
          final: ""
        };
        break;
      default:
        schema = { id: 0 };
    }
    this.props.createRow(reducer, schema);
  }

  render() {
    return (
      <Container fluid={true}>
        <Row className="mb-4 bg-dark text-white pt-3 pb-3">
          <Col>
            <h1>AFD</h1>
            <h2>Configuración</h2>
          </Col>
          <Col className="text-right">
            <h4>Juan Manuel Alvarez Sánchez</h4>
            <h4>511385 | OT-19</h4>
          </Col>
        </Row>
        <Card
          className="p-4 shadow m-auto d-block mt-4 mb-4"
          style={{ maxWidth: 500 }}
        >
          <Card.Title className="text-center">Cadena a Evaluar</Card.Title>
          <Card.Body>
            <Input value={this.state.cadena} className="mb-3" />
            <Button onClick={this.submit} block>
              Evaluar
            </Button>
          </Card.Body>
        </Card>
        <Row className="mt-5">
          <Col>
            <Section
              idRow="id"
              title="Símbolos"
              reducer="SIMBOLO"
              rows={this.props.simbolos}
              saveRow={this.props.saveRow}
              editedRow={this.props.simbolo}
              onClick={() => this.agregar("SIMBOLO")}
              inputModifier={this.props.setPropertyRow}
              deleteRow={idRow => this.props.deleteRow("SIMBOLO", idRow)}
              headers={["Símbolo"]}
            />
          </Col>
          <Col>
            <Section
              idRow="id"
              title="Estados"
              reducer="ESTADO"
              headers={["Nombre", "Inicial", "Final"]}
              rows={this.props.estados}
              saveRow={this.props.saveRow}
              editedRow={this.props.estado}
              onClick={() => this.agregar("ESTADO")}
              inputModifier={this.props.setPropertyRow}
              deleteRow={idRow => this.props.deleteRow("ESTADO", idRow)}
            />
          </Col>
          <Col>
            <Section
              idRow="id"
              title="Transiciones"
              reducer="TRANSICION"
              saveRow={this.props.saveRow}
              rows={this.props.transiciones}
              editedRow={this.props.transicion}
              headers={["Inicial", "Símbolo", "Final"]}
              onClick={() => this.agregar("TRANSICION")}
              deleteRow={idRow => this.props.deleteRow("TRANSICION", idRow)}
              inputModifier={this.props.setPropertyRow}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transiciones: state.transiciones.transiciones,
  transicion: state.transiciones.transicion,
  simbolos: state.simbolos.simbolos,
  simbolo: state.simbolos.simbolo,
  estados: state.estados.estados,
  estado: state.estados.estado
});

export default connect(
  mapStateToProps,
  { editRow, saveRow, setPropertyRow, createRow, deleteRow }
)(Home);
