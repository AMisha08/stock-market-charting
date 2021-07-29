import React, { Component } from "react";
import { Route } from "react-router-dom";
import AnalyseCompany from "./AnalyseCompany";
import CompareCompany from "./CompareCompany";
import AnalyseSector from "./AnalyseSector";
import CompareSector from "./CompareSector";
import { Tab, Tabs } from "react-bootstrap";

class Analyse extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="navTabs text-white">
        <h1>Comparison Charts</h1>
        <br />
        <Tabs
          defaultActiveKey="analyseCompany"
          id="uncontrolled-tab"
          className="mb-3"
          unmountOnExit={true}
        >
          <Tab eventKey="analyseCompany" title="Company stats">
            <AnalyseCompany />
          </Tab>
          <Tab eventKey="analyseSector" title="Sector Stats">
            <AnalyseSector />
          </Tab>
          <Tab eventKey="analyseTwoCompanies" title="Compare Companies">
            <CompareCompany />
          </Tab>
          <Tab eventKey="analyseTwoSectors" title="Compare Sectors">
            <CompareSector />
          </Tab>
        </Tabs>

        <Route
          exact
          path="/analyse/company"
          render={() => (
            <div>
              <AnalyseCompany />
            </div>
          )}
        />

        <Route
          exact
          path="/analyse/sector"
          render={() => (
            <div>
              <AnalyseSector />
            </div>
          )}
        />

        <Route
          exact
          path="/analyse/compare/company"
          render={() => (
            <div>
              <CompareCompany />
            </div>
          )}
        />

        <Route
          exact
          path="/analyse/compare/sector"
          render={() => (
            <div>
              <CompareSector />
            </div>
          )}
        />
      </div>
    );
  }
}

export default Analyse;
