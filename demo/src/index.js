import { render } from "react-dom";
import Autocomplete from "../../es";
import React, { useCallback, useState } from "react";
import { getColour, getPlaceholder } from "./utils";

const getList = (value) => new Promise((resolve) => setTimeout(resolve, 1000, getColour(value)));

const ObjectControlled = () => {
	const [state, setState] = useState();
	const handleState = useCallback((state) => setState(state), []);
	const handleClick = useCallback(() => setState({ label: "Clicked", id: 2 }), []);

	return (
		<>
			<Autocomplete
				{...{ state }}
				getList={getList}
				onValue={handleState}
				getInputProps={getPlaceholder("Controlled by an object")}
			/>
			<p>
				<button onClick={handleClick}>Click me</button>
			</p>
			<p>{`State is: ${JSON.stringify(state)}`}</p>
		</>
	);
};

render(<ObjectControlled />, document.querySelector("#demo"));
