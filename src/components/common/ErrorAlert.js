import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import { clearAlert } from "../../actions/modalActions";
import { connect } from "react-redux";

class ErrorAlert extends Component {
  render() {
    if (this.props.showAlert)
      return (
        <Alert
          variant="danger"
          className="fixed-top fixed-right ml-auto mr-2 mt-3"
          style={{ maxWidth: 500, zIndex: 2500 }}
          onClose={this.props.clearAlert}
          dismissible
        >
          {this.props.content}
        </Alert>
      );
    return <></>;
  }
}

const mapStateToProps = state => ({
  showAlert: state.modal.showAlert,
  content: state.modal.alertContent
});

export default connect(
  mapStateToProps,
  { clearAlert }
)(ErrorAlert);
