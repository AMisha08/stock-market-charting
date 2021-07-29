import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

class PageHeader extends Component {
  render() {
    return (
      <div className="title">
        <Container>
          <Row>
            <Col lg={12} style={{ marginTop: "20px" }} className="mb-3 text-center">
              <h1>Stock Market Charting <FontAwesomeIcon icon={faCommentDollar} /> </h1>
              <br/>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default PageHeader;
