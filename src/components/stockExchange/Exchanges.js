import { faEdit, faInfo, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

class Exchanges extends Component {
  constructor() {
    super();
    this.state = {
      exchanges: [],
    };
  }

  componentDidMount() {
    fetchExchanges().then((data) => {
      this.setState({
        exchanges: data,
      });
    });
  }

  render() {
    console.log(this.state.exchanges);
    return (
      <div className="navTabs">
        <h2 className="text-white">Manage Stock Exchanges</h2>
        <br />

        {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
          <Link to="exchanges/saveexchange">
            <Button className="btn btn-warning"> Add New Stock Exchange</Button>
          </Link>
        ) : (
          ""
        )}
        <br />
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> &nbsp; List of Stock Exchanges
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr align="center">
                  <th>Stock Exchange</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.exchanges.length === 0 ? (
                  <tr>
                    <td colSpan="3">No Stock Exchange listed...</td>
                  </tr>
                ) : (
                  this.state.exchanges.map((exchange, index) => (
                    <tr key={index}>
                      <td>{exchange.name}</td>
                      <td>{exchange.address}</td>
                      <td>
                        <ButtonGroup>
                          {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
                            <Link
                              to={"exchanges/edit/" + exchange.name}
                              className="btn btn-sm btn-danger"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          ) : (
                            ""
                          )}
                          <span> &nbsp; </span>
                          <Link
                            key={index}
                            to={"exchanges/details/" + exchange.name}
                            className="btn btn-sm btn-info"
                          >
                            <FontAwesomeIcon icon={faInfo} />
                          </Link>{" "}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const fetchExchanges = async () => {
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

export default Exchanges;
