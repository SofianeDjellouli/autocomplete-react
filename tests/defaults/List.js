import React from "react";
import { shallow } from "enzyme";
import { List } from "src/components";
import expect from "expect";

describe("default list", () => {
  const props = { className: "custom-error-class" };

  it("spreads the listProps to the list node", () => {
    const wrapper = shallow(<List handleLabel={e => e.toString()} list={[1]} listProps={props} />);
    expect(wrapper.props()).toInclude(props);
  });

  it("spreads the itemProps to the item nodes", () => {
    const wrapper = shallow(<List handleLabel={e => e.toString()} list={[1]} itemProps={props} />);
    wrapper.children().forEach(e => expect(e.props()).toInclude(props));
  });

  it("doesn't spread the other props", () => {
    const wrapper = shallow(<List handleLabel={e => e.toString()} list={[1]} {...props} />);
    expect(wrapper.props()).toExclude(props);
  });

  it("doesn't render if there's no list", () => {
    const wrapper = shallow(<List />);
    expect(wrapper.type()).toBe(null);
  });

  it("doesn't render if the list is empty", () => {
    const wrapper = shallow(<List list={[]} />);
    expect(wrapper.type()).toBe(null);
  });
});
