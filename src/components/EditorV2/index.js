import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout, List } from "antd";
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
// import { DragSource } from "react-dnd";
import exampleWikidata from "./example-data.json";

console.log(exampleWikidata);


const itemSource = {
	beginDrag(props) {
		return {
			value: props.value,
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			alert(`You dropped ${item.value} into ${dropResult.value}!`)
		}
	},
}

// @DragSource(
// 	ItemTypes.BOX,
// 	boxSource,
// 	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
// 		connectDragSource: connect.dragSource(),
// 		isDragging: monitor.isDragging(),
// 	}),
// )

const draggableItemSrc = ({ value }) => (
  <List.Item>
    {value}
  </List.Item>
);

// const draggableItem = DragSource()

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
            <Layout style={{ padding: "5px", minHeight: "250px" }}>
              <Row>
                <Col span={3}>
                  <List
                    bordered
                    footer={<p style={{ textAlign: "center" }}>Aliases</p>}
                    dataSource={aliases.de}
                    renderItem={({ value }) =>
                      <List.Item style={{ background: "white" }}>
                        {value}
                      </List.Item>}
                  />
                </Col>
                <Col span={3} style={{ height: "100%" }}>
                  <Container onDrop={() => {}} />
                </Col>
              </Row>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(EditorV2)
