import React from "react";
import { Button, Paper } from "@material-ui/core";
import Autocomplete, { replaceJSX } from "@sofiane-d/autocomplete-react";
import { getColour, getFlavour, getPlaceholder } from "../utils";
import "./styles.css";

const renderList = ({ domProps: { className, ...domProps } = {}, list, renderItem }) => {
  return (
    list &&
    list.length > 0 && (
      <Paper className="paper-style" elevation={3}>
        <div style={{ maxHeight: 200, overflowY: "auto" }} {...domProps}>
          {list.map(renderItem)}
        </div>
        <div className="button-wrapper">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              const random = Math.random();
              window.alert(list[Math.floor(random * list.length)].label);
            }}>
            I'm feeling lucky
          </Button>
        </div>
      </Paper>
    )
  );
};

const CustomList = () => {
  return (
    <Autocomplete
      renderList={renderList}
      getList={getColour}
      getInputProps={getPlaceholder("Custom list")}
    />
  );
};

<CustomList />;
