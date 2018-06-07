import React from "react";
import PropTypes from "prop-types";
import { defaultList } from "./example-data.js";
import { Row, Col } from "antd";
import DataSnippet from "../DataSnippet/";

export default class SnippetList extends React.Component {
  static propTypes = {
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    )
  };

  static defaultProps = {
    entries: defaultList
  };

  render() {
    return (
      <Row type="flex" justify="center">
        {this.props.entries.map((entry, i) =>
          <Col lg={3} md={7}>
            <DataSnippet
              label={entry.label}
              value={entry.value}
            />
          </Col>
        )}
      </Row>
    );
  }
}
