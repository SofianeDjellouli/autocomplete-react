const path = require("path");
const fs = require("fs");

module.exports = {
	title: "@sofiane-d/autocomplete-react",
	version: "version 1.0.0",
	usageMode: "expand",
	styleguideDir: "build",
	sections: [
		{
			name: "Introduction",
			content: "README.md",
		},
		{
			name: "Component",
			components: path.resolve(
				"node_modules/@sofiane-d/autocomplete-react/es/components/Autocomplete/index.js"
			),
		},
		{
			name: "Examples",
			sections: [
				{
					name: "Custom UI",
					sections: [
						{ name: "Custom input", content: "src/CustomInput/README.md" },
						{ name: "Custom list", content: "src/CustomList/README.md" },
						{ name: "Custom item", content: "src/CustomItem/README.md" },
						{ name: "Custom error", content: "src/CustomError/README.md" },
						{ name: "Custom children", content: "src/CustomChildren/README.md" },
						{ name: "Styling", content: "src/styling.md" },
					],
				},
				{
					name: "Custom control",
					sections: [
						{ name: "Control state", content: "src/ControlState/README.md" },
						{ name: "Control list", content: "src/ControlList/README.md" },
						{ name: "Control value", content: "src/ControlValue/README.md" },
						{ name: "Control error", content: "src/ControlError/README.md" },
					],
				},
				{
					name: "Handling the select event",
					sections: [
						{ name: "Clear on select", content: "src/ClearOnSelect/README.md" },
						{ name: "Handle select", content: "src/HandleSelect/README.md" },
					],
				},
				{
					name: "A focus on getList",
					sections: [
						{
							name: "Asynchrounously get the list",
							content: "src/AsyncList/README.md",
						},
					],
				},
			],
		},
		{
			name: "Utils",
			description:
				'Some hooks and utility functions to help you recreate the default state management in your custom children. They are all available as named import of `autocomplete-react`.<br/>Example: `import { useHighlight, usePromise } from "autocomplete-react";`<br/>You can see an example of a custom children function using these utils [here](#section-custom-children).',
			sections: [
				{ name: "Hooks", content: "src/hooks.md" },
				{ name: "Functions", content: "src/functions.md" },
			],
		},
		{ description: "This library uses icons from [FontAwesome](https://fontawesome.com/license)" },
	],
	updateExample(props, exampleFilePath) {
		// props.settings are passed by any fenced code block, in this case
		const { settings, lang } = props;
		// "../mySourceCode.js"
		if (typeof settings.file === "string") {
			// "absolute path to mySourceCode.js"

			const filepath = path.resolve(exampleFilePath, settings.file);
			// displays the block as static code
			// settings.static = true;
			// no longer needed
			delete settings.file;
			return {
				content: fs.readFileSync(filepath, "utf8"),
				settings,
				lang,
			};
		}
		return props;
	},
	getComponentPathLine(componentPath) {
		// const name = path.basename(componentPath, ".js");
		// const dir = path.dirname(componentPath);
		// return `import ${name} from "autocomplete-react";`;
		return 'import Autocomplete from "autocomplete-react";';
	},
	ribbon: {
		// Link to open on the ribbon click (required)
		url: "https://github.com/SofianeDjellouli/autocomplete-react",
		// Text to show on the ribbon (optional)
		text: "Fork me on GitHub",
	},
};
