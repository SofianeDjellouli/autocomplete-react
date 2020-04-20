import React, { useCallback, useState } from "react";
import { Chip } from "@material-ui/core";
import Autocomplete from "@sofiane-d/autocomplete-react";
import { getColour, getPlaceholder } from "../utils";

const ClearOnSelect = () => {
  const [items, setItems] = useState([]);

  const handleItems = useCallback(item => setItems(items => [...items, item]), []);

  const handleDelete = useCallback(
    i => () =>
      setItems(items => {
        let _items = [...items];
        _items.splice(i, 1);
        return _items;
      }),
    [],
  );

  const handleFilter = useCallback(
    ({ value }) => {
      for (let i = 0; i < items.length; i++) if (items[i].value === value) return false;
      return true;
    },
    [items],
  );

  return (
    <>
      <Autocomplete
        clearOnSelect
        getList={getColour}
        onValue={handleItems}
        filterList={handleFilter}
      />
      {items && items.length > 0 && (
        <>
          <br />
          <div>
            {items.map(({ label }, i) => (
              <Chip
                {...{ label }}
                key={label + i}
                color="primary"
                data-i={i}
                onDelete={handleDelete(i)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const NoFocusOnClear = () => {
  const [items, setItems] = useState([]);

  const handleItems = useCallback(item => setItems(items => [...items, item]), []);

  const handleDelete = useCallback(
    i => () =>
      setItems(items => {
        let _items = [...items];
        _items.splice(i, 1);
        return _items;
      }),
    [],
  );

  const handleFilter = useCallback(
    ({ value }) => {
      for (let i = 0; i < items.length; i++) if (items[i].value === value) return false;
      return true;
    },
    [items],
  );

  return (
    <>
      <Autocomplete
        clearOnSelect
        focusOnClear={items && items.length < 2}
        getList={getColour}
        onValue={handleItems}
        filterList={handleFilter}
        getInputProps={getPlaceholder("Add three colors.")}
      />
      {items && items.length > 0 && (
        <>
          <br />
          <div>
            {items.map(({ label }, i) => (
              <Chip
                {...{ label }}
                key={label + i}
                color="primary"
                data-i={i}
                onDelete={handleDelete(i)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
<>
  <ClearOnSelect />
  <br />
  <NoFocusOnClear />
</>;
