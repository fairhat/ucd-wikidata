import React from "react";
import PropTypes from "prop-types";
import { Draggable } from 'react-beautiful-dnd';
import DataSnippet from "../DataSnippet/";

export default class DraggableSnippet extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
  }

  static defaultProps = {
    label: "label",
    value: "value",
    id: `${Math.random()}`
  }

  render() {
    return (
      <Draggable draggableId={this.props.id}>
        {
          (provided, snapshot) => (
            <DataSnippet ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps} label={this.props.label} value={this.props.value} />
          )
        }
      </Draggable>
    );
  }
}