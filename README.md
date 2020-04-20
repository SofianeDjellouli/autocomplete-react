# autocomplete-react

[![npm package][npm-badge]][npm]

## A customizable React autocomplete component

This library provides you with a low-level autocomplete React component (an input and a list) and a higher level default UI/state management that you can customize at will.
You can choose to customize only parts of it (example with [a customized input](https://autocomplete-react.firebaseapp.com/#section-custom-input)) or [the whole component](https://autocomplete-react.firebaseapp.com/#section-custom-children). In the last case, you will be able to recreate the default state management as needed, using [the custom hooks](https://autocomplete-react.firebaseapp.com/#section-hooks). The default props that are spreaded to the various subcomponents include WAI-ARIA best practices attributes.
Internally, it uses the [render props pattern](https://reactjs.org/docs/render-props.html) with the [children prop](https://reactjs.org/docs/composition-vs-inheritance.html#containment).

### Get started

```
# With yarn
yarn add @sofiane-d/autocomplete-react
```

```
# With NPM
npm i @sofiane-d/autocomplete-react
```

**[Examples and docs](https://autocomplete-react.firebaseapp.com)**

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
