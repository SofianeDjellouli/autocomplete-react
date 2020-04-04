import React from "react";
import { uid } from "react-uid";
import { FormHelperText } from "@material-ui/core";
import Autocomplete, { replaceJSX } from "@sofiane-d/autocomplete-react";
import { getColour, getFlavour, getPlaceholder } from "../utils";

const renderError = ({ error }) => {
	return error && <FormHelperText error>{error}</FormHelperText>;
};

const getRandomError = (value) =>
	new Promise((resolve, reject) => {
		const random = Math.random();
		if (random < 0.5) resolve(getFlavour(value));
		else reject("Oops, you made a mistake!");
	});

const CustomError = () => {
	return (
		<Autocomplete
			renderError={renderError}
			getList={getRandomError}
			getInputProps={getPlaceholder("Custom error")}
		/>
	);
};

<CustomError />;
