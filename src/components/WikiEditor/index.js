import React from "react";
import { Button } from "antd";
import "./style.css";
import ButtonGroup from "antd/lib/button/button-group";
import TextArea from "antd/lib/input/TextArea";

export default class WikiEditor extends React.Component {
  render() {
    return (
      <div>
          <img src="https://www.famouslogos.net/images/wikipedia-logo.jpg" width="150px" style={{position:"fixed", left:"0px", top:"0px"}} />
          <ButtonGroup  style={{position:"fixed", left:"150px", top:"5px"}}>
            <Button disabled  className="Wikipedia" size="large" icon="arrow-left" />
            <Button disabled  className="Wikipedia" size="large" icon="arrow-right" />
            <Button disabled  className="Wikipedia" size="large">
              <span>Absatz</span>
            </Button>
            <Button disabled  className="Wikipedia" size="large">
              <span>Schrift</span>
            </Button>
            <Button disabled  className="Wikipedia" size="large" icon="link" />
            <Button disabled  className="Wikipedia" size="large">
              <span>Belegen</span>
            </Button>
            <Button disabled  className="Wikipedia" size="large" icon="bars" />
            <Button disabled  className="Wikipedia" size="large">
              <span>Einfügen</span>
            </Button>
          </ButtonGroup>
          <ButtonGroup  style={{position:"fixed", right:"10px", top:"5px"}}>
            <Button disabled  className="Wikipedia" size="large" icon="question" />
            <Button disabled  className="Wikipedia" size="large" icon="warning" />
            <Button disabled  className="Wikipedia" size="large" icon="database" />
            <Button disabled  className="Wikipedia" size="large" icon="edit" />
            <Button disabled  className="Wikipedia" size="large">
              <span>Artikel veröffentlichen</span>
            </Button>
          </ButtonGroup>
          <TextArea disabled rows={15}  style={{position:"fixed", left:"150px", top:"50px"}} />
          <TextArea rows={15}  style={{position:"fixed", left:"150px", top:"250px"}} />
      </div>
    );
  }
}
