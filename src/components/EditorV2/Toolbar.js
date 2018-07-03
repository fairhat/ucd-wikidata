import React from "react";
import { Row, Col, Button, Icon } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import "./toolbar.css";

const WButton = ({ style, children, isActive = false, ...props }) =>
  <Button style={{ borderRadius: "0", ...(isActive ? {
    background: "#36c",
    color: "white"
  } : {}), ...style }} {...props}>
    {children}
  </Button>;

export default class Toolbar extends React.Component {
  render() {
    const { onToggleModule = () => {}, isOpen } = this.props;

    return (
      <div>
        <Row
          className="toolbar"
          align="bottom"
          type="flex"
          style={{
            height: "40px",
            background: "white",
            borderTop: "1px solid #a7d7f9",
            borderBottom: "1px solid #ccc",
            fontSize: "0.75rem",
            width: "100%",
            position: "relative"
          }}
        >
          <Col span={10}>
            <ButtonGroup style={{ top: -1 }}>
              <WButton size="large" icon="arrow-left" />
              <WButton size="large" icon="arrow-right" />
              <WButton size="large">
                <span>Absatz</span>
              </WButton>
              <WButton size="large">
                <span>Schrift</span>
              </WButton>
              <WButton size="large" icon="link" />
              <WButton size="large">
                <span>Belegen</span>
              </WButton>
              <WButton size="large" icon="bars" />
              <WButton size="large">
                <span>Einfügen</span>
              </WButton>
              <WButton size="large" onClick={onToggleModule} isActive={isOpen} icon="tag" className={`${ isOpen ? "":"button-glow"}`}>
                <span>Wikidata-Snippets</span>
                { isOpen ? <Icon type="up" /> : <Icon type="down" /> }
              </WButton>
            </ButtonGroup>
          </Col>
          <Col span={6} style={{ position: "absolute", right: "0px" }}>
            <ButtonGroup style={{ top: -1 }}>
              <WButton size="large" icon="question" />
              <WButton size="large" icon="warning" />
              <WButton size="large" icon="database" />
              <WButton size="large" icon="edit" />
              <WButton size="large" style={{ background: "#36c" }}>
                <span style={{ color: "white" }}>
                  Änderungen veröffentlichen ...
                </span>
              </WButton>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
