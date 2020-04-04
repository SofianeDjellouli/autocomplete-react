import React from "react";
import { Loading } from "../../svgs";

import "./style.css";

export const Error = ({ error, domProps = {} }) => {
	return error && <p {...domProps}>{error}</p>;
};

export const Input = ({ ClearSelected, loading, wrapperDomProps = {}, domProps = {} }) => (
	<div {...wrapperDomProps}>
		<input {...domProps} />
		{loading ? <Loading /> : <ClearSelected />}
	</div>
);
