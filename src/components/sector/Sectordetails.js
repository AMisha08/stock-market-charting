import React, { Component } from "react";

class Sectordetails extends Component {
  constructor() {
    super();
    this.sectorid = "";
    this.state = {
      sector: {},
      companies: [],
    };
  }

  componentDidMount() {
    this.sectorid = this.props.match.params.sid;
    fetchSector(this.sectorid).then((data) => {
      this.setState({
        sector: data,
      });
    });

    fetchSectorCompanies(this.sectorid).then((data) => {
      this.setState({
        companies: data,
      });
    });
  }

  render() {
    return (
      <div className="companydetail">
        <div>
          <h3>{this.state.sector.sectorName} Sector Details</h3>
          <div>Sector Id : {this.state.sector.id}</div>
          <br />
          <div>Brief : {this.state.sector.brief}</div>
        </div>
        <hr />
        <div className="companyexchanges">
          <h3>{this.state.sector.name} Sector Companies</h3>
          <ol>
            {this.state.companies.map((company, index) => (
              <li key={index}>{company.name}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

const fetchSector = async (id) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/sectors/" + id, {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchSectorCompanies = async (id) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/sectors/companies/" + id,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export default Sectordetails;
