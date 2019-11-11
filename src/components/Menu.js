import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Menu extends Component {
  render() {
    return (
      <Container fluid={true} className="mt-5">
        <h1>AFD</h1>
        <h2>Configuración</h2>
        {this.props.children}
        <h4>Juan Manuel Alvarez Sánchez</h4>
        <h4>511385 | OT-19</h4>
      </Container>
    );
  }
}
