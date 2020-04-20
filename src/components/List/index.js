import React from "react";
import { uid } from "react-uid";
import { replaceJSX } from "../../utils";
import "./style.css";

const lightgrayBackground = { style: { background: "lightgray" } };

export const List = ({
  list,
  handleLabel,
  highlight,
  value,
  listProps = {},
  itemProps = {},
} = {}) =>
  list &&
  list.length > 0 && (
    <div {...listProps}>
      {list.map((e, i) => (
        <div
          key={uid(e, i)}
          data-i={i}
          {...{ ...itemProps, ...(i === highlight && lightgrayBackground) }}>
          {replaceJSX(value, handleLabel(e))}
        </div>
      ))}
    </div>
  );

export const Item = ({ handleLabel, highlight, value, domProps = {} }) => (e, i) => {
  return (
    <div
      key={uid(e, i)}
      data-i={i}
      {...{ ...domProps, ...(i === highlight && { style: { background: "lightgray" } }) }}>
      {replaceJSX(value, handleLabel(e))}
    </div>
  );
};
