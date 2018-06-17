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
// import { DragSource } from "react-dnd";
import exampleWikidata from "./example-data.json";

console.log(exampleWikidata);

class EditorV2 extends React.Component {
  state = {
    data: exampleWikidata.entities.Q2
  };

  render() {
    const {
      aliases,
      claims,
      descriptions,
      id,
      labels,
      sitelinks,
      title,
      type
    } = this.state.data;

    // const stringClaims = claims.filter(claim => )

    return (
      <div style={{ padding: "20px" }}>
        <Row>
          <Col span={3}>
            <img
              src="https://www.famouslogos.net/images/wikipedia-logo.jpg"
              width="150px"
              style={{ marginTop: "20px" }}
            />
          </Col>
          <Col span={21}>
            <Toolbar />
            <Layout style={{ padding: "5px", width: "100%", }}>
              <DataSnippetModule object={exampleWikidata} />
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(EditorV2);
