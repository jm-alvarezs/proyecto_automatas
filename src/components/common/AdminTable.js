import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Input from "./Input";
import { isNumber } from "util";
import SearchBox from "./SearchBox";

class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: undefined
    };
    this.searchRows = this.searchRows.bind(this);
  }

  searchRows(query) {
    if (!this.props.rows) return;
    if (isNaN(query)) query = query.toLowerCase();
    let searchResult = this.props.rows.filter(row => {
      let result = Object.keys(row).filter(column => {
        if (Array.isArray(row[column])) {
          return row[column].filter(subcolumn => {
            if (isNaN(subcolumn)) {
              if (subcolumn.toLowerCase().startsWith(query)) return row;
            } else if (subcolumn === query) return row;
            return null;
          });
        }
        if (isNaN(row[column])) {
          if (row[column].toLowerCase().startsWith(query)) {
            return row;
          }
        } else if (row[column] === query) {
          return row;
        } else if (row[column] === Number(query)) {
          return row;
        }
        return null;
      });
      return result.length > 0;
    });
    this.setState({ searchResult });
  }

  renderHeaders() {
    if (this.props.headers) {
      return (
        <thead>
          <tr>
            {this.props.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {this.hasActions() ? (
              <th style={{ width: 150 }}>Acciones</th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
      );
    }
    return <></>;
  }

  hasActions() {
    return (
      this.props.editRow !== undefined ||
      this.props.deleteRow !== undefined ||
      this.props.customActions !== undefined ||
      this.props.saveRow !== undefined
    );
  }

  renderColumns(row) {
    return Object.keys(row).map((column, index) => {
      if (this.props.exclude) {
        if (this.props.exclude.includes(column)) return null;
      }
      if (column !== this.props.idRow || this.props.displayIdRow) {
        if (Array.isArray(row[column])) {
          return row[column].map((property, idx) => {
            if (this.props.editedRow)
              if (
                row[this.props.idRow] === this.props.editedRow[this.props.idRow]
              )
                return (
                  <td key={"col" + idx}>
                    <Input
                      type={
                        isNumber(property[this.props.columnKey])
                          ? "number"
                          : "text"
                      }
                      value={property[this.props.columnKey]}
                      modifier={this.props.inputModifier}
                      args={property[this.props.columnKey]}
                    />
                  </td>
                );
            return <td key={"col" + idx}>{property[this.props.columnKey]}</td>;
          });
        }
        if (this.props.editedRow) {
          if (this.props.editedRow[this.props.idRow] === row[this.props.idRow])
            return (
              <td key={"col" + index}>
                <Input
                  type={isNumber(this.props.editedRow[column]) ? "number" : "text"}
                  value={this.props.editedRow[column]}
                  modifier={this.props.inputModifier}
                  args={[column, this.props.reducer]}
                />
              </td>
            );
        }
        return <td key={"col-" + index}>{row[column]}</td>;
      }
      return null;
    });
  }

  renderActions(row) {    
    if (this.props.editedRow) {
      if (this.props.editedRow[this.props.idRow] === row[this.props.idRow])
        return (
          <td>
            <Button
              variant="outline-primary"
              onClick={() => this.props.saveRow(this.props.editedRow, this.props.reducer)}
            >
              Guardar
            </Button>
          </td>
        );
    }
    return (
      <td>
        {this.props.editRow ? (
          <Button
            variant="link"
            className="text-accent"
            onClick={() => this.props.editRow(row, this.props.reducer)}
          >
            <i className="fa fa-edit" />
          </Button>
        ) : (
          ""
        )}                
        {this.props.deleteRow !== undefined && this.props.confirm !== undefined ? (
          <Button
            variant="outline-danger"
            onClick={() =>
              this.props.confirm(
                `¿Está seguro que desea eliminar el ${this.props.rowName} ${
                  row[this.props.nameCol]
                }? ${this.props.consequence ? this.props.consequence : ""}`,
                () => this.props.deleteRow(row, this.props.reducer)
              )
            }
          >
            <i className="fa fa-trash" />
          </Button>
        ) : this.props.deleteRow !== undefined ? (
          <Button
            variant="outline-danger"
            onClick={() => this.props.deleteRow(row[this.props.idRow])}
          >
            <i className="fa fa-trash" />
          </Button>
        ) : (
          ""
        )}        
        {this.props.customActions
          ? this.props.customActions.map((action, index) => {
              return (
                <Button
                  key={index}
                  variant="link"
                  className={action.className}
                  onClick={() => action.action(row)}
                >
                  <i className={action.icon}></i>
                </Button>
              );
            })
          : ""}
      </td>
    );
  }

  renderRows() {
    let rowsToRender;
    if (this.state.searchResult) {
      rowsToRender = this.state.searchResult;
    } else if (this.props.rows) {
      rowsToRender = this.props.rows;
    }
    if (!rowsToRender) return <></>;
    return (
      <tbody>
        {rowsToRender.map((row, index) => {
          return (
            <tr
              key={"row" + index}
              onClick={
                this.props.viewRow
                  ? () => this.props.viewRow(row[this.props.idRow])
                  : () => {}
              }
              className={this.props.viewRow ? "pointer-cursor" : ""}
            >
              {this.renderColumns(row)}
              {this.hasActions() ? this.renderActions(row) : <></>}
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderSearchBox() {
    if (this.props.searchBox) {
      return (
        <SearchBox
          searchModifier={this.searchRows}
          placeholder={this.props.placeholder}
        />
      );
    }
    return <></>;
  }

  render() {
    return (
      <>
        {this.renderSearchBox()}
        <Table>
          {this.renderHeaders()}
          {this.renderRows()}
        </Table>
      </>
    );
  }
}

export default AdminTable;
