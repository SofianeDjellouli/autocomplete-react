### replaceJSX

Replaces the parts of a string matching a target with JSX.

| Arguments                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Returns                                                                 |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| (string : string,<br/>target : string,<br/>flag = "gi" : string,<br/>render = (e, i) => (<strong key={uid(e, i)} style={{ color: "#579ea2" }}>{e}</strong>) : React function)<br/><br/>`string` : String to replace.<br/>`target` : target to match.<br/>`flag` : RegEx flag.<br/>`render` : Function to render the matching parts. It takes two arguments: the substring and its index. Because `replaceJSX` returns a React array, the JSX wrapper will need to have a unique key. | (result : array) <br/><br/>`result` : An array to be rendered in React. |

### debounce

Useful for the getList prop function. To know more about debouncing functions: [Debounce in JavaScript ](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086)

| Arguments                                                                                                                                                                                                          | Returns                                                                                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| (function : function,<br/>wait = 250 : number)<br/><br/>`function` : Function to be debounced.<br/>`wait` : Number of milliseconds to wait before executing the function when it's called multiple times on a row. | (debouncedFunction : function) <br/><br/>`debouncedFunction` : The debounced function. It returns a promise. |
