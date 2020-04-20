import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour } from "../utils";

const ControlValue = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Autocomplete {...{ value, setValue }} getList={getColour} />
      <Button onClick={() => setValue("")}>Clear</Button>
      <Button onClick={() => setValue("Some special value")}>Set value</Button>
    </>
  );
};

<ControlValue />;
