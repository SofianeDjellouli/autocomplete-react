import React from "react";
import { uid } from "react-uid";
import { ListItem } from "@material-ui/core";
import Autocomplete, { replaceJSX } from "@sofiane-d/autocomplete-react";
import { getColour, getPlaceholder } from "../utils";

const renderItem = ({ domProps = {}, handleLabel, highlight, value }) => (e, i) => {
	return (
		<ListItem
			selected={i === highlight}
			{...(i !== highlight && { style: { backgroundColor: e.color } })}
			key={uid(e, i)}
			data-i={i}
			{...domProps}>
			{replaceJSX(value, handleLabel(e))}
		</ListItem>
	);
};

const CustomItem = () => {
	return (
		<Autocomplete
			renderItem={renderItem}
			getList={getColour}
			getInputProps={getPlaceholder("Custom item")}
		/>
	);
};

<CustomItem />;
