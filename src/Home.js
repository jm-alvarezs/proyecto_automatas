import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Menu from "./components/Menu";
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
        schema = { id: this.props.estados.length, nombre: "" };
        break;
      case "TRANSICION":
        schema = { inicial: 0, final: 0, simbolo: "" };
        break;
      default:
        schema = { id: 0 };
    }
    this.props.createRow(reducer, schema);
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col
            md={6}
            style={{ minHeight: "100vh" }}
          >
            <Menu>
              <Section
                idRow="id"
                title="Símbolos"
                reducer="SIMBOLO"
                rows={this.props.simbolos}
                editedRow={this.props.simbolo}
                saveRow={this.props.saveRow}                
                onClick={() => this.agregar("SIMBOLO")}
                inputModifier={this.props.setPropertyRow}
                deleteRow={idRow => this.props.deleteRow("SIMBOLO", idRow)}
                headers={["Símbolo"]}
              />
              <Section
                idRow="id"
                title="Estados"
                rows={this.props.estados}
                editedRow={this.props.estado}
                onClick={() => this.agregar("ESTADO")}
                headers={["Nombre"]}
                saveRow={this.props.saveRow}
                reducer="ESTADO"
                inputModifier={this.props.setPropertyRow}
                deleteRow={idRow => this.props.deleteRow("ESTADO", idRow)}
              />
              <Section
                title="Transiciones"
                rows={this.props.transiciones}
                editedRow={this.props.transicion}
                onClick={() => this.agregar("TRANSICION")}
                headers={["Inicial"].concat(this.props.simbolos.map(simbolo => simbolo.simbolo))}
              />
            </Menu>
          </Col>
          <Col md={6}>
            <h2 className="ml-5 mt-5">Cadena a Evaluar</h2>
            <Card className="p-4 ml-5 mr-5">
              <Card.Body>
                <Input value={this.state.cadena} className="mb-3" />
                <Button onClick={this.submit} block>
                  Evaluar
                </Button>
              </Card.Body>
            </Card>
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
