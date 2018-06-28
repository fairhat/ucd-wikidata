import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout, List, Affix } from "antd";
import Toolbar from "./Toolbar.js";
import { Container, Draggable } from "react-smooth-dnd";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragDropContext
} from "react-dnd";
import SnippetV2 from "../DataSnippetV2/";
import DataSnippetModule from "../DataSnippetModule/";
import _ from "lodash";
import { Scrollbars } from "react-custom-scrollbars";
import TextEditor from "../TextEditor/";
// import _ from "lodash";
// import { DragSource } from "react-dnd";
import exampleWikidata from "./example-data.json";
import exampleData from "./query-2.json";

console.log(exampleData);
// console.log(exampleWikidata);
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
          background: "linear-gradient(white, #f6f6f6)"
        }}
      >
        <Row>
          <Col span={3}>
            <Row>
              <img
                src="https://www.famouslogos.net/images/wikipedia-logo.jpg"
                width="150px"
                style={{ marginTop: "20px" }}
              />
            </Row>
            <Row style={{ marginTop: "15px", paddingRight: "15px" }}>
              <p style={{ margin: "0" }}>
                <a href="#">Hauptseite</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Themenportale</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Von A bis Z</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Zufälliger Artikel</a>
              </p>

              <p style={{ margin: "0", marginTop: "15px" }}>Mitmachen</p>
              <hr />
              <p style={{ margin: "0" }}>
                <a href="#">Artikel verbessern</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Neuen Artikel anlegen</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Autorenportal</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Hilfe</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Letzte Änderungen</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Kontakt</a>
              </p>
              <p style={{ margin: "0" }}>
                <a href="#">Spenden</a>
              </p>
            </Row>
          </Col>
          <Col span={21}>
            <h1 style={{ margin: "0" }}>
              Sie bearbeiten gerade Artikel: Erde
            </h1>
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
