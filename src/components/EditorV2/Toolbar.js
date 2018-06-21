import React from "react";
import { Row, Col, Button } from "antd";
import ButtonGroup from "antd/lib/button/button-group";

export default class Toolbar extends React.Component {

  render() {
    return (
      <Row align="bottom" type="flex" style={{ height: "130px" }}>
        <Col span={10}>
          <ButtonGroup>
            <Button disabled size="large" icon="arrow-left" />
            <Button disabled size="large" icon="arrow-right" />
            <Button disabled size="large">
              <span>Absatz</span>
            </Button>
            <Button disabled size="large">
              <span>Schrift</span>
            </Button>
            <Button disabled size="large" icon="link" />
            <Button disabled size="large">
              <span>Belegen</span>
            </Button>
            <Button disabled size="large" icon="bars" />
            <Button disabled size="large">
              <span>Einfügen</span>
            </Button>
          </ButtonGroup>
        </Col>
        <Col span={7} push={7}>
          <ButtonGroup>
            <Button disabled size="large" icon="question" />
            <Button disabled size="large" icon="warning" />
            <Button disabled size="large" icon="database" />
            <Button disabled size="large" icon="edit" />
            <Button disabled size="large">
              <span>Artikel veröffentlichen</span>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}
