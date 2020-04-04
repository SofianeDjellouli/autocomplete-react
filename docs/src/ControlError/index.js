import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour } from "../utils";

const ControlError = () => {
	const [error, setError] = useState("");
	const [state, setState] = useState(null);

	const handleValue = useCallback((value) => {
		setState(value);
		if (value) setError(""); // The component will then be able to react to any further changes of the error state.
	}, []);

	const handleFilter = useCallback(({ value }) => !state || state.value !== value, [state]);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (state) window.alert("Form valid");
			else setError("Please pick from the list.");
		},
		[state]
	);

	return (
		<form onSubmit={handleSubmit}>
			<Autocomplete
				state={state}
				filterList={handleFilter}
				onValue={handleValue}
				getList={getColour}
				defaultError={error}
			/>
			<p>
				<Button type="submit">Submit</Button>
			</p>
		</form>
	);
};

<ControlError />;
