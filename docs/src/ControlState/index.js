import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour, getPlaceholder } from "../utils";

const StringControlled = () => {
  const [state, setState] = useState("");

  const handleState = useCallback(value => setState(value ? value.label : value), []);
  const handleClick = useCallback(() => setState("Clicked!"), []);
  const handleFilter = useCallback(({ label }) => !state || state !== label, [state]);

  return (
    <>
      <Autocomplete
        {...{ state }}
        onValue={handleState}
        getList={getColour}
        filterList={handleFilter}
        getInputProps={getPlaceholder("Controlled by a string")}
      />
      <p>
        <Button onClick={handleClick}>Click me</Button>
      </p>
      <p>{`State is: ${JSON.stringify(state)}`}</p>
    </>
  );
};

const ObjectControlled = () => {
  const [state, setState] = useState();
  const handleState = useCallback(state => setState(state), []);
  const handleClick = useCallback(() => setState({ label: "Clicked", id: 2 }), []);

  return (
    <>
      <Autocomplete
        {...{ state }}
        getList={getColour}
        onValue={handleState}
        getInputProps={getPlaceholder("Controlled by an object")}
      />
      <p>
        <Button onClick={handleClick}>Click me</Button>
      </p>
      <p>{`State is: ${JSON.stringify(state)}`}</p>
    </>
  );
};
<>
  <StringControlled />
  <ObjectControlled />
</>;
