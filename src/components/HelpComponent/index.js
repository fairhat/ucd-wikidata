import React from "react";
import { Button, Tooltip, Modal } from "antd";
import "./style.css";

export default class HelpComponent extends React.Component {
  showInfo = () => {
    Modal.info({
      title: 'Wikidata-Snippet Hilfe',
      content: (
        <div>
          <p>Die zu sehenden Datenschnipsel enthalten Informationen aus Wikidata.</p>
          <p>Du kannst sie beispielsweise per Drag'n'Drop in deinem Artikel verwenden.</p>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    const styles = this.props.style || {};
    return (
      <div style={{ marginTop: "10px", ...styles }}>
        <Tooltip placement="bottomRight" title={"Du kannst die Wikidata-Snippets beispielsweise per Drag'n'Drop in deinem Artikel verwenden."}>
          <Button onClick={this.showInfo} className="HelpButton" shape="circle" size="small" icon="question" style={{ borderColor: "#333" }} >
          </Button>
        </Tooltip>
      </div>
    );
  }
}
