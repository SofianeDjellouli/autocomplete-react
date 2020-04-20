import React from "react";
import { shallow } from "enzyme";
import { Error } from "src/components";
import expect from "expect";

describe("default error", () => {
  it("renders an error message", () => {
    const errorMessage = "Error message";
    const wrapper = shallow(<Error error={errorMessage} />);
    expect(wrapper.text()).toBe(errorMessage);
  });

  it("doesn't render if there's no error prop", () => {
    const wrapper = shallow(<Error />);
    expect(wrapper.type()).toBe(null);
  });

  const props = { className: "custom-error-class" };

  it("spreads the domProps to the component", () => {
    const wrapper = shallow(<Error error="error" domProps={props} />);
    expect(wrapper.props()).toInclude(props);
  });

  it("doesn't spread the other props", () => {
    const wrapper = shallow(<Error error="error" {...props} />);
    expect(wrapper.props()).toExclude(props);
  });
});
