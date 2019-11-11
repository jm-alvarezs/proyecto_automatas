import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import { clearSuccess } from "../../actions/modalActions";
import { connect } from "react-redux";

class SuccessAlert extends Component {
  render() {
    if (this.props.showSuccess)
      return (
        <Alert
          variant="success"
          className="fixed-top fixed-right ml-auto mr-2 mt-3"
          style={{ maxWidth: 500, zIndex: 2500 }}
          onClose={this.props.clearSuccess}
          dismissible
        >
          {this.props.content}
        </Alert>
      );
    return <></>;
  }
}

const mapStateToProps = state => ({
  showSuccess: state.modal.showSuccess,
  content: state.modal.successContent
});

export default connect(
  mapStateToProps,
  { clearSuccess }
)(SuccessAlert);
