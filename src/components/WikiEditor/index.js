import React from "react";
import { Button, Layout, Row, Col, Modal } from "antd";
import "./style.css";
import ButtonGroup from "antd/lib/button/button-group";
import TextArea from "antd/lib/input/TextArea";
import DataSnippet from "../DataSnippet/";
import HelpComponent from "../HelpComponent/";
import { defaultList as exampleData } from "../SnippetList/example-data.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default class WikiEditor extends React.Component {
  render() {
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
            <Row align="bottom" type="flex" style={{ height: "130px" }}>
              <Col span={10}>
                <ButtonGroup>
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="arrow-left"
                  />
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="arrow-right"
                  />
                  <Button disabled className="Wikipedia" size="large">
                    <span>Absatz</span>
                  </Button>
                  <Button disabled className="Wikipedia" size="large">
                    <span>Schrift</span>
                  </Button>
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="link"
                  />
                  <Button disabled className="Wikipedia" size="large">
                    <span>Belegen</span>
                  </Button>
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="bars"
                  />
                  <Button disabled className="Wikipedia" size="large">
                    <span>Einfügen</span>
                  </Button>
                </ButtonGroup>
              </Col>
              <Col span={7} offset={7}>
                <ButtonGroup>
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="question"
                  />
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="warning"
                  />
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="database"
                  />
                  <Button
                    disabled
                    className="Wikipedia"
                    size="large"
                    icon="edit"
                  />
                  <Button disabled className="Wikipedia" size="large">
                    <span>Artikel veröffentlichen</span>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Layout style={{ padding: "10px" }}>
              <Row align="top" type="flex">
                <Col span={22}>
                  <Row type="flex" justify="left" gutter={10}>
                    <DragDropContext onDragEnd={() => {}}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) =>
                          <div ref={provided.innerRef}>
                            {exampleData.map((item, index) =>
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) =>
                                  <Col span={4}>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={provided.draggableProps.style}
                                    >
                                      <DataSnippet
                                        key={index}
                                        label={item.label}
                                        value={item.value}>
                                      </DataSnippet>
                                    </div>
                                  </Col>}
                              </Draggable>
                            )}
                            {provided.placeholder}
                          </div>}
                      </Droppable>
                    </DragDropContext>
                  </Row>
                </Col>
                <Col span={1} push={1}>
                  <HelpComponent />
                </Col>
              </Row>
            </Layout>
            <Row align="top" type="flex">
              <Col span={24}>
                <TextArea rows={15} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
