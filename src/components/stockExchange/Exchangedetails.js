import React, { Component } from "react";

class Exchangedetails extends Component {
  constructor() {
    super();
    this.exchangename = "";
    this.state = {
      exchange: {},
      companies: [],
    };
  }

  componentDidMount() {
    this.exchangename = this.props.match.params.name;
    fetchCompany(this.exchangename).then((data) => {
      this.setState({
        exchange: data,
      });
    });

    fetchExchangeCompanies(this.exchangename).then((data) => {
      this.setState({
        companies: data,
      });
    });
  }

  render() {
    return (
      <div className="companydetail">
        <div>
          <h3>{this.state.exchange.name} Details</h3>
          <div>Exchange Id : {this.state.exchange.id}</div>
          <div>Address : {this.state.exchange.address}</div>
          <div>Brief : {this.state.exchange.brief}</div>
          <div>Remark : {this.state.exchange.remark}</div>
        </div>
        <hr />
        <div className="companyexchanges">
          <h3>{this.state.exchange.name} Companies</h3>
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

const fetchCompany = async (exchangename) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/stockexchanges/name/" + exchangename,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchExchangeCompanies = async (exchangename) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/stockexchanges/companies/name/" + exchangename,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export default Exchangedetails;
