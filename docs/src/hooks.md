All the hooks take a single object as an argument. Most of the object properties are given by the arguments of the children function. If not, they have a default value (see below) that you can override.

### useClose
Closes the list when you click outside the `wrapperRef`'s node.

| Arguments | Returns |
| :-- | :-- |
| ({ wrapperRef : ref,<br/>onClose : function<br/>} : object)<br/><br/>`wrapperRef` :	A ref to the node that should close the list if the user clicks outside of it.<br/>`onClose` :	A function to handle the closing of the list. It will be called with an empty array to close the list. | ```undefined```|

### useHighlight
Sets the highlighted item with arrow up, arrow down and `onMouseEnter`, handles the list scrolling, triggers the select event when the user hits Enter and Tab, closes the list when he hits Escape. It requires the items nodes to have a `data-i` attribute with their index:
```list.map((e, i) => <Item	data-i={i}/>```
It also requires the list component to have `position: relative` or `position: absolute` in its style. if no `position` is found, it will be given `position: relative` by default. The direct children of the list must all be the list items.


| Arguments | Returns |
| :-- | :-- |
| ({ onSelect : function,<br/>listRef : ref,<br/>setList : function<br/>} : object)<br/><br/>`listRef` :	A ref to the list.<br/>`setList` :	A function to set the list.<br/>`onSelect` : A function to handle the selected item's index.<br/> | ({ highlight : number,<br/>setHighlight : function,<br/>handleMouseMove : function,<br/>handleKeyDown : function<br/>} : object )<br/><br/>`highlight` : Index of the list item to be highlighted. It can be used to render the list. Ex:<br/><code>`list.map((e, i) => <Item	data-i={i} {...(i === highlight && { style: { background: "lightgray" } }) }/>)`</code> <br/>`setHighlight` : A function to set the highlighted item index.<br/>`handleMouseMove` : An event handler for the onMouseMove handler of the items. It sets the highlighted item index when the mouse hovers over it.<br/>`handleKeyDown` : An event handler for the onKeyDown handler of the input. It will trigger for enter, tab, escape, arrow up and arrow down. For example, to not trigger the event on enter you can control this behavior like this:<br/>```<input onKeyDown={e => { if (e.keyCode!==13) handleKeyDown(e)}} {...props}/>```|


### useSetHighlightedValue
Sets the value of the input to the item that is highlighted.

| Arguments | Returns |
| :-- | :-- |
| ({ setValue : function,<br/>list : array,<br/>highlight : number,<br/>handleLabel : function<br/>} : object)<br/><br/>`setValue` :	A function to set the value.<br/>`list` :	The list of suggestions.<br/>`highlight` :	The index of the highlighted item.<br/>`handleLabel` :	A function to get a string from the highlighted item. | ```undefined```|

### usePromise
Handles the state of a promise. Useful if you want to show to the UI whether the data is loading or if it catches an error.

| Arguments | Returns |
| :-- | :-- |
| ({ getData : function,<br/> defaultError : string,<br/> handleError = e = > e.toString() : function<br/>} : object)<br/><br/>`getData` :	A function to get the data for the list. It will automatically be resolved to a Promise.<br/>`defaultError` : The default error .<br/>`handleError`: A function to handle the error object when the promise is rejected. | ({ loading : bool,<br/> setLoading: function,<br/> error : any,<br/> setError: function,<br/> handleGetData : function<br/>} : object)<br/><br/>`loading` :	Indicates whether the promise is resolved.<br/>`setLoading` : Sets the loading state.<br/>`error`: Error throwed by the promise.<br/>`setError`: Sets the error state.<br/>`handleGetData`: Triggers the getData function with the loading and error states. |