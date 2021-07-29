import React, { Component } from "react";

class Companydetails extends Component {
  constructor() {
    super();
    this.companyname = "";
    this.state = {
      company: {},
      ipo: {},
      exchanges: [],
      sector: [],
    };
  }

  componentDidMount() {
    this.companyname = this.props.match.params.name;
    fetchCompany(this.companyname).then((data) => {
      this.setState({
        company: data,
      });
    });

    fetchCompanyIpo(this.companyname).then((data) => {
      this.setState({
        ipo: data,
      });
    });

    fetchCompanySector(this.companyname).then((data) => {
      this.setState({
        sector: data,
      });
    });

    fetchCompanyExchnages(this.companyname).then((data) => {
      this.setState({
        exchanges: data,
      });
    });
  }

  render() {
    return (
      <div className="companydetail">
        <div>
          <h3>{this.state.company.name} Details</h3>
          <div>Sector : {this.state.sector.sectorName}</div>
          <div>Company Id : {this.state.company.id}</div>
          <div>Turnover : {this.state.company.turnover}</div>
          <div>CEO : {this.state.company.ceo}</div>
          <div>Board of Directors : {this.state.company.boardOfDirectors}</div>
          <div>Brief : {this.state.company.companyBrief}</div>
        </div>
        <hr />
        <div className="companyipodetail">
          <h3>{this.state.company.name} IPO Details</h3>
          <div>IPO Id : {this.state.ipo.id}</div>
          <div>Price Per Share : {this.state.ipo.pricePerShare}</div>
          <div>
            Total Number Of Shares : {this.state.ipo.totalNumberOfShares}
          </div>
          <div>Open Date Time : {this.state.ipo.openDateTime}</div>
          <div>Remark : {this.state.ipo.remark}</div>
        </div>

        <div className="companyexchanges">
          <h3>{this.state.company.name} Stock Exchanges</h3>
          <ol>
            {this.state.exchanges.map((exchange, index) => (
              <li key={index}>{exchange.name}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

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

const fetchCompanyIpo = async (companyname) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/companies/ipo/" + companyname,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchCompanyExchnages = async (companyname) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/companies/stockexchanges/" + companyname,
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

export default Companydetails;
