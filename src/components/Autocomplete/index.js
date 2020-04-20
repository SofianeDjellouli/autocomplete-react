import React, { useCallback, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Children, Input, List, Error, Item } from "../";
import { useOverride } from "./utils";

export const Autocomplete = ({
  children,
  getLabel,
  handleSelect,
  getList,
  onValue,
  clearOnSelect,
  state,
  cache,
  focusOnClear,
  filterList,
  ..._props
}) => {
  const { value, setValue, list, setList, inputRef, ...props } = useOverride(_props); // for props overriding

  const handleLabel = useCallback(e => (e ? (typeof e === "string" ? e : getLabel(e)) : ""), [
    getLabel,
  ]);

  const label = useMemo(() => handleLabel(state), [handleLabel, state]);

  const filteredList = useMemo(
    () =>
      Array.isArray(list) && list.length
        ? list.filter(filterList || (state ? e => handleLabel(e) !== label : Boolean))
        : [],
    [list, filterList, handleLabel, state, label],
  );

  useEffect(() => {
    if (label) setValue(label);
  }, [label, setValue]);

  const clearState = useCallback(() => {
    if (label && onValue) onValue(null, { value, list: filteredList });
  }, [label, onValue, value, filteredList]);

  const clearStateAndValue = useCallback(() => {
    setValue("");
    if (inputRef.current && focusOnClear) inputRef.current.focus();
    clearState();
  }, [setValue, inputRef, focusOnClear, clearState]);

  const onSelect = useCallback(
    i => {
      if (onValue) onValue(filteredList[i], { i, value, list: filteredList });
      if (handleSelect) handleSelect({ i, setList, setValue });
      else {
        setList([]);
        if (clearOnSelect) clearStateAndValue();
        else if (!label) setValue(handleLabel(filteredList[i]));
      }
    },
    [
      onValue,
      clearStateAndValue,
      label,
      handleLabel,
      value,
      filteredList,
      setList,
      setValue,
      clearOnSelect,
      handleSelect,
    ],
  );

  const memo = useRef({});
  const newCache = useRef(); // Prevents async getList function from overriding setting list from the cache

  const getData = useCallback(
    value => {
      if (cache && memo.current && memo.current.hasOwnProperty(value)) {
        newCache.current = false;
        setList(memo.current[value]);
      } else {
        newCache.current = true;
        return Promise.resolve(getList(value)).then(result => {
          if (newCache.current && result) {
            setList(result);
            if (cache && memo.current) memo.current[value] = result;
          }
        });
      }
    },
    [setList, getList, cache],
  );

  const handleChange = useCallback(
    ({ target: { value = "" } = {} } = {}, getList = getData) => {
      clearState();
      setValue(value);
      getList(value);
    },
    [setValue, clearState, getData],
  );

  const data = {
    handleChange,
    inputRef,
    onSelect,
    clearStateAndValue,
    clearState,
    getData,
    label,
    value,
    list: filteredList,
    setValue,
    setList,
    handleLabel,
    ...props,
  };
  return <>{children(data)}</>;
};

const returnValue = e => e;

Autocomplete.defaultProps = {
  clearOnSelect: false,
  focusOnClear: true,
  getLabel: e => e.label,
  getList: () => [],
  cache: true,
  state: "",
  children: Children,
  renderInput: Input,
  renderList: List,
  renderError: Error,
  renderItem: Item,
  getListProps: returnValue,
  getItemProps: returnValue,
  getErrorProps: returnValue,
  getLabelProps: returnValue,
  getWrapperProps: returnValue,
  getInputProps: returnValue,
};

Autocomplete.propTypes = {
  /**
   * A custom children function. If you use this prop, the `get(Error|List|Input|Item)Props` and the `render(Error|List|Input|Item)` props are no longer necessary because it gives you control on what you render and on the props you pass. See the [Custom children example](#section-custom-children).
   *
   * @param {Object} props - The children's props<br/>
   *  @param {function} props.clearStateAndValue - Clears the input and the state (if the component is controlled).<br/>
   * @param {function} props.getData - Gets the list from the value. It takes one argument: value (string). In order to open the list with the value of the input when the user clicks on it, you can pass this function the onClick handler of the input: <br/>```onClick={({ target: { value } }) => getData(value)}```<br/>You can also pass a custom `getData` function to it, like the one returned by [the usePromise hook](#usePromise).<br/>
   * @param {function} props.handleChange - A function to handle the change event of the input. It accepts a custom `getData` function as a second parameter (optional). This second parameter is by default a handler of the `props.getList` function. You can change it with a custom getData function, like the one returned by [the usePromise hook](#usePromise).<br/>
   * @param {function} props.handleLabel - Handles the state's label if the component is controlled. Returns a string. It's a handler of the `getLabel` prop.<br/>
   * @param {Object} props.inputRef - A ref to be passed to the input component.<br/>
   * @param {array} props.list - The current list.<br/>
   * @param {Object} props.listRef - A ref to be passed to the list wrapper.<br/>
   * @param {function} props.onSelect - A function to handle the select event. It takes the index of the selected item as an argument (string). It will trigger both the `onValue` and the `handleSelect` props if they are specified.<br/>
   * @param {function} props.setList - Function to set the list. See the setList prop below.<br/>
   * @param {function} props.setValue - Function to set the value. See the setValue prop below.<br/>
   * @param {string} props.value - The current value.<br/>
   * @param {Object} props.wrapperRef - A ref to be passed to the component wrapper. Useful for the [useClose hook](#useclose).<br/>
   */
  children: PropTypes.func,

  /**
   * Set to `true` if you want to clear the input upon select (see the [Clear on select example](#section-clear-on-select)). Useful if you want to trigger a new search after the user choses an item, like to add items to a list.
   */
  clearOnSelect: PropTypes.bool,

  /**
   *Controls the displayed error. See the [control error example](#section-control-error).
   */
  defaultError: PropTypes.string,

  /**
   * A function to filter the list. If you control the component with the `state` prop, it will by default remove the items that have the same label as the state. Used in [this example](#section-clear-on-select).
   */
  filterList: PropTypes.func,

  /**
   * Whether to focus the input on clear if you use the `clearOnSelect` prop.
   */
  focusOnClear: PropTypes.bool,

  /**
   * Controls the props that will be spreaded to the error component.
   * @param {Object} props<br/>
   * @param {string} props.error - The error itself.
   * @param {Object} props.domProps - Props spreaded to the React DOM element.<br/>
   */
  getErrorProps: PropTypes.func,

  /**
   * Controls the props that will be spreaded to the input component.
   * @param {Object} props<br/>
   * @param {bool} props.loading - Is the data loading.<br/>
   * @param {string} props.error - Has an error been detected.<br/>
   * @param {elementType} props.ClearSelected - A component to clear the state (if controlled) and the input.<br/>
   * @param {Object} props.wrapperDomProps - Props spreaded to the React DOM element wrapping the input (including ref).<br/>
   * @param {Object} props.domProps - Props spreaded to the React DOM element pf the input (including ref).<br/>
   */
  getInputProps: PropTypes.func,

  /**
   * Controls the props that will be spreaded to the item.
   * @param {Object} props<br/>
   * @param {string} props.value - The value of the input.<br/>
   * @param {function} props.handleLabel - Reduces the item to a string.<br/>
   * @param {string} props.highlight - Index of the item to be highlighted.<br/>
   * @param {Object} props.domProps - Props spreaded to the React DOM element (including ref).<br/>
   */
  getItemProps: PropTypes.func,

  /**
   * If the component is controlled and its state is an object, resolves this object to a string. All the edge cases are handled inside the hood (state is null, etc.)
   * @param {Object} state - The state of the component.
   */
  getLabel: PropTypes.func,

  /**
   * Sets the list based on the value of the input.
   * @param {string} value - The value of the input.
   * @returns {array | function} list : (array | function) - The list to be set. If you return a function, it will be used to set the list based on the current list using the first argument of the function. A `useState` hook function accepts this callback by default. It you control the list with a class component, you need to handle this case like in [this example](#section-control-list).
   */
  getList: PropTypes.func,

  /**
   * Controls the props that will be spreaded to the list component.
   * @param {Object} props<br/>
   * @param {array} props.list - The current list.<br/>
   * @param {bool} props.loading - Is data loading.<br/>
   * @param {Object} props.domProps - Props spreaded to the React DOM element (including ref).<br/>
   * @param {function} props.renderItem - A high-order React function that takes the item props returned by `getItemProps`, then is used to map the list to return the item.
   */
  getListProps: PropTypes.func,

  /**
   * Controls the props that will be spreaded to the wrapping component.
   * @param {Object} props - Props spreaded to the React DOM element (including ref).<br/>
   */
  getWrapperProps: PropTypes.func,

  /**
   * Handles the list and the value of the input upon select.
   * Will override `clearOnSelect` and the default behavior.
   * Useful if you want to keep the list open after the users selects an item or if you want to manipulate the input with a custom ref. [See this example.](#section-handle-select)
   * @param {Object} params<br/>
   * @param {string} params.index - The index of the selected item.<br/>
   * @param {function} params.setList - Function to handle the list.<br/>
   * @param {function} params.setValue - Function to handle the value of the input.<br/>
   */
  handleSelect: PropTypes.func,

  /**
   * Ref to be passed to the input.
   */
  inputRef: PropTypes.object,

  /**
   * Controls the list. If you pass this prop, you must pass a `setList` prop as well.
   */
  list: PropTypes.array,

  /**
   * Ref to be passed to the list.
   */
  listRef: PropTypes.object,

  /**
   * Whether to cache the results of getList.
   */
  cache: PropTypes.bool,

  /**
   * Handles the selected value. Useful to set the `state` value of the props.
   * @param {string|object} item - The selected item.<br/>
   * @param {Object} data<br/>
   * @param {string} data.index - The index of the selected item.<br/>
   * @param {array} data.list - The current list.<br/>
   * @param {string} data.value - The current value.<br/>
   */
  onValue: PropTypes.func,

  /**
   * A custom component to render the error. [See this example.](#section-custom-error)
   */
  renderError: PropTypes.elementType,

  /**
   * A custom component to render the input. [See this example.](#section-custom-input)
   */
  renderInput: PropTypes.elementType,

  /**
   * A custom component to render the item. [See this example.](#section-custom-item)
   */
  renderItem: PropTypes.elementType,

  /**
   * A custom component to render the list. [See this example.](#section-custom-list)
   */
  renderList: PropTypes.elementType,

  /**
   * Controls the list. If you pass this prop, you must pass a `list` prop as well.
   * It can be a `useState` hook or a React class function like `setList = list = > this.setState({ list })`
   */
  setList: PropTypes.func,

  /**
   * Controls the value. If you pass this prop, you must pass a `value` prop as well.
   * It can be a `useState` hook or a React class function like `setValue = value = > this.setState({ value })`
   */
  setValue: PropTypes.func,

  /**
   * Controls the input when set to a true value from a boolean point of view. Set to null when the value of the input changes. Highly useful for an update profile form or a sign-up form. [See these examples.](#section-control-state)
   */
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Controls the value of the input. If you pass this prop, you must pass a `setValue` prop as well.
   */
  value: PropTypes.string,

  /**
   * Ref to be passed to the wrapper component. Useful for the [useClose hook](#useclose).
   */
  wrapperRef: PropTypes.object,
};
