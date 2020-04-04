import React, { useCallback, useState, useRef } from "react";
import { Chip } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour } from "../utils";

const HandleSelect = () => {
	const [items, setItems] = useState([]);
	const inputRef = useRef();
	const handleItems = useCallback((item) => setItems((items) => [...items, item]), []);

	const handleDelete = useCallback(
		(i) => () =>
			setItems((items) => {
				let _items = [...items];
				_items.splice(i, 1);
				return _items;
			}),
		[]
	);

	const handleFilter = useCallback(
		({ value }) => {
			for (let i = 0; i < items.length; i++) if (items[i].value === value) return false;
			return true;
		},
		[items]
	);

	const handleSelect = useCallback(({ setValue }) => {
		setValue("");
		if (inputRef.current) inputRef.current.focus();
	}, []);

	return (
		<>
			<Autocomplete
				inputRef={inputRef}
				getList={getColour}
				onValue={handleItems}
				filterList={handleFilter}
				getListProps={(e) => ({ ...e, domProps: { ...e.domProps, style: { bottom: "100%" } } })}
				handleSelect={handleSelect}
			/>
			{items && items.length > 0 && (
				<>
					<br />
					<div>
						{items.map(({ label }, i) => (
							<Chip
								{...{ label }}
								key={label + i}
								color="primary"
								data-i={i}
								onDelete={handleDelete(i)}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
};

<HandleSelect />;
