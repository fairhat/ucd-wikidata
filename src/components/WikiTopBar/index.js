import React from "react";
import { Row, Input } from "antd";
import WikiButton from "../WikiButton/";
const Search = Input.Search;

const WikiTopBar = () => (
  <Row className="wikibar">
    <div style={{ float: "left" }}>
      <WikiButton htmlType="button" isWhite>Artikel</WikiButton>
      <WikiButton htmlType="button">Diskussion</WikiButton>
    </div>
    <div style={{ float: "right" }}>
      <WikiButton htmlType="button">Lesen</WikiButton>
      <WikiButton htmlType="button" isWhite>Bearbeiten</WikiButton>
      <WikiButton htmlType="button">Quelltext bearbeiten</WikiButton>
      <WikiButton htmlType="button">Versionsgeschichte</WikiButton>
      <WikiButton htmlType="button">Mehr</WikiButton>
      <Search placeholder="Wikipedia durchsuchen" style={{ width: "250px", marginLeft: "10px" }} />

    </div>
  </Row>
);

export default WikiTopBar;