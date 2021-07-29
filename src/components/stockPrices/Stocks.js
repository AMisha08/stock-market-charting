import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Col, Table } from "react-bootstrap";
import {
  faMoneyBillAlt,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Stocks extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      companies: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
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
    console.log(event.target.elements.companyname.value);
    fetchStocks(event.target.elements.companyname.value).then((res) => {
      this.setState({
        stocks: res,
      });
    });
  }

  render() {
    return (
      <div className="navTabs">
        <br />

        {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
          <Link to="stocks/importstocks">
            <Button className="btn btn-warning"> Import Stock Prices</Button>
          </Link>
        ) : (
          ""
        )}
        <br />

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faMoneyBillAlt} /> &nbsp;View Stock Prices
          </Card.Header>

          <Form id="mapCompanyForm" onSubmit={this.submitHandler}>
            <Card.Body className={"px-5"}>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="companyname"
                  className="col-md-6 py-3"
                >
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="companyname"
                    placeholder="Choose company"
                    className={"bg-dark text-white"}
                  >
                    <option key="-1">Choose company</option>
                    {this.state.companies.map((company, index) => (
                      <option
                        className="companyTab"
                        key={index}
                        value={company.name}
                      >
                        {company.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer className={"px-5"}>
              <Button variant="success" type="submit" value="Search">
                <FontAwesomeIcon icon={faSearchDollar} /> &nbsp; Search
              </Button>
            </Card.Footer>
          </Form>
          <br />

          <Table bordered hover striped variant="dark">
            <thead>
              <tr style={{ backgroundColor: "#7512C5", color: "white" }}>
                <th>Company Code</th>
                <th>Stock Exchage</th>
                <th>Price (in INR)</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stocks.length === 0 ? (
                <tr>
                  <td colSpan="5">No stock prices listed...</td>
                </tr>
              ) : (
                this.state.stocks.map((stocks, index) => (
                  <tr key={index}>
                    <td>{stocks.companyCode}</td>
                    <td>{stocks.stockExchangeName}</td>
                    <td>{stocks.shareprice}</td>
                    <td>{stocks.stockPriceDate}</td>
                    <td>{stocks.stockPriceTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}

const fetchStocks = async (companyname) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/stockprice/company/" + companyname,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
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

export default Stocks;
