import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { setResponse, clearModal } from "../../actions/modalActions";
import { connect } from "react-redux";

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  handleClose(response) {
    this.props.setResponse(response);
    if(response === true) this.props.callback();
    else if(this.props.onClose) this.props.onClose();
    this.props.clearModal();
  }

  render() {
    return (
      <Modal id="modal-confirm" show={this.props.show} style={{borderRadius: 25, zIndex: 2500}} size={this.props.size ? this.props.size : "lg"} onHide={this.props.clear}>
        <Modal.Header>
          <Modal.Title className="pl-3 pr-3">{this.props.title ? <b>{this.props.title}</b> : "Precaución"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: "#fff"}}>
          {this.props.component ? this.props.component : <p>{this.props.content}</p>}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#fff"}}className="text-right">
          <Button variant="outline-primary" size="sm" onClick={() => this.handleClose(false)}>No</Button>
          <Button size="sm"style={{width: 200}} onClick={() => this.handleClose(true)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  show: state.modal.show,
  content: state.modal.content,
  callback: state.modal.callback,
  title: state.modal.title,
  onClose: state.modal.onClose,
  component: state.modal.component
})

export default connect(mapStateToProps, { setResponse, clearModal })(ModalConfirm);