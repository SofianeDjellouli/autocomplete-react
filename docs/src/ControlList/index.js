import React, { useState, Component } from "react";
import { Button } from "@material-ui/core";
import Autocomplete, { debounce } from "@sofiane-d/autocomplete-react";
import { getColour, getPlaceholder } from "../utils";
import { colourOptions, flavourOptions } from "../data";

const ControlList = () => {
  const [list, setList] = useState([]);

  return (
    <>
      <Button onClick={() => setList(colourOptions)}>Open colors</Button>
      <Button onClick={() => setList(flavourOptions)}>Open flavors</Button>
      <Button onClick={() => setList([])}>Close list</Button>
      <Autocomplete {...{ list, setList }} getList={getColour} />
    </>
  );
};

const getList = debounce(value => {
  if (value) return prevState => [...prevState, value];
});

class ControlClassList extends Component {
  constructor(props) {
    this.state = { list: [] };
    this.setList = this.setList.bind(this);
  }

  setList(handler) {
    this.setState(({ list }) => ({
      list: typeof handler === "function" ? handler(list) : handler,
    }));
  }

  render() {
    return (
      <Autocomplete
        list={this.state.list}
        setList={this.setList}
        getList={getList}
        getInputProps={getPlaceholder("Class component setting the list based on the past list.")}
      />
    );
  }
}

<>
  <ControlList />
  <br />
  <ControlClassList />
</>;
