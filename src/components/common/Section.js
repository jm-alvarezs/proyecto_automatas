import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class ProductSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {
    if (this.props.collapsible) this.setState({ collapsed: true });
  }

  renderContent() {
    if (!this.state.collapsed)
      return (
        <Row className="mt-2">
          <Container fluid={true}>{this.props.children}</Container>
        </Row>
      );
  }

  renderButton() {
    if (this.props.collapsible) return this.renderCollapse();
    return this.renderAction();
  }

  renderAction() {
    if (this.props.onClick || this.props.buttonTitle)
      return (
        <Button variant="link" className="text-accent" onClick={this.props.onClick}>
          {this.props.buttonTitle}
        </Button>
      );
  }

  renderCollapse() {
    if (this.props.collapsible)
      return (
        <Button
          variant="link"
          className="text-dark"
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}
        >
          <i
            className={
              this.state.collapsed ? "fa fa-chevron-down" : "fa fa-chevron-up"
            }
          ></i>
        </Button>
      );
  }

  render() {
    return (
      <Row>
        <Container fluid={true} className="mt-2">
          <Card className="p-3 shadow round15">
            <Row>
              <Col xs={9} sm={10}>
                {this.props.title ? <h5>{this.props.title}</h5> : ""}
              </Col>
              <Col xs={3} sm={2} className="text-right pr-4">{this.renderButton()}</Col>
            </Row>
            {this.renderContent()}
          </Card>
        </Container>
      </Row>
    );
  }
}

export default ProductSection;
