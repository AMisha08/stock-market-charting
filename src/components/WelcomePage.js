import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Form, Nav, Navbar, Row } from "react-bootstrap";
import { Route, NavLink } from "react-router-dom";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

class WelcomePage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar>
            <Nav className="me-auto">
              <NavLink
                to="/login"
                className="btn btn-secondary navButtons  text-white"
              >
                {" "}
                LOGIN{" "}
              </NavLink>
              <NavLink
                to="/signup"
                className="btn btn-secondary navButtons  text-white"
              >
                {" "}
                REGISTER{" "}
              </NavLink>
            </Nav>
          </Navbar>
        </div>

        <Route
          exact
          path="/login"
          render={() => (
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <Card className={"border border-dark bg-dark text-white"}>
                  <Card.Header as="h5" className="mt-3">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Card.Header>
                  <Form onSubmit={this.props.login}>
                    <Card.Body className="py-3">
                      <Form.Row className="m-3">
                        <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                          <Form.Control
                            required
                            autoComplete="off"
                            type="text"
                            name="username"
                            className={"bg-dark text-white"}
                            placeholder="Enter username"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row className="m-3">
                        <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                          <Form.Control
                            required
                            autoComplete="off"
                            type="password"
                            name="password"
                            className={"bg-dark text-white"}
                            placeholder="Enter password"
                          />
                        </Form.Group>
                      </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                      <Button size="sm" type="submit" variant="success">
                        <FontAwesomeIcon icon={faSignInAlt} /> Login
                      </Button>{" "}
                    </Card.Footer>
                  </Form>
                </Card>
              </Col>
            </Row>
          )}
        />

        <Route
          exact
          path="/signup"
          render={() => (
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <Card className={"border border-dark bg-dark text-white"}>
                  <Card.Header as="h5" className="mt-3">
                    <FontAwesomeIcon icon={faSignInAlt} /> Register
                  </Card.Header>
                  <Form onSubmit={this.props.signup}>
                    <Card.Body className="py-3">
                      <Form.Row className="m-3">
                        <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                          <Form.Control
                            required
                            autoComplete="off"
                            type="text"
                            name="username"
                            className={"bg-dark text-white"}
                            placeholder="Enter username"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row className="m-3">
                        <Form.Group as={Col}>
                        <Form.Label>Email ID</Form.Label>
                            <Form.Control
                              required
                              autoComplete="off"
                              type="email"
                              name="email"
                              className={"bg-dark text-white"}
                              placeholder="Enter email"
                            />
                        </Form.Group>
                      </Form.Row>                      
                      <Form.Row className="m-3">
                        <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                              required
                              autoComplete="off"
                              type="password"
                              name="password"
                              className={"bg-dark text-white"}
                              placeholder="Enter password"
                            />
                        </Form.Group>
                      </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                      <Button size="sm"
                        type="submit"
                        variant="success"
                        value="Sign Up"
                      >
                        <FontAwesomeIcon icon={faSignInAlt} /> Register
                      </Button>{" "}
                      {"  "}
                    </Card.Footer>
                  </Form>
                </Card>
              </Col>
            </Row>
          )}
        />
      </div>
    );
  }
}

export default WelcomePage;
