import React, { Component } from "react";
import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, Button, Col } from "react-bootstrap";

class AddIpoDetail extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    fetchAvailabeCompanies().then((data) => {
      this.setState({
        companies: data,
      });
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let data = {
      ipo: {
        pricePerShare: event.target.elements.price.value,
        totalNumberOfShares: event.target.elements.noshare.value,
        openDateTime: event.target.elements.datetime.value,
        remark: event.target.elements.remark.value,
      },
      companyname: event.target.elements.company.value,
    };
    sendData(JSON.stringify(data)).then((res) => {
      //alert("IPO Added Successfully with Id : "+res.id);
      window.location.href = "http://localhost:3000/ipos";
    });
  }

  render() {
    return (
      <div className="savecompany">        

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> &nbsp; Add New IPO
          </Card.Header>
          <Form onSubmit={this.submitHandler}>
            <Card.Body className={"px-5"}>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="stockExchangeName"
                  className="col-md-6 py-3"
                >
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="company"
                    placeholder="Choose company"
                    className={"bg-dark text-white"}
                  >
                    <option key="-1">Choose company</option>
                    {this.state.companies.map((company, index) => (
                      <option key={index} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="pricePerShare"
                  className="col-md-6 py-2"
                >
                  <Form.Label>price Per Share</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="10.00"
                    name="price"
                    placeholder="0.0"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="noshare"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Total Share</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="noshare"
                    placeholder="0"
                    defaultValue="0"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="remark"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Open Date and Time (date + T + time)</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="datetime"
                    placeholder="Eg - 2021-07-29T11:08:04.017494"
                    defaultValue="2021-07-29T11:08:04.017494"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="remark"
                  className="col-md-6 py-2"
                >
                  <Form.Label>remark</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    name="remark"
                    placeholder="Enter brief remark"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer className={"px-5"}>
              <Button variant="success" type="submit">
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
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/ipo", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  const res = await response.json();
  return res;
};

const fetchAvailabeCompanies = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/companies", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  return data;
};

export default AddIpoDetail;
