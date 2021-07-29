import React, { Component } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { Button, Card } from "react-bootstrap";
import { faChartLine, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
ReactFC.fcRoot(FusionCharts, Column2D, CandyTheme);

class CompareSector extends Component {
  constructor() {
    super();
    this.state = {
      namea: "",
      nameb: "",
      mina: {},
      maxa: {},
      avga: 0,
      stocksa: [{}],
      minb: {},
      maxb: {},
      avgb: 0,
      stocksb: [{}],
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

    fetchStocks(
      event.target.elements.sectorida.value,
      event.target.elements.sdate.value,
      "00:00:00",
      event.target.elements.edate.value,
      "23:59:59"
    ).then((resa) => {
      console.log(resa);

      fetchStocks(
        event.target.elements.sectoridb.value,
        event.target.elements.sdate.value,
        "00:00:00",
        event.target.elements.edate.value,
        "23:59:59"
      ).then((resb) => {
        console.log(resb);
        this.setState({
          stocksa: resa,
          maxa: max(resa),
          avga: avg(resa),
          mina: min(resa),

          stocksb: resb,
          maxb: max(resb),
          avgb: avg(resb),
          minb: min(resb),

          chartConfigs1: {
            type: "mscolumn2d", // The chart type
            width: "700", // Width of the chart
            height: "400", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
              chart: {
                caption: "Max-Avg-Min",
                subcaption: "comparison of sector A and sector B",
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
                  seriesname: "Sector A",
                  data: [
                    {
                      value: max(resa).value,
                    },
                    {
                      value: avg(resa),
                    },
                    {
                      value: min(resa).value,
                    },
                  ],
                },
                {
                  seriesname: "Sector B",
                  data: [
                    {
                      value: max(resb).value,
                    },
                    {
                      value: avg(resb),
                    },
                    {
                      value: min(resb).value,
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
                caption: "Comaprison Between Stock Price of Two Sectors",
                subCaption: "Average Stock Prices",
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
                  seriesname: "Sector A",
                  data: getData(resa),
                },
                {
                  seriesname: "Sector B",
                  data: getData(resb),
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
              <FontAwesomeIcon icon={faChartLine} /> &nbsp; Compare Two Sectors
            </h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={this.submitHandler}>
              <div>
                {" "}
                Sector A:{" "}
                <select
                  className="form-control bg-dark text-white"
                  style={{ width: "500px" }}
                  name="sectorida"
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
                <br />
                Sector B:{" "}
                <select
                  className="form-control bg-dark text-white"
                  style={{ width: "500px" }}
                  name="sectoridb"
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

const getDates = (data) => {
  let chartDates = [];
  data.forEach((stock) => {
    chartDates.push({
      label: stock.label,
    });
  });
  console.log(chartDates);
  return chartDates;
};

const getData = (stocks) => {
  let chartData = [];
  stocks.forEach((stock) => {
    chartData.push({
      value: stock.value,
    });
  });
  console.log(chartData);
  return chartData;
};

export default CompareSector;
