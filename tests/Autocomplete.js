import React from "react";
import { mount } from "enzyme";
import { Autocomplete } from "src/components";
import { getColour } from "../docs/src/utils";
import expect from "expect";

describe("default children", () => {
  const value = "a";

  it("you can write an input", () => {
    const wrapper = mount(<Autocomplete />);
    wrapper.find("input").simulate("change", { target: { value } });
    expect(wrapper.find("input").props().value).toBe(value);
  });

  it("you can get a list", () => {
    const wrapper = mount(<Autocomplete getList={getColour} />);
    Promise.resolve(wrapper.find("input").simulate("change", { target: { value } })).then(_ => {
      console.log(wrapper.find(".autocomplete-list").props().list);
      expect(wrapper.find(".autocomplete-list").props().list).toEqual(getColour(value));
    });
  });
});
