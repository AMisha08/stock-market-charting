import Stocks from "./stockPrices/Stocks";
import ImportStocks from "./stockPrices/ImportStocks";
import Sectors from "./sector/Sectors";
import AddSector from "./sector/AddSector";
import React, { Component } from "react";
import PageHeader from "./PageHeader";
import Companies from "./Company/Companies";
import { NavLink, Route } from "react-router-dom";
import Companydetails from "./Company/Companydetails";
import AddCompany from "./Company/AddCompany";
import EditCompany from "./Company/EditCompany";
import Exchanges from "./stockExchange/Exchanges";
import Exchangedetails from "./stockExchange/Exchangedetails";
import AddStockExchange from "./stockExchange/AddStockExchange";
import EditExchange from "./stockExchange/EditExchange";
import Ipos from "./ipoDetails/Ipos";
import AddIpoDetail from "./ipoDetails/AddIpoDetail";
import CompanyStockExchangeMap from "./CompanyStockExchangeMap";
import Sectordetails from "./sector/Sectordetails";
import Analyse from "./comparisionCharts/Analyse";
import WelcomePage from "./WelcomePage";
import { Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      companyList: [],
      loggedin: checklogin(),
      role: "",
    };
    this.onLogin = this.onLogin.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    fetchCompanies().then((data) => {
      this.setState({
        companyList: data,
      });
    });
  }

  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");
    window.location.href = "https://stock-market-charting-frontend.herokuapp.com/";
  }

  onSignUp(event) {
    event.preventDefault();
    if (
      event.target.elements.passworda.value ==
      event.target.elements.passwordb.value
    ) {
      let data = {
        name: event.target.elements.username.value,
        password: event.target.elements.passworda.value,
        email: event.target.elements.email.value,
      };

      signup(JSON.stringify(data)).then((res) => {
        if (res.id && res.role) {
          window.location.href = "https://stock-market-charting-frontend.herokuapp.com/login";
        } else {
          window.location.href = "https://stock-market-charting-frontend.herokuapp.com/login";
        }
      });
    }
  }

  onLogin(event) {
    event.preventDefault();
    let data = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };

    authenticate(JSON.stringify(data)).then((res) => {
      if (res.name && res.role && res.jwt) {
        localStorage.setItem("name", res.name);
        localStorage.setItem("role", res.role);
        localStorage.setItem("jwt", res.jwt);
        this.setState({
          loggedin: true,
        });
        window.location.href = "https://stock-market-charting-frontend.herokuapp.com/companies";
      } else {
        //alert("Invalid Credentials");
      }
    });
  }

  render() {
    return (
      <div className="main">
        <PageHeader />
        <Route
          path="/"
          render={() => (
            <div>
              {!this.state.loggedin ? (
                <WelcomePage login={this.onLogin} signup={this.onSignUp} />
              ) : (
                ""
              )}
              {!this.state.loggedin ? (
                <div
                  className="navTabs text-white"
                  style={{ borderTop: "none", textAlign: "center" }}
                >
                  <h3 className="mb-2">Enter the world of Stock Market</h3>
                  <p className="px-5" style={{ color: "#D3D3D3" }}>
                    Stock markets enable companies to be traded publicly and
                    raise capital. They promote investment. The raising of
                    capital allows companies to grow their businesses, expand
                    operations and create jobs in the economy. The transfer of
                    capital and ownership is traded in a regulated, secure
                    environment.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        />

        {this.state.loggedin ? (
          <div>
            <div>
              <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                className="p-3"
              >
                <Container>
                  <Navbar.Brand>
                    <FontAwesomeIcon icon={faHandHoldingUsd} />{" "}
                  </Navbar.Brand>
                  &nbsp;
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <NavLink
                      to="/companies"
                      activeclassname="active"
                      className="nav-link"
                    >
                      {" "}
                      Companies
                    </NavLink>
                    &nbsp;
                    <NavLink to="/exchanges" className="nav-link">
                      {" "}
                      Stock Exchanges{" "}
                    </NavLink>
                    &nbsp;
                    {localStorage.getItem("role") == "[ROLE_ADMIN]" ? (
                      <NavLink to="/map" className="nav-link">
                        {" "}
                        Map Company-Exchange{" "}
                      </NavLink>
                    ) : (
                      ""
                    )}
                    <NavLink to="/ipos" className="nav-link">
                      {" "}
                      IPOs{" "}
                    </NavLink>
                    &nbsp;
                    <NavLink to="/stocks" className="nav-link">
                      {" "}
                      Stocks{" "}
                    </NavLink>
                    &nbsp;
                    <NavLink to="/sectors" className="nav-link">
                      {" "}
                      Sectors{" "}
                    </NavLink>
                    &nbsp;
                    <NavLink to="/analyse" className="nav-link">
                      {" "}
                      Compare{" "}
                    </NavLink>{" "}
                    &nbsp;
                    <Navbar.Text>
                      {" "}
                      <span className="font-weight-light">
                        Signed in as :
                      </span>{" "}
                      {localStorage.getItem("name")}{" "}
                    </Navbar.Text>{" "}
                    &nbsp;
                    <button className="btn btn-danger" onClick={this.logout}>
                      Logout
                    </button>{" "}
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>

            <Route
              exact
              path="/companies"
              render={() => (
                <div>
                  <Companies companies={this.state.companyList} />
                </div>
              )}
            />

            <Route
              exact
              path="/companies/details/:name"
              render={(params) => (
                <div>
                  <Companydetails {...params} />
                </div>
              )}
            />

            <Route
              exact
              path="/companies/savecompany"
              render={() => (
                <div>
                  <AddCompany />
                </div>
              )}
            />

            <Route
              exact
              path="/companies/edit/:name"
              render={(params) => (
                <div>
                  <EditCompany {...params} />
                </div>
              )}
            />

            <Route
              exact
              path="/exchanges"
              render={() => (
                <div>
                  <Exchanges />
                </div>
              )}
            />

            <Route
              exact
              path="/exchanges/details/:name"
              render={(params) => (
                <div>
                  <Exchangedetails {...params} />
                </div>
              )}
            />

            <Route
              exact
              path="/exchanges/saveexchange"
              render={() => (
                <div>
                  <AddStockExchange />
                </div>
              )}
            />

            <Route
              exact
              path="/exchanges/edit/:name"
              render={(params) => (
                <div>
                  <EditExchange {...params} />
                </div>
              )}
            />

            <Route
              exact
              path="/ipos"
              render={() => (
                <div>
                  <Ipos />
                </div>
              )}
            />

            <Route
              exact
              path="/ipos/saveipo"
              render={() => (
                <div>
                  <AddIpoDetail />
                </div>
              )}
            />

            <Route
              exact
              path="/map"
              render={() => (
                <div>
                  <CompanyStockExchangeMap />
                </div>
              )}
            />

            <Route
              exact
              path="/stocks"
              render={() => (
                <div>
                  <Stocks />
                </div>
              )}
            />

            <Route
              exact
              path="/stocks/importstocks"
              render={() => (
                <div>
                  <ImportStocks />
                </div>
              )}
            />

            <Route
              exact
              path="/sectors"
              render={() => (
                <div>
                  <Sectors />
                </div>
              )}
            />

            <Route
              exact
              path="/sectors/savesector"
              render={() => (
                <div>
                  <AddSector />
                </div>
              )}
            />

            <Route
              exact
              path="/sectors/details/:sid"
              render={(params) => (
                <div>
                  <Sectordetails {...params} />
                </div>
              )}
            />

            <Route
              path="/analyse/"
              render={() => (
                <div>
                  <Analyse />
                </div>
              )}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const fetchCompanies = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }

  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/companies",
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  return data;
};

const authenticate = async (data) => {
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/authenticate",
    {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json(); //extract JSON from the http response
  return res;
};

const signup = async (data) => {
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/users/signup",
    {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await response.json(); //extract JSON from the http response
  console.log(res);
  return res;
};

const checklogin = () => {
  if (localStorage.getItem("name")) {
    return true;
  }
  return false;
};
