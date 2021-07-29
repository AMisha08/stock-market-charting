import React, { Component } from "react";
import { faPlusSquare, faSave, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, Button, Col } from "react-bootstrap";

class AddCompany extends Component {
  constructor() {
    super();
    this.state = {
      sectors: [],
    };
  }

  componentDidMount() {
    fetchAvailabeSectors().then((data) => {
      this.setState({
        sectors: data,
      });
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let data = {
      company: {
        name: event.target.elements.companyname.value,
        turnover: event.target.elements.turnover.value,
        ceo: event.target.elements.ceo.value,
        boardOfDirectors: event.target.elements.directors.value,
        companyBrief: event.target.elements.brief.value,
      },
      sectorId: event.target.elements.sector.value,
    };
    sendData(JSON.stringify(data)).then((res) => {
      //alert("Company Added Successfully with Id : "+res.id);
      window.location.href = "https://stock-market-charting-frontend.herokuapp.com/companies";
    });
  }

  goToCompanyList = () => {
    window.location.href = "https://stock-market-charting-frontend.herokuapp.com/companies";
  };

  render() {
    return (
      <div className="savecompany">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> &nbsp; Add New Company
          </Card.Header>
          <Form id="addCompanyForm" onSubmit={this.submitHandler}>
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
                    name="companyname"
                    placeholder="Enter company name"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="sectorName"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Sector</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="sector"
                    placeholder="Choose sector"
                    className={"bg-dark text-white"}
                  >
                    <option key="-1">Choose Sector</option>
                    {this.state.sectors.map((sector, index) => (
                      <option
                        className="companyTab"
                        key={index}
                        value={sector.id}
                      >
                        {sector.sectorName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="ceo" className="col-md-6 py-2">
                  <Form.Label>CEO</Form.Label>
                  <Form.Control
                    required
                    type="text" name="ceo"
                    placeholder="Enter name of ceo"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="boardOfDirectors"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Board Of Directors</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="directors"
                    placeholder="Enter name of directors"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="turnover"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Turnover</Form.Label>
                  <Form.Control
                    required
                    type="number" name="turnover"
                    step="10000.01"
                    min="1.0"
                    placeholder="0.0"
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
              </Button>{" "}
              <Button
                variant="primary"
                type="button"
                onClick={this.goToCompanyList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> &nbsp;Go to Company List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const sendData = async (data) => {
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/companies", {
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

const fetchAvailabeSectors = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/sectors", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  return data;
};

export default AddCompany;
