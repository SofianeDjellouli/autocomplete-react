import React, { useCallback, useState } from "react";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getState } from "../utils";

const getAsyncState = (value) =>
	new Promise((resolve) => setTimeout(resolve, 1000, getState(value)));

const AsyncList = () => {
	const [state, setState] = useState(null);

	const handleValue = useCallback((value) => {
		setState(value);
	}, []);

	const handleFilter = useCallback(
		({ value }) => {
			return !state || state.value !== value;
		},
		[state]
	);

	return (
		<Autocomplete
			state={state}
			filterList={handleFilter}
			onValue={handleValue}
			getList={getAsyncState}
		/>
	);
};

<AsyncList />;
