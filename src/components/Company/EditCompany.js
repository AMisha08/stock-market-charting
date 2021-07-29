import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { faList, faPenSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditCompany extends Component {
  constructor() {
    super();
    this.companyname = "";

    this.state = {
      company: {},
      sectorId: 0,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.companyname = this.props.match.params.name;
    fetchCompany(this.companyname).then((data) => {
      this.setState({
        company: data,
      });
    });
    fetchCompanySector(this.companyname).then((data) => {
      this.setState({
        sectorId: data.id,
      });
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let data = {
      company: {
        id: event.target.elements.companyid.value,
        name: event.target.elements.companyname.value,
        turnover: event.target.elements.turnover.value,
        ceo: event.target.elements.ceo.value,
        boardOfDirectors: event.target.elements.directors.value,
        companyBrief: event.target.elements.brief.value,
      },
      sectorId: this.state.sectorId,
    };
    console.log(data);
    sendData(JSON.stringify(data)).then((res) => {
      window.location.href = "https://stock-market-charting-frontend.herokuapp.com/companies";
    });
  }

  goToCompanyList = () => {
    return this.props.history.push("/companies");
  };

  render() {
    return (
      <div className="savecompany">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header as="h2">
            <FontAwesomeIcon icon={faPenSquare} /> &nbsp; Update Details of{" "}
            {this.companyname}
          </Card.Header>
          <Form
            id="EditCompanyForm"
            onSubmit={this.submitHandler}
            onChange={this.handleChange}
          >
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
                    defaultValue={this.state.company.name}
                    placeholder="Enter company name"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="ceo" className="col-md-6 py-2">
                  <Form.Label>CEO</Form.Label>
                  <Form.Control
                    type="text"
                    name="ceo"
                    defaultValue={this.state.company.ceo}
                    placeholder="Enter name of ceo"
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
                  <Form.Label>Board Of Directors</Form.Label>
                  <Form.Control
                    type="text"
                    name="directors"
                    defaultValue={this.state.company.boardOfDirectors}
                    placeholder="Enter name of directors"
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="turnover"
                  className="col-md-6 py-2"
                >
                  <Form.Label>Turnover</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="turnover"
                    defaultValue={this.state.company.turnover}
                    placeholder="0.0"
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
                    defaultValue={this.state.company.companyBrief}
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
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  const res = await response.json(); //extract JSON from the http response
  return res;
};

const fetchCompany = async (companyname) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/companies/" + companyname,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchCompanySector = async (companyname) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/companies/sector/" + companyname,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export default EditCompany;
