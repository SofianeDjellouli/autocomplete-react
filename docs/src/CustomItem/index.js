import React from "react";
import { uid } from "react-uid";
import { ListItem } from "@material-ui/core";
import Autocomplete, { replaceJSX, useHighlight } from "@sofiane-d/autocomplete-react";
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

const CustomHighlight = () => {
	const highlightHook = useHighlight();
	const mouseHighlight = highlightHook.highlight;
	const { handleMouseEnter } = highlightHook;
	return (
		<Autocomplete
			renderItem={({ domProps = {}, handleLabel, highlight, value }) => (e, i) => {
				return (
					<ListItem
						selected={i === mouseHighlight}
						{...(i === highlight && { style: { backgroundColor: "lightgray" } })}
						key={uid(e, i)}
						data-i={i}
						{...domProps}
						onMouseEnter={handleMouseEnter}>
						{replaceJSX(value, handleLabel(e))}
					</ListItem>
				);
			}}
			getList={getColour}
			getInputProps={getPlaceholder(
				"Different highlighted items for the mouse and the keyboard events (like the search bar in Google Chrome.)"
			)}
		/>
	);
};

<>
	<CustomItem />
	<br />
	<CustomHighlight />
</>;
