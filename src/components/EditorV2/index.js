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
// import _ from "lodash";
// import { DragSource } from "react-dnd";
import exampleWikidata from "./example-data.json";
import exampleData from "./query-2.json";

console.log(exampleData);
// console.log(exampleWikidata);

function isValidURL(str) {
  var a = document.createElement('a');
  a.href = str;
  return (a.host && a.host != window.location.host);
}

class EditorV2 extends React.Component {
  state = {
    data: exampleData,
    text: ''
    };
    
    SnippedDropped(event) {
      var val = "Text aus Snippet" //event.dataTransfer.getData('id');
      this.setState({ text: this.state.text + val });
      //alert("The new content: " + val ); 
    }
    TextChanged(event) {
      var val = this.refs.Text_area.value;
      //alert("The new content: " + val);
      this.setState({text: val})
    }
 

  render() {
    // const aliases = _.filter(exampleData, a => a.wdLabel === "alias");
    const numeric = _.filter(exampleData, a => !isNaN(a.ps_Label));
    const urls = _.filter(exampleData, a => isValidURL(a.ps_Label));
    const strs = _.filter(exampleData, a => isNaN(a.ps_Label) && !isValidURL(a.ps_Label));

    const orderedNumeric = _.map(_.groupBy(numeric, "wdLabel"), d => {
      const values = _.map(d, e => ({ value: e.ps_Label, tip: e.pq_Label }));

      return ({
        label: d[0].wdLabel,
        values: values,
      });
    });
    const orderedURLs = _.map(_.groupBy(urls, "wdLabel"), d => {
      const values = _.map(d, e => ({ value: e.ps_Label, tip: e.pq_Label }));

      return ({
        label: d[0].wdLabel,
        values: values,
      });
    });
    const orderedStrs = _.map(_.groupBy(strs, "wdLabel"), d => {
      const values = _.map(d, e => ({ value: e.ps_Label, tip: e.pq_Label }));

      return ({
        label: d[0].wdLabel,
        values: values,
      });
    });

    const dataP = [
      {
        label: "Text",
        data: orderedStrs,
      },
      {
        label: "Media",
        data: orderedURLs,
      },
      {
        label: "Numerisch",
        data: orderedNumeric
      },
      {
        label: "Text",
        data: orderedStrs,
      },
      {
        label: "Text",
        data: orderedStrs,
      },
    ]

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
              <DataSnippetModule data={dataP} />
              <textarea
                ref = "Text_area"
                style={{ width: "100%", marginTop: "10px" }} rows="15"
                onDrop={this.SnippedDropped.bind(this)}
                onInput={this.TextChanged.bind(this)}
                placeholder='Text hier eingeben'
                value={this.state.text}>
              </textarea>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(EditorV2);
