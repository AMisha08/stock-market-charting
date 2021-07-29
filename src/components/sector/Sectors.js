import { faInfo, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

class Sectors extends Component {
  constructor() {
    super();
    this.state = {
      sectors: [],
    };
  }

  componentDidMount() {
    fetchExchanges().then((data) => {
      this.setState({
        sectors: data,
      });
    });
  }

  render() {
    return (
      <div className="navTabs">
        <br />
        {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
          <Link to="sectors/savesector">
            <Button className="btn btn-warning"> Add New Sector</Button>
          </Link>
        ) : (
          ""
        )}
        <br />
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> &nbsp; List of sector
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr align="center">
                  <th>Sector ID</th>
                  <th>Sector</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sectors.length === 0 ? (
                  <tr>
                    <td colSpan="5">No Sector listed...</td>
                  </tr>
                ) : (
                  this.state.sectors.map((sector) => (
                    <tr key={sector.id}>
                      <td>{sector.id}</td>
                      <td>{sector.sectorName}</td>
                      <td>{sector.brief}</td>
                      <td>
                        <ButtonGroup>
                          <span> &nbsp; </span>
                          <Link
                            to={"sectors/details/" + sector.id}
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
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/sectors", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  return data;
};

export default Sectors;
