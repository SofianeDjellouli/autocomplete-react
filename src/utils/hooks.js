import { useState, useEffect, useCallback, useRef } from "react";
import { isDev } from "./";

export const useHighlight = ({ onSelect, listRef, setList }) => {
	const [highlight, setHighlight] = useState();

	const handleMouseEnter = useCallback(
		e => {
			if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.i) {
				const index = parseInt(e.currentTarget.dataset.i);
				setHighlight(highlight => (highlight === index ? highlight : index));
			}
		},
		[setHighlight]
	);

	const handleKeyDown = useCallback(
		e => {
			if (
				[9, 13, 27, 38, 40].includes(e.keyCode) &&
				listRef &&
				listRef.current &&
				listRef.current.children.length
			) {
				switch (e.keyCode) {
					case 13:
					case 9:
					case 38:
						e.preventDefault();
						break;
					default:
						break;
				}

				switch (e.keyCode) {
					case 13:
					case 9:
						if (onSelect && highlight !== undefined) {
							e.target.blur();
							onSelect(highlight);
						}
						return;
					case 27:
						if (setList) setList([]);
						return;
					default:
						break;
				}
				let list = listRef.current,
					items = [...list.children],
					itemsLength = items.length;
				if (list !== items[0].offsetParent) list.style.position = "relative";
				switch (e.keyCode) {
					case 38: //up
						let itemUp = items[(highlight > 0 ? highlight : itemsLength) - 1];
						// itemUp.scrollIntoView(false);
						if (
							itemUp.offsetTop < list.scrollTop ||
							itemUp.offsetTop + itemUp.clientHeight === list.scrollHeight
						)
							list.scrollTop = itemUp.offsetTop;
						if (itemUp.dataset && itemUp.dataset.i) setHighlight(parseInt(itemUp.dataset.i));
						break;
					case 40: //down
						let itemDown = items[(highlight + 1 < itemsLength ? highlight : -1) + 1];
						// itemDown.scrollIntoView(false);

						const offsetBottom = itemDown.clientHeight + itemDown.offsetTop;
						if (offsetBottom > list.clientHeight + list.scrollTop)
							list.scrollTop = offsetBottom - list.clientHeight;
						else if (itemDown.offsetTop === 0) list.scrollTop = 0;
						if (itemDown.dataset && itemDown.dataset.i) setHighlight(parseInt(itemDown.dataset.i));
						break;
					default:
						break;
				}
			}
		},
		[listRef, highlight, setList, onSelect]
	);

	return { highlight, setHighlight, handleMouseEnter, handleKeyDown };
};

export const usePromise = ({
	getData = () => undefined,
	defaultError = "",
	handleError = e => e.toString()
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(defaultError);

	useEffect(() => {
		if (defaultError) setError(defaultError);
	}, [defaultError]);

	const handleGetData = useCallback(
		value =>
			new Promise(resolve => {
				setLoading(true);
				if (error) setError("");
				resolve(value);
			})
				.then(getData)
				.catch(e => {
					if (isDev) console.error(e);
					setError(handleError(e));
				})
				.then(() => setLoading(false)),
		[getData, handleError, error]
	);

	return { loading, setLoading, error, setError, handleGetData };
};

export const useClose = ({ wrapperRef, onClose }) => {
	const handleMouseAway = useCallback(
		({ target }) => {
			if (wrapperRef && onClose && wrapperRef.current && !wrapperRef.current.contains(target))
				onClose([]);
		},
		[wrapperRef, onClose]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleMouseAway);
		return () => document.removeEventListener("mousedown", handleMouseAway);
	}, [handleMouseAway]);
};

export const useSetHighlightedValue = ({ setValue, list, highlight, handleLabel }) => {
	const listStateRef = useRef([]);

	useEffect(() => {
		// Storing a reference to the list to avoid having it as a dependency in the next useEffect
		listStateRef.current = list;
	}, [list]);

	useEffect(() => {
		if (setValue && handleLabel && highlight !== undefined && listStateRef.current[highlight])
			setValue(handleLabel(listStateRef.current[highlight]));
	}, [highlight, setValue, handleLabel]);
};
