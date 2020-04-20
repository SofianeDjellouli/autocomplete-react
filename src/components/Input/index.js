import React from "react";
import { Loading } from "../../svgs";

import "./style.css";

export const Error = ({ error, domProps = {} }) => {
  return error && <p {...domProps}>{error}</p>;
};

export const Input = ({ ClearSelected, loading, wrapperProps = {}, inputProps = {} }) => (
  <div {...wrapperProps}>
    <input {...inputProps} />
    {loading ? <Loading /> : ClearSelected && <ClearSelected />}
  </div>
);
