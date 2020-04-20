import React from "react";
import { shallow } from "enzyme";
import { Input } from "src/components";
import { Loading, Clear } from "src/svgs";
import expect from "expect";

describe("default input", () => {
  it("shows a clear button if it's not loading and it has a ClearSelected prop", () => {
    const wrapperLoading = shallow(<Input loading ClearSelected={Clear} />);
    expect(wrapperLoading.containsMatchingElement(<Loading />)).toBe(true);
    expect(wrapperLoading.containsMatchingElement(<Clear />)).toBe(false);

    const wrapperClear = shallow(<Input ClearSelected={Clear} />);
    expect(wrapperClear.containsMatchingElement(<Clear />)).toBe(true);
    expect(wrapperClear.containsMatchingElement(<Loading />)).toBe(false);
  });

  it("shows a spinner if the loading prop is true", () => {
    const wrapper = shallow(<Input loading />);
    expect(wrapper.containsMatchingElement(<Loading />)).toBe(true);
  });

  const props = { className: "custom-error-class" };

  it("spreads the wrapperProps to the wrapper node", () => {
    const wrapper = shallow(<Input error="error" wrapperProps={props} />);
    expect(wrapper.props()).toInclude(props);
  });

  it("spreads the inputProps to the input node", () => {
    const wrapper = shallow(<Input error="error" inputProps={props} />);
    expect(wrapper.find("input").props()).toInclude(props);
  });

  it("doesn't spread the other props", () => {
    const wrapper = shallow(<Input error="error" {...props} />);
    expect(wrapper.props()).toExclude(props);
  });
});
