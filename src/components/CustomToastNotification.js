import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export default class CustomToastNotification extends Component {
  // constructor(props) {
  //     super(props);
  // }
  render() {
    const toastStyle = {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: "1",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    };
    return (
      <div style={this.props.show ? toastStyle : null}>
        <Toast
          className={`text-white border ${
            this.props.headerMessage === "Success"
              ? "border-success bg-success"
              : "border-danger bg-danger"
          }`}
          show={this.props.show}
        >
          <Toast.Header
            className={`text-white ${this.props.headerMessage === "Success" ? "bg-success" : "bg-danger"}`}
            closeButton={false}
          >
            <strong className={"mr-auto"}>{this.props.headerMessage}</strong>
          </Toast.Header>
          <Toast.Body>{this.props.message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}
