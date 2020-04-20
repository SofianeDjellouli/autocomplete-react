import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour, getPlaceholder } from "../utils";

const renderInput = ({ domProps }) => {
  return <TextField variant="outlined" label="Custom input" fullWidth {...domProps} />;
};

const CustomInput = () => {
  return <Autocomplete renderInput={renderInput} getList={getColour} />;
};

<CustomInput />;
