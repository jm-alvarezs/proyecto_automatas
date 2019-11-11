import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Input from "./Input";
import Button from "react-bootstrap/Button";

const item = (item, index, remove) => (
  <span key={index} className="border p-1 pl-2 pr-2 m-1 d-inline-block">
    {item.nombre}{" "}
    <Button
      variant="link"
      className="text-secondary"
      onClick={() => remove(item)}
    >
      <i className="fa fa-times text-danger"></i>
    </Button>
  </span>
);

const searchResult = (result, index, select) => (
  <div
    key={index}
    style={{ cursor: "pointer", width: "100%" }}
    onClick={() => select(result)}
    className="pl-0 pr-0"
  >
    {result.nombre}
  </div>
);

class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: undefined,
      selected: []
    };
    this.searchItems = this.searchItems.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    if(this.props.selected)
      this.setState({ selected: this.props.selected });
  }

  selectItem(item) {
    let searchResult = this.state.searchResult.filter(
      result => result !== item
    );
    if (searchResult.length === 0) searchResult = undefined;
    this.setState({
      selected: [...this.state.selected, item],
      searchResult
    });
    if (this.props.selectModifier) {
      if (this.props.args) this.props.selectModifier(this.props.args, item);
      else this.props.selectModifier(item);
    }
  }

  searchItems(query) {
    if (query === "") {
      this.setState({ searchResult: undefined });
      return;
    }
    if (!this.props.items) return;
    if (isNaN(query)) query = query.toLowerCase();
    let searchResult = this.props.items.filter(item => {
      let result = Object.keys(item).filter(key => {
        if (Array.isArray(item[key])) {
          return item[key].filter(subkey => {
            if (isNaN(subkey)) {
              if (subkey.toLowerCase().startsWith(query)) return item;
            } else if (subkey === query) return item;
            return null;
          });
        }
        if (isNaN(item[key])) {
          if (item[key].toLowerCase().startsWith(query)) {
            return item;
          }
        } else if (item[key] === query) {
          return item;
        }
        return null;
      });
      return result.length > 0;
    });
    this.setState({ searchResult });
  }

  removeItem(item) {
    let items = this.state.selected;
    let index = items.findIndex(currItem => currItem === item);
    items.splice(index, 1);
    this.setState({ selected: items });
    if (this.props.removeModifier) {
      if (this.props.args) this.props.removeModifier(this.props.args, item);
      else this.props.removeModifier(item);
    }
  }

  renderSelected() {
    if (this.state.selected)
      if (this.state.selected.length > 0)
        return (
          <Row>
            {this.state.selected.map((selected, index) =>
              item(selected, index, this.removeItem)
            )}
          </Row>
        );
  }

  renderSearchResults() {
    if (this.state.searchResult.length === 0)
      return <p>{this.props.failMessage}</p>;
    return this.state.searchResult.map((result, index) =>
      searchResult(result, index, this.selectItem)
    );
  }

  renderResult() {
    if (this.state.searchResult)
      return (
        <div
          className="card p-3 shadow-sm"
          style={{ position: "absolute", top: 150, width: "95%", zIndex: 10 }}
        >
          {this.renderSearchResults()}
        </div>
      );
  }

  renderLabel() {
    if (this.props.label)
      return (
        <Row>
          <label>{this.props.label}</label>
        </Row>
      );
  }

  render() {
    return (
      <Container fluid={true}>
        {this.renderLabel()}
        <Row>
          {this.renderResult()}
          <Input
            type="text"
            as="multiple"
            placeholder={this.props.placeholder}
            modifier={this.searchItems}
          />
        </Row>
        {this.renderSelected()}
      </Container>
    );
  }
}

export default MultipleSelect;
