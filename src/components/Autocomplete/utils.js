import { useState, useRef } from "react";

export const useOverride = props => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const wrapperRef = useRef();
	const listRef = useRef();
	const inputRef = useRef();

	return { value, setValue, list, setList, inputRef, wrapperRef, listRef, ...props };
};

