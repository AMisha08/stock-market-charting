import { faEdit, faInfo, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, Table} from "react-bootstrap";
import { Link } from "react-router-dom";

class Companies extends Component {
  render() {
    console.log(this.props.companies);
    return (
      <div className="navTabs">
        <h2 className="text-white">Manage Companies</h2>
        <br />

        {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
          <Link to="companies/savecompany">
            <Button className="btn btn-warning"> Add New Company</Button>
          </Link>
        ) : (
          ""
        )}
        <br />

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> &nbsp; List of Companies
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr align="center">
                  <th>Company</th>
                  <th>CEO</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.companies.length === 0 ? (
                  <tr>
                    <td colSpan="4">No Company listed...</td>
                  </tr>
                ) : (
                  this.props.companies.map((company, index) => (
                    <tr key={index}>
                      <td>{company.name}</td>
                      <td>{company.ceo}</td>
                      <td>{company.companyBrief}</td>
                      <td>
                        <ButtonGroup>
                          {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
                            <Link
                              to={"companies/edit/" + company.name}
                              className="btn btn-sm btn-danger"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          ) : (
                            ""
                          )}
                          <span> &nbsp; </span>
                          <Link
                            to={"companies/details/" + company.name}
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

export default Companies;
