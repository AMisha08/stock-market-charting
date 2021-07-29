import React, { Component } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { Button, Card } from "react-bootstrap";
import {
  faChartLine,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
ReactFC.fcRoot(FusionCharts, Column2D, CandyTheme);

class AnalyseSector extends Component {
  constructor() {
    super();
    this.state = {
      min: {},
      max: {},
      avg: 0,
      stocks: [],
      sectors: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    fetchAvailabeSectors().then((data) => {
      this.setState({
        sectors: data,
      });
    });
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(event.target.elements.sectorid.value);
    fetchStocks(
      event.target.elements.sectorid.value,
      event.target.elements.sdate.value,
      "00:00:00",
      event.target.elements.edate.value,
      "23:59:59"
    ).then((res) => {
      this.setState({
        stocks: res,
        max: max(res),
        avg: avg(res),
        min: min(res),
        chartConfigs1: {
          type: "column2d", // The chart type
          width: "700", // Width of the chart
          height: "400", // Height of the chart
          dataFormat: "json", // Data type
          dataSource: {
            // Chart Configuration
            chart: {
              caption: "Max - Avg - Min", //Set the chart caption
              xAxisName: "Metrics", //Set the x-axis name
              yAxisName: "share Price(INR)", //Set the y-axis name
              numberSuffix: "",
              theme: "candy", //Set the theme for your chart
            },
            // Chart Data - from step 2
            data: [
              {
                label: "Maximum",
                value: max(res).value,
              },
              {
                label: "Average",
                value: avg(res),
              },
              {
                label: "Minimum",
                value: min(res).value,
              },
            ],
          },
        },
        chartConfigs2: {
          type: "line", // The chart type
          width: "700", // Width of the chart
          height: "400", // Height of the chart
          dataFormat: "json", // Data type
          dataSource: {
            // Chart Configuration
            chart: {
              setAdaptiveYMin: "1",
              caption: "Average Stock Price", //Set the chart caption
              subCaption: "Average Share price trend over period", //Set the chart subcaption
              xAxisName: "Date", //Set the x-axis name
              yAxisName: "Price (INR)", //Set the y-axis name
              numberSuffix: "",
              theme: "candy", //Set the theme for your chart
            },
            // Chart Data - from step 2
            data: res,
          },
        },
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
              <FontAwesomeIcon icon={faChartLine} /> &nbsp; Analyse Sector
            </h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={this.submitHandler}>
              <div>
                {" "}
                Sector :{" "}
                <select
                  className="form-control bg-dark text-white"
                  style={{ width: "500px" }}
                  name="sectorid"
                  required
                >
                  <option>Choose Sector</option>
                  {this.state.sectors.map((sector, index) => (
                    <option
                      className="companyTab"
                      key={index}
                      value={sector.id}
                    >
                      {sector.sectorName}
                    </option>
                  ))}
                </select>
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
                  </tr>
                </table>
                <br />{" "}
                <Button variant="info" type="submit" value="Save">
                  <FontAwesomeIcon icon={faSave} /> &nbsp; Get Results
                </Button>
              </div>
            </form>

            <br />
            <br />
            <br />

            <div className="plots">
              <div>
                <ReactFC {...this.state.chartConfigs1} />
              </div>

              <div>
                <ReactFC {...this.state.chartConfigs2} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const max = (data) => {
  if (data.length <= 0) {
    return {};
  }
  const max = data.reduce(function (prev, current) {
    return prev.value > current.value ? prev : current;
  });
  return max;
};

const min = (data) => {
  if (data.length <= 0) {
    return {};
  }
  const min = data.reduce(function (prev, current) {
    return prev.value < current.value ? prev : current;
  });
  return min;
};

const avg = (data) => {
  let count = 0;
  let sum = 0;

  if (data.length <= 0) {
    return 0;
  }

  data.map((data) => {
    count = count + 1;
    sum = sum + data.value;
  });

  let avg = sum / count;
  avg = Math.round((avg + Number.EPSILON) * 100) / 100;
  return avg;
};

const fetchStocks = async (sectorid, sdate, stime, edate, etime) => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch(
    "https://stock-market-charting-amisha.herokuapp.com/sectors/analyses/" +
      sectorid +
      "/" +
      sdate +
      "/" +
      stime +
      "/" +
      edate +
      "/" +
      etime,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchAvailabeSectors = async () => {
  let myHeaders = new Headers();
  if (localStorage.getItem("jwt")) {
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  const response = await fetch("https://stock-market-charting-amisha.herokuapp.com/sectors", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export default AnalyseSector;
