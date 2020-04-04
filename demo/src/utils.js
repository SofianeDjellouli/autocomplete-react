import { colourOptions, stateOptions, flavourOptions, groupOptions } from "./data";

const getOptions = (options) => (value) => {
	const list = options.filter((e) => e.label.toLowerCase().includes(value.toLowerCase()));
	return list;
};

export const getColour = getOptions(colourOptions);
export const getState = getOptions(stateOptions);
export const getFlavour = getOptions(flavourOptions);
export const getGroups = getOptions(groupOptions);

export const getPlaceholder = (placeholder) => (props) => ({
	...props,
	domProps: { ...props.domProps, placeholder },
});
