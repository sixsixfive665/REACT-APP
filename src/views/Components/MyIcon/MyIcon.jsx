import React from "react";
import * as Icon from "@ant-design/icons";
const MyIcon = (props) => {
  // console.log(props)
  return (
    React.createElement(
      Icon[props.icon],
      {
        style: {
          ...props.style
        }
      }
    )
  )
};
export default MyIcon;