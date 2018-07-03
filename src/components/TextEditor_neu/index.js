import React from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget
} from "react-dnd";
import { Row, Col } from "antd";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
  Modifier
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";
import initData from "./data.js";

const Types = {
  ITEM: "snippet"
};

const boxTarget = {
  drop(props, monitor, comp, ...args) {
    const item = monitor.getItem();
    const val = item ? item.values[0].value : "";
    // console.log(props, monitor, comp, ...args);
    comp.addValue(val);
    return { name: "TextEditor" };
  }
};

class TextEditor_neu extends React.Component {
  state = {
    //text: "Die Erde hat einen Radius von m",
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(initData))
    )
  };

  addValue = value => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const ncs = Modifier.insertText(contentState, selection, value);
    const es = EditorState.push(editorState, ncs, "insert-fragment");
    this.setState({ editorState: es });
  };

  onEditorStateChange = editorState => {
    // console.log("EditorChange", editorState.getCurrentContent());
    this.setState({ editorState });
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <Row>
            <Col span={17}>
              <Editor
                style={{ width: "100%", marginTop: "10px" }}
                rows="15"
                toolbarHidden
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
            </Col>
            <Col span={7} style={{ background: "white" }}>
              <table className="wikitable" style={{ marginTop: "105px" }}>
                <thead>
                  <tr>
                    <th colSpan="2">Erde</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2" align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" height="350px" /></td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center">Die Erde, aufgenommen von Apollo 17 am 7. Dezember 1972</td>
                  </tr>
                  <tr className="header">
                    <td className="header" colSpan="2" align="center">Eigenschaften des Orbits</td>
                  </tr>
                  <tr>
                    <td>Große Halbachse</td>
                    <td>1 AE (149,6 Mio. km)</td>
                  </tr>
                  <tr>
                    <td>Perihel – Aphel</td>
                    <td>0,983 – 1,017 AE </td>
                  </tr>
                  <tr>
                    <td>Exzentrizität</td>
                    <td>0,0167</td>
                  </tr>
                  <tr>
                    <td>Neigung der Bahnebene</td>
                    <td>0°</td>
                  </tr>
                  <tr>
                    <td>Siderische Umlaufzeit</td>
                    <td>365,256 d</td>
                  </tr>
                  <tr className="header">
                    <td className="header" colSpan="2" align="center">Physikalische Eigenschaften</td>
                  </tr>
                  <tr>
                    <td>Masse</td>
                    <td>5,974 · 1024^24 kg </td>
                  </tr>
                  <tr>
                    <td>Mittlere Dichte</td>
                    <td>5,515 g/cm³</td>
                  </tr>
                  <tr>
                    <td>Fallbeschleunigung*</td>
                    <td>9,80665 m/s²</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          {/* <Row>
            <textarea
              style={{ width: "100%", height: "350px" }}
              value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
            />
          </Row> */}
        </div>
      )
    );
  }
}

export default DropTarget(Types.ITEM, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(TextEditor_neu);
