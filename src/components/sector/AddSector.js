import React, { Component } from "react";
import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, Button, Col } from "react-bootstrap";

class AddSector extends Component {
  submitHandler(event) {
    event.preventDefault();
    let data = {
      sectorName: event.target.elements.sectorname.value,
      brief: event.target.elements.brief.value,
    };
    console.log("sector");
    console.log(data);
    sendData(JSON.stringify(data)).then((res) => {
      window.location.href = "http://localhost:3000/sectors";
    });
    window.location.href = "http://localhost:3000/sectors";
  }

  render() {
    return (
      <div className="savecompany text-white">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> &nbsp; Add New Sector
          </Card.Header>
          <Form onSubmit={this.submitHandler}>
            <Card.Body className={"px-5"}>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="sectorname"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="sectorName"
                    placeholder="Enter sector Name"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="description"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
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
                <FontAwesomeIcon icon={faSave} /> &nbsp; Save
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const sendData = async (data) => {
  console.log(data);
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/sectors", {
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

export default AddSector;
