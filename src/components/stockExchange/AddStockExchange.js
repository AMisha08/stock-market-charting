import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { faList, faPenSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddStockExchange extends Component {
  submitHandler(event) {
    event.preventDefault();
    let data = {
      name: event.target.elements.exchangename.value,
      brief: event.target.elements.brief.value,
      address: event.target.elements.address.value,
      remark: event.target.elements.remark.value,
    };
    sendData(JSON.stringify(data)).then((res) => {
      //alert("Exchange Added Successfully with Id : "+res.id);
      window.location.href = "http://localhost:3000/exchanges";
    });
  }

  goToCompanyList = () => {
    window.location.href = "http://localhost:3000/exchanges";
  };

  render() {
    return (
      <div className="savecompany text-white">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header as="h2">
            <FontAwesomeIcon icon={faPenSquare} /> &nbsp; Add New Stock Exchange
          </Card.Header>
          <Form onSubmit={this.submitHandler}>
            <Card.Body className={"px-5"}>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="companyName"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="exchangename"
                    placeholder="Enter exchange name"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="ceo" className="col-md-6 py-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="boardOfDirectors"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    name="remark"
                    placeholder="Enter remarks"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="description"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="brief"
                    placeholder="Enter brief description"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer className={"px-5"}>
              <Button variant="success" type="submit" value="Save">
                <FontAwesomeIcon icon={faSave} /> &nbsp; {"Update"}
              </Button>{" "}
              <Button
                variant="primary"
                type="button"
                onClick={this.goToCompanyList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> &nbsp;Go to Stock Exchange
                List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const sendData = async (data) => {
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/stockexchanges", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  const res = await response.json(); //extract JSON from the http response
  return res;
};

export default AddStockExchange;
