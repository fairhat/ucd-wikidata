import React from "react";
import 'antd/dist/antd.css';
import '@storybook/addon-viewport/register'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

storiesOf("Div-Test", module)
  .add("with content", () => (
    <div>text text</div>
  ))
  .add("without content", () => (
    <div />
  ))