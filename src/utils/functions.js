import React from "react";
import escapeRegExp from "lodash.escaperegexp";
import { uid } from "react-uid";

export const debounce = (func, wait = 250) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout); // Will cancel the previous timeout which is a function call
    return new Promise(resolve => (timeout = setTimeout(resolve, wait, func(...args))));
  };
};

export const replaceJSX = (
  string,
  target,
  flag = "gi",
  render = (e, i) => (
    <strong key={uid(e, i)} style={{ color: "#579ea2" }}>
      {e}
    </strong>
  ),
) => {
  if (typeof target !== "string")
    throw new Error("Unable to get the label from the value. Please check the getLabel prop.");
  if (!string) return target;
  let array = target.split(new RegExp(escapeRegExp(string), flag));
  let result = [];
  const stringLength = string.length;
  for (let i = 0, j = 0; i < array.length; i++) {
    j += array[i].length;
    if (i) j += stringLength;
    if (array[i]) result.push(array[i]);
    if (i < array.length - 1) result.push(render(target.slice(j, j + stringLength), i));
  }
  return result;
};
