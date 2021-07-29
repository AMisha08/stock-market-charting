import React, { Component } from "react";
import SheetJSApp from "./ImportExcel";

class ImportStocks extends Component {
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
    return (
      <div className="navTabs text-white">
        <h3>Import Stock Price Sheet</h3>
        <SheetJSApp />
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

export default ImportStocks;
