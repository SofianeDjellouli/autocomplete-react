import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour } from "../utils";

export const StringControlled = () => {
	const [state, setState] = useState("");

	const handleState = useCallback((value) => setState(value ? value.label : value), []);
	const handleClick = useCallback(() => setState("Clicked!"), []);
	const handleFilter = useCallback(({ label }) => !state || state !== label, [state]);

	return (
		<>
			<h4>String controlled</h4>
			<Autocomplete
				{...{ state }}
				onValue={handleState}
				getList={getColour}
				filterList={handleFilter}
			/>
			<Button onClick={handleClick}>Click me</Button>
			{`State is: ${JSON.stringify(state)}`}
		</>
	);
};
