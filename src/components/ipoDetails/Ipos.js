import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Ipos extends React.Component {
  constructor() {
    super();
    this.state = {
      ipos: [],
    };
  }

  componentDidMount() {
    fetchIpos().then((data) => {
      this.setState({
        ipos: data,
      });
    });
  }

  render() {
    console.log(this.state.ipos);
    return (
      <div className="navTabs">
        <br />

        <h2 className="text-white">Manage IPOs</h2>
        <br />

        {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
          <Link to="ipos/saveipo">
            <Button className="btn btn-warning"> Add New IPO</Button>
          </Link>
        ) : (
          ""
        )}
        <br />

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> &nbsp; List of IPOs
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr align="center">
                  <th>IPO ID</th>
                  <th>Price per share</th>
                  <th>Total share</th>
                  <th>Open Date and time</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ipos.length === 0 ? (
                  <tr>
                    <td colSpan="5">No IPOs listed...</td>
                  </tr>
                ) : (
                  this.state.ipos.map((ipo) => (
                    <tr key={ipo.id}>
                      <td>{ipo.id}</td>
                      <td>{ipo.pricePerShare}</td>
                      <td>{ipo.totalShares}</td>
                      <td>{ipo.openDateTime}</td>
                      <td>{ipo.remark}</td>
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

const fetchIpos = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/ipo", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  return data;
};

export default Ipos;
