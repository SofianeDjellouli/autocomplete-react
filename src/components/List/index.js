import React from "react";
import { uid } from "react-uid";
import { replaceJSX } from "../../utils";
import "./style.css";

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

export const List = ({ list, renderItem, domProps = {} } = {}) => {
	return list && list.length > 0 && <div {...domProps}>{list.map(renderItem)}</div>;
};
