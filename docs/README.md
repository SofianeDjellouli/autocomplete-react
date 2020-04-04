## A customizable React autocomplete component

 This library provides you with a low-level autocomplete React component (an input and a list) and a higher level default UI/state management that you can customize at will.
 You can choose to customize only parts of it (example with [a customized input](#section-custom-input)) or [the whole component](#section-custom-children). In the last case, you will be able to recreate the default state management as needed, using [the custom hooks](#section-hooks). The default props that are spreaded to the various subcomponents include WAI-ARIA best practices attributes.
 Internally, it uses the [render props pattern](https://reactjs.org/docs/render-props.html) with the [children prop](https://reactjs.org/docs/composition-vs-inheritance.html#containment).
