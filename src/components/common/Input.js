import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";
import ReactDOM from "react-dom";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";
import CheckBox from "./CheckBox";

moment.locale("es", {
  monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_")
});

class Input extends Component {
  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.state = {
      value: this.getValue(),
      file: "",
      showPicker: false
    };
  }

  getValue() {
    if (this.props.value) {
      return this.props.value;
    }
    if (this.props.type === "date" && !this.props.value) {
      return new Date();
    }
    return "";
  }

  getDate() {
    return new Date(this.props.value);
  }

  //Modifier: An action to make changes in the parent component or through Redux
  handleChange(evt) {
    let value;
    if (this.props.as === "select") {
      value = ReactDOM.findDOMNode(this.select).value;
    } else {
      value = evt.target.value;
    }
    this.setState({ value });
    if (this.props.type === "file") {
      let data = document.querySelector("[type=file]").files;
      if (!this.props.multiple) {
        data = data[0];
      }
      if (this.props.args) this.props.modifier(this.props.args, data);
      else this.props.modifier(data);
    } else {
      if (this.props.modifier) {
        if (this.props.args !== undefined) {
          if (Array.isArray(this.props.args)) {
            this.props.modifier(...this.props.args.map(arg => arg), value);
          } else this.props.modifier(this.props.args, value);
        } else this.props.modifier(value);
      }
    }
  }

  selectDate(date) {
    this.setDate(date);
    this.togglePicker();
  }

  setDate(date) {
    let value = date;
    this.setState({ value });
    if (this.props.modifier) {
      if (this.props.args !== undefined) {
        this.props.modifier(this.props.args, value);
      } else this.props.modifier(value);
    }
  }

  togglePicker() {
    this.setState({
      showPicker: !this.state.showPicker
    });
  }

  componentDidMount() {
    if (this.props.type === "date") {
      let date = this.getDate();
      this.setDate(date);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.setState({ value: this.getValue() });
  }

  renderCalendar() {
    if (this.state.showPicker)
      return (
        <InfiniteCalendar
          selected={this.getDate()}
          minDate={new Date(2000, 0, 1)}
          width={285}
          height={285}
          className="mt-2"
          locale={{
            blank: "Selecciona una fecha...",
            headerFormat: "DD MMM 20YY",
            todayLabel: { long: "Hoy" },
            weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekStartsOn: 0
          }}
          theme={{
            selectionColor: "#FC6767",
            textColor: {
              default: "#333",
              active: "#FFF"
            },
            weekdayColor: "#fff",
            headerColor: "#FC6767",
            floatingNav: {
              background: "#FC6767",
              color: "#FFF",
              chevron: "#FFA726"
            }
          }}
          displayOptions={{
            showTodayHelper: false
          }}
          onSelect={this.selectDate}
        />
      );
    return null;
  }

  renderLabel() {
    if (this.props.label) return <Form.Label>{this.props.label}</Form.Label>;
    return <></>;
  }

  renderOptions() {
    if (this.props.options) {
      return this.props.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ));
    }
    return <></>;
  }


  renderSelectInput() {
    return (
      <Form.Group>
        {this.renderLabel()}
        <Form.Control
          as={this.props.as}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.state.value}
          style={this.props.styles}
          id={this.props.id ? this.props.id : null}
          onKeyPress={this.props.onKeyPress ? this.props.onKeyPress : null}
          multiple={this.props.multiple ? this.props.multiple : false}
          accept={this.props.accept}
          rows={this.props.rows}
          className={this.props.className}
          min={this.props.min}
          max={this.props.max}
          ref={select => (this.select = select)}
        >
          {this.renderOptions()}
        </Form.Control>
      </Form.Group>
    );
  }

  renderCheckInput() {
    return (
      <Row className="ml-0 mr-0">
        <CheckBox checked={this.props.checked} modifier={this.props.modifier} args={this.props.args} /> {this.renderLabel()}
      </Row>
    );
  }

  renderMultiple() {
    return (
      <>
        {this.renderLabel()}
        <Form.Control
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          style={this.props.styles}
          id={this.props.id ? this.props.id : null}
          onKeyPress={this.props.onKeyPress ? this.props.onKeyPress : null}
          multiple={this.props.multiple ? this.props.multiple : false}
          accept={this.props.accept}
          rows={this.props.rows}
          className={this.props.className}
          min={this.props.min}
          max={this.props.max}
        />
      </>
    );
  }

  renderDefaultInput() {
    return (
      <>
        {this.renderLabel()}
        <Form.Control
          as={this.props.as}
          type={this.props.type}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          style={this.props.styles}
          id={this.props.id ? this.props.id : null}
          onKeyPress={this.props.onKeyPress ? this.props.onKeyPress : null}
          multiple={this.props.multiple ? this.props.multiple : false}
          accept={this.props.accept}
          rows={this.props.rows}
          className={this.props.className}
          min={this.props.min}
          max={this.props.max}
          disabled={this.props.disabled}
        />
      </>
    );
  }

  renderDateInput() {
    return (
      <>
        <Button variant="outline-secondary" onClick={this.togglePicker}>
          <i className="fas fa-calendar" />
        </Button>
        <Form.Control
          className={
            (this.props.className ? this.props.className : "") + " ml-2"
          }
          type="text"
          disabled={true}
          value={this.state.value}
          style={{ width: "auto", display: "inline-block" }}
        />
        {this.renderCalendar()}
      </>
    );
  }

  render() {
    if (this.props.type !== "date") {
      if (this.props.as === "select")
        return this.renderSelectInput();
      if (this.props.as === "check") 
        return this.renderCheckInput();
      if(this.props.as === "multiple")
        return this.renderMultiple();
      return this.renderDefaultInput();
    }
    return this.renderDateInput()
  }
}

export default Input;
