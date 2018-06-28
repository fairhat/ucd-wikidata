import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout } from "antd";
import Toolbar from "./Toolbar.js";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import DataSnippetModule from "../DataSnippetModule/";
import _ from "lodash";
import TextEditor from "../TextEditor/";
import WikiTopBar from "../WikiTopBar/";
import LeftNavbar from "../LeftNavbar/";
import exampleData from "./query-2.json";
import "../../App.css";

// console.log(exampleData);

const numberWithCommas = (x) => {
  var parts = x.toString().split(",");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

function isValidURL(str) {
  var a = document.createElement("a");
  a.href = str;
  return a.host && a.host != window.location.host;
}

class EditorV2 extends React.Component {
  state = {
    data: exampleData,
    text: "Die Erde hat einen Radius von m"
  };

  render() {
    // const aliases = _.filter(exampleData, a => a.wdLabel === "alias");
    const numeric = _.filter(exampleData, a => !isNaN(a.ps_Label) && a.wdpqLabel);
    const identifier = _.filter(exampleData, a => !a.wdpqLabel);
    const urls = _.filter(exampleData, a => isValidURL(a.ps_Label));
    const strs = _.filter(
      exampleData,
      a => isNaN(a.ps_Label) && !isValidURL(a.ps_Label) && a.wdpqLabel
    );

    const orderedNumeric = _.map(_.groupBy(numeric, "wdLabel"), d => {
      const values = _.map(d, e => ({
        value: numberWithCommas(e.ps_Label.replace(".", ",")),
        tip: `${e.wdpqLabel? e.wdpqLabel + ": " : ""}${e.pq_Label || ""}` }));

      return {
        label: d[0].wdLabel,
        values: values
      };
    });
    const orderedURLs = _.map(_.groupBy(urls, "wdLabel"), d => {
      const values = _.map(d, e => ({
        value: e.ps_Label,
        tip: `${e.wdpqLabel? e.wdpqLabel + ": " : ""}${e.pq_Label || ""}` }));

      return {
        label: d[0].wdLabel,
        values: values
      };
    });
    const orderedStrs = _.map(_.groupBy(strs, "wdLabel"), d => {
      const values = _.map(d, e => ({ value: e.ps_Label, tip: `${e.wdpqLabel? e.wdpqLabel + ": " : ""}${e.pq_Label || ""}` }));

      return {
        label: d[0].wdLabel,
        values: values
      };
    });

    const orderedIdentifier = _.map(_.groupBy(identifier, "wdLabel"), d => {
      const values = _.map(d, e => ({ value: e.ps_Label, tip: `${e.wdpqLabel? e.wdpqLabel + ": " : ""}${e.pq_Label || ""}` }));

      return {
        label: d[0].wdLabel,
        values: values
      };
    });

    const dataP = [
      {
        label: "Text",
        data: orderedStrs
      },
      {
        label: "Media",
        data: orderedURLs
      },
      {
        label: "Numerisch",
        data: orderedNumeric
      },
      {
        label: "Identifier",
        data: orderedIdentifier
      },
    ];

    return (
      <div
        style={{
          padding: "20px",
          background: " linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 4%, rgba(246,246,246,1) 6%, rgba(246,246,246,1) 100%)",
          height: "100vh",
        }}
      >
        <Row>
          <Col span={2}>
            <Row>
              <img
                src="https://www.famouslogos.net/images/wikipedia-logo.jpg"
                width="150px"
                style={{ marginTop: "20px" }}
              />
            </Row>
            <Row style={{ marginTop: "15px", paddingRight: "15px" }}>
              <LeftNavbar />
            </Row>
          </Col>
          <Col span={22}>
            {/* <h1 style={{ margin: "0" }}>
              Sie bearbeiten gerade Artikel: Erde
            </h1> */}
            <WikiTopBar />
            <Toolbar />
            <Layout style={{ padding: "5px", width: "100%" }}>
              <DataSnippetModule data={dataP} />
              <TextEditor />
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(EditorV2);
