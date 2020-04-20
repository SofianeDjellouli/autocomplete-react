import React, { useCallback, useMemo } from "react";
import { Clear } from "../../svgs";
import { useClose, useHighlight, usePromise, useSetHighlightedValue } from "../../utils";
import "./style.css";

export const Children = ({
  renderInput,
  renderList,
  renderError,
  renderItem,
  getListProps,
  getItemProps,
  getErrorProps,
  getLabelProps,
  getWrapperProps,
  getInputProps,
  getData,
  onSelect,
  handleChange,
  setList,
  setValue,
  list,
  value,
  label,
  clearStateAndValue,
  handleLabel,
  inputRef,
  wrapperRef,
  listRef,
  defaultError,
}) => {
  useClose({ wrapperRef, onClose: setList });

  const { error, setError, loading, handleGetData } = usePromise({ getData, defaultError });

  const onChange = useCallback(e => handleChange(e, handleGetData), [handleChange, handleGetData]);

  const clickSelect = useCallback(e => onSelect(e.currentTarget.dataset.i), [onSelect]);

  const { highlight, handleMouseEnter, handleKeyDown } = useHighlight({
    listRef,
    onSelect,
    setList,
  });

  useSetHighlightedValue({ setValue, list, highlight, handleLabel });

  const defaultClear = useCallback(() => {
    clearStateAndValue();
    if (error) setError("");
  }, [clearStateAndValue, error, setError]);

  const ClearSelected = useCallback(() => label && <Clear onClick={defaultClear} />, [
    defaultClear,
    label,
  ]);

  const handleClick = useCallback(({ target: { value } }) => handleGetData(value), [handleGetData]);

  const inputProps = getInputProps({
    loading,
    ClearSelected,
    wrapperProps: {
      "aria-label": "autocomplete",
      role: "combobox",
      "aria-expanded": list && list.length > 0,
      "aria-owns": "autocomplete-list",
      "aria-haspopup": "listbox",
      className: "autocomplete-input",
    },
    inputProps: {
      value,
      onChange,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      ref: inputRef,
      autoComplete: "none",
      "aria-autocomplete": "list",
      "aria-controls": "autocomplete-list",
      ...(error && { style: { borderColor: "red" } }),
    },
  });

  const listProps = getListProps({
    list,
    loading,
    value,
    handleLabel,
    highlight,
    listProps: {
      ref: listRef,
      className: "autocomplete-list",
      role: "listbox",
      id: "autocomplete-list",
    },
    itemProps: {
      onMouseEnter: handleMouseEnter,
      onClick: clickSelect,
      className: "autocomplete-item",
      role: "option",
    },
  });

  // inputProps and listProps rely on value and list which change at every render, there's no use in memoizing it.

  const errorProps = useMemo(
    () => getErrorProps({ error, domProps: { className: "autocomplete-error" } }),
    [getErrorProps, error],
  );

  const wrapperProps = useMemo(
    () => getWrapperProps({ ref: wrapperRef, className: "autocomplete-wrapper" }),
    [getWrapperProps, wrapperRef],
  );

  return (
    <div {...wrapperProps}>
      {renderInput(inputProps)}
      {renderList(listProps)}
      {renderError(errorProps)}
    </div>
  );
};
