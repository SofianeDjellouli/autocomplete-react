import React, { useCallback, useState } from "react";
import {
  List,
  ListItem,
  TextField,
  ListItemText,
  InputAdornment,
  Paper,
  Collapse,
} from "@material-ui/core";
import { uid } from "react-uid";
import Autocomplete, {
  useHighlight,
  replaceJSX,
  useSetHighlightedValue,
  useClose,
} from "@sofiane-d/autocomplete-react";
import { getState } from "../utils";
import { Search, Clear } from "./icons";
import "./styles.css";

const _getState = value => getState(value).slice(0, 5);

const Children = ({
  handleChange,
  inputRef,
  onSelect,
  clearStateAndValue,
  getData,
  label,
  value,
  list,
  setValue,
  setList,
  listRef,
  handleLabel,
  wrapperRef,
}) => {
  const { highlight, handleMouseEnter, handleKeyDown } = useHighlight({
    listRef,
    onSelect,
    setList,
  });

  useSetHighlightedValue({ setValue, list, highlight, handleLabel });

  useClose({ wrapperRef, onClose: setList });

  const handleClick = useCallback(({ target: { value } }) => getData(value), [getData]);

  return (
    <Paper ref={wrapperRef} className="custom-children-paper" elevation={3}>
      <TextField
        fullWidth
        value={value}
        inputProps={{ ref: inputRef, autoComplete: "none", onClick: handleClick }}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          ...(label && {
            endAdornment: (
              <InputAdornment position="end">
                <Clear onClick={clearStateAndValue} />
              </InputAdornment>
            ),
          }),
        }}
      />
      <Collapse in={list && list.length > 0}>
        <List ref={listRef}>
          {list.map((e, i) => (
            <ListItem
              button
              data-i={i}
              onMouseEnter={handleMouseEnter}
              onClick={() => onSelect(i)}
              key={uid(e, i)}
              {...(i === highlight && { style: { backgroundColor: "#f9f9f9" } })}>
              <ListItemText
                primary={replaceJSX(value, e.label)}
                secondary={replaceJSX(value, e.value)}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};

const CustomChildren = () => {
  const [state, setState] = useState(null);

  const handleValue = useCallback(value => setState(value), []);

  return (
    <Autocomplete state={state} onValue={handleValue} getList={_getState}>
      {Children}
    </Autocomplete>
  );
};

<CustomChildren />;
