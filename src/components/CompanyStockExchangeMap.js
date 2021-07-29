import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CompanyStockExchangeMap extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      exchanges: [],
    };
  }

  componentDidMount() {
    fetchAvailabeCompanies().then((data) => {
      this.setState({
        companies: data,
      });
    });

    fetchAvailableExchanges().then((data) => {
      this.setState({
        exchanges: data,
      });
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let data = {
      companyname: event.target.elements.company.value,
      companyCode: event.target.elements.code.value,
      stockexchangename: event.target.elements.exchange.value,
    };
    sendData(JSON.stringify(data)).then((res) => {
      window.location.href = "https://stock-market-charting-frontend.herokuapp.com/companies";
    });
  }

  render() {
    return (
      <div className="savecompany">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> &nbsp; Map a company to
            stock exchange
          </Card.Header>
          <Form
            id="mapCompanyForm"
            onSubmit={this.submitHandler}
            autoComplete="off"
          >
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

                <Form.Group
                  as={Col}
                  controlId="stockExchangeName"
                  className="col-md-6 py-3"
                >
                  <Form.Label>Stock Exchange</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="exchange"
                    placeholder="Choose stock exchange"
                    className={"bg-dark text-white"}
                  >
                    <option key="-1">Choose Stock Exchange</option>
                    {this.state.exchanges.map((exchange, index) => (
                      <option key={index} value={exchange.name}>
                        {exchange.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="companyCode"
                  className="col-md-6  py-3"
                >
                  <Form.Label>Company Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    required
                    placeholder="Enter company code as 00 + Company id"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer>
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
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/map", {
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

const fetchAvailableExchanges = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/stockexchanges", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  return data;
};
