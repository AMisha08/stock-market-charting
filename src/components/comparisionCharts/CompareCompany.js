import React, { Component } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { Button, Card } from "react-bootstrap";
import {
  faChartLine,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
ReactFC.fcRoot(FusionCharts, Column2D, CandyTheme);

class CompareCompany extends Component {
  constructor() {
    super();
    this.state = {
      mina: {},
      maxa: {},
      avga: 0,
      counta: 0,
      stocksa: [{}],
      minb: {},
      maxb: {},
      avgb: 0,
      countb: 0,
      stocksb: [{}],
      companies: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    fetchAvailabeCompanies().then((data) => {
      this.setState({
        companies: data,
      });
    });
  }

  submitHandler(event) {
    event.preventDefault();
    fetchStocks(
      event.target.elements.companynamea.value,
      event.target.elements.sdate.value,
      event.target.elements.stime.value,
      event.target.elements.edate.value,
      event.target.elements.etime.value
    ).then((resa) => {
      console.log(resa);
      fetchStocks(
        event.target.elements.companynameb.value,
        event.target.elements.sdate.value,
        event.target.elements.stime.value,
        event.target.elements.edate.value,
        event.target.elements.etime.value
      ).then((resb) => {
        console.log(resb);
        this.setState({
          stocksa: resa,
          maxa: max(resa),
          avga: avg(resa),
          mina: min(resa),
          counta: resa.length,

          stocksb: resb,
          maxb: max(resb),
          avgb: avg(resb),
          minb: min(resb),
          countb: resb.length,

          chartConfigs1: {
            type: "mscolumn2d", // The chart type
            width: "700", // Width of the chart
            height: "400", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
              chart: {
                caption: "Max-Avg-Min",
                subcaption: "comparison of company A and company B",
                xaxisname: "Metrics",
                yaxisname: "Price (INR)",
                formatnumberscale: "1",
                plottooltext:
                  "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
                theme: "candy",
                drawcrossline: "1",
              },
              categories: [
                {
                  category: [
                    {
                      label: "Maximum",
                    },
                    {
                      label: "Average",
                    },
                    {
                      label: "Minimum",
                    },
                  ],
                },
              ],
              dataset: [
                {
                  seriesname: resa[0].companyName,
                  data: [
                    {
                      value: max(resa).shareprice,
                    },
                    {
                      value: avg(resa),
                    },
                    {
                      value: min(resa).shareprice,
                    },
                  ],
                },
                {
                  seriesname: resb[0].companyName,
                  data: [
                    {
                      value: max(resb).shareprice,
                    },
                    {
                      value: avg(resb),
                    },
                    {
                      value: min(resb).shareprice,
                    },
                  ],
                },
              ],
            },
          },
          chartConfigs2a: {
            type: "msline", // The chart type
            width: "700", // Width of the chart
            height: "400", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
              chart: {
                setAdaptiveYMin: "1",
                theme: "candy",
                caption:
                  resa[0].companyname +
                  " vs " +
                  resb[0].companyname +
                  " Stock Price trend",
                subCaption: "Share prices over a period",
                xAxisName: "Date and Time",
                yAxisName: "Price (in INR)",
              },
              categories: [
                {
                  category: getDates(resa),
                },
              ],
              dataset: [
                {
                  seriesname: resa[0].companyname,
                  data: getData(resa),
                },
                {
                  seriesname: resb[0].companyname,
                  data: getData(resb),
                },
              ],
            },
          },
          chartConfigs3a: {
            type: "pie2d", // The chart type
            width: "700", // Width of the chart
            height: "400", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
              // Chart Configuration
              chart: {
                setAdaptiveYMin: "1",
                caption: resa[0].companyname + " Stock Price", //Set the chart caption
                subCaption: "% share below and above avergae", //Set the chart subcaption
                xAxisName: "Date and Time", //Set the x-axis name
                yAxisName: "Price (INR)", //Set the y-axis name
                numberSuffix: "",
                theme: "candy", //Set the theme for your chart
              },
              // Chart Data - from step 2
              data: [
                {
                  label: "Above Average",
                  value: aboveAvg(resa, avg(resa)),
                  color: " #5D62B5",
                },
                {
                  label: "Below Average",
                  value: resa.length - aboveAvg(resa, avg(resa)),
                  color: "#989cd6",
                },
              ],
            },
          },
          chartConfigs3b: {
            type: "pie2d", // The chart type
            width: "700", // Width of the chart
            height: "400", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
              // Chart Configuration
              chart: {
                setAdaptiveYMin: "1",
                caption: resb[0].companyname + " Stock Price", //Set the chart caption
                subCaption: "% share below and above avergae", //Set the chart subcaption
                xAxisName: "Date and Time", //Set the x-axis name
                yAxisName: "Price (INR)", //Set the y-axis name
                numberSuffix: "",
                theme: "candy", //Set the theme for your chart
              },
              // Chart Data - from step 2
              data: [
                {
                  label: "Above Average",
                  value: aboveAvg(resb, avg(resb)),
                  color: "#29C3BE",
                },
                {
                  label: "Below Average",
                  value: resb.length - aboveAvg(resb, avg(resb)),
                  color: "82e5e2",
                },
              ],
            },
          },
        });
      });
    });
  }

  render() {
    return (
      <div className="analysePlate">
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            {" "}
            <h2>
              {" "}
              <FontAwesomeIcon icon={faChartLine} /> &nbsp; Compare Two
              Companies
            </h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={this.submitHandler}>
              <div>
                {" "}
                Company A:{" "}
                <select
                  className="form-control bg-dark text-white"
                  style={{ width: "500px" }}
                  name="companynamea"
                  required
                >
                  <option>Choose company</option>
                  {this.state.companies.map((company, index) => (
                    <option
                      className="companyTab"
                      key={index}
                      value={company.name}
                    >
                      {company.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                Company B:{" "}
                <select
                  className="form-control bg-dark text-white"
                  style={{ width: "500px" }}
                  name="companynameb"
                  required
                >
                  <option>Choose Sector</option>
                  {this.state.companies.map((company, index) => (
                    <option
                      className="companyTab"
                      key={index}
                      value={company.name}
                    >
                      {company.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <table>
                  <tr>
                    <td>
                      Start Date :{" "}
                      <input
                        className="form-control bg-dark text-white"
                        required
                        style={{
                          width: "200px",
                        }}
                        type="date"
                        name="sdate"
                      />
                    </td>
                    <td>
                      {" "}
                      Start Time :{" "}
                      <input
                        className="form-control bg-dark text-white"
                        required
                        style={{
                          width: "200px",
                        }}
                        type="time"
                        name="stime"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      End Date :{" "}
                      <input
                        className="form-control bg-dark text-white"
                        required
                        style={{
                          width: "205px",
                        }}
                        type="date"
                        name="edate"
                      />
                    </td>
                    <td>
                      {" "}
                      End Time :{" "}
                      <input
                        className="form-control bg-dark text-white"
                        required
                        style={{
                          width: "205px",
                        }}
                        type="time"
                        name="etime"
                      />
                    </td>
                  </tr>
                </table>
                <br />{" "}
                <Button variant="info" type="submit" value="Save">
                  <FontAwesomeIcon icon={faSave} /> &nbsp; Get Results
                </Button>
              </div>
            </form>
            <br />

            <div className="plots">
              <div>
                <div>
                  {" "}
                  <div>
                    {" "}
                    <ReactFC {...this.state.chartConfigs1} />
                  </div>
                </div>

                <div>
                  <div>
                    {" "}
                    <ReactFC {...this.state.chartConfigs3a} />
                  </div>
                  <div>
                    {" "}
                    <ReactFC {...this.state.chartConfigs3b} />
                  </div>
                </div>

                <div>
                  {" "}
                  <div>
                    {" "}
                    <ReactFC {...this.state.chartConfigs2a} />
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const max = (stocks) => {
  if (stocks.length <= 0) {
    return {};
  }
  const max = stocks.reduce(function (prev, current) {
    return prev.shareprice > current.shareprice ? prev : current;
  });
  return max;
};

const min = (stocks) => {
  if (stocks.length <= 0) {
    return {};
  }
  const min = stocks.reduce(function (prev, current) {
    return prev.shareprice < current.shareprice ? prev : current;
  });
  return min;
};

const avg = (stocks) => {
  let count = 0;
  let sum = 0;

  if (stocks.length <= 0) {
    return 0;
  }

  stocks.map((stock) => {
    count = count + 1;
    sum = sum + stock.shareprice;
  });

  let avg = sum / count;
  avg = Math.round((avg + Number.EPSILON) * 100) / 100;
  return avg;
};

const aboveAvg = (stocks, avg) => {
  let count = 0;
  if (stocks.length <= 0) {
    return 0;
  }
  stocks.map((stock) => {
    if (stock.shareprice >= avg) {
      count = count + 1;
    }
  });
  return count;
};

const fetchStocks = async (companyname, sdate, stime, edate, etime) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/stockprice/company/" +
      companyname +
      "/" +
      sdate +
      "/" +
      stime +
      ":00/" +
      edate +
      "/" +
      etime +
      ":00",
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  if (data.length > 1) {
    return sortDateTime(data);
  }
  return data;
};

const sortDateTime = (d) => {
  d.map((stock) => {
    let tempDate = stock.stockPriceDate.split("-");
    let tempTime = stock.stockPriceTime.split(":");
    stock.jsdate = new Date(
      tempDate[0],
      tempDate[1],
      tempDate[2],
      tempTime[0],
      tempTime[1],
      tempTime[2],
      0
    );
  });
  const sorted = d.sort((a, b) => b.jsdate - a.jsdate);
  return sorted;
};

const fetchAvailabeCompanies = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/companies", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  return data;
};

const getDates = (stocks) => {
  let chartDates = [];
  stocks.forEach((stock) => {
    chartDates.push({
      label: stock.stockPriceDate + " " + stock.stockPriceTime,
    });
  });
  console.log(chartDates);
  return chartDates.reverse();
};

const getData = (stocks) => {
  let chartData = [];
  stocks.forEach((stock) => {
    chartData.push({
      value: stock.shareprice,
    });
  });
  console.log(chartData);
  return chartData.reverse();
};

export default CompareCompany;
