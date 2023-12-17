export const QUESTIONS = [
	{
		id: "1",
		title: "What does HTML stand for?",
		options: [
			{ id: "1", option: "Hyper Text Markup Language" },
			{ id: "2", option: "Highly Typed Machine Learning" },
			{ id: "3", option: "Home Tool Markup Language" },
		],
	},
	{
		id: "2",
		title: "Which tag is used for creating an ordered list?",
		options: [
			{ id: "1", option: "<ul>" },
			{ id: "2", option: "<li>" },
			{ id: "3", option: "<ol>" },
		],
	},
	{
		id: "3",
		title:
			"In CSS, what property is used to change the text color of an element?",
		options: [
			{ id: "1", option: "color" },
			{ id: "2", option: "background-color" },
			{ id: "3", option: "text-color" },
		],
	},
	{
		id: "4",
		title: "Which HTML tag is used for creating a hyperlink?",
		options: [
			{ id: "1", option: "<a>" },
			{ id: "2", option: "<h1>" },
			{ id: "3", option: "<p>" },
		],
	},
	{
		id: "5",
		title: "What is the purpose of the CSS 'box-sizing' property?",
		options: [
			{ id: "1", option: "Determines the box model for an element" },
			{ id: "2", option: "Specifies the size of the box" },
			{ id: "3", option: "Defines the spacing around an element" },
		],
	},
	{
		id: "6",
		title:
			"Which CSS property is used to set the background image of an element?",
		options: [
			{ id: "1", option: "background-image" },
			{ id: "2", option: "background-color" },
			{ id: "3", option: "image-source" },
		],
	},
	{
		id: "7",
		title: "What does the acronym CSS stand for?",
		options: [
			{ id: "1", option: "Cascading Style Sheet" },
			{ id: "2", option: "Computer Style Sheet" },
			{ id: "3", option: "Creative Style Sheet" },
		],
	},
	{
		id: "8",
		title: "Which HTML tag is used to define an image?",
		options: [
			{ id: "1", option: "<img>" },
			{ id: "2", option: "<picture>" },
			{ id: "3", option: "<image>" },
		],
	},
	{
		id: "9",
		title: "What is the purpose of the CSS 'float' property?",
		options: [
			{ id: "1", option: "Specifies how an element should be positioned" },
			{ id: "2", option: "Determines the transparency of an element" },
			{ id: "3", option: "Controls the flow of content around an element" },
		],
	},
	{
		id: "10",
		title:
			"Which CSS selector is used to select elements with a specific class?",
		options: [
			{ id: "1", option: ".class" },
			{ id: "2", option: "#id" },
			{ id: "3", option: "element" },
		],
	},

	{
		id: "11",
		title: "Explain the CSS Box Model and its components.",
		options: [
			{ id: "1", option: "Content, Padding, Border, Margin" },
			{ id: "2", option: "Box, Model, Components, Layout" },
			{ id: "3", option: "Width, Height, Padding, Border" },
		],
	},
	{
		id: "12",
		title:
			"What is the difference between CSS Grid and Flexbox, and when would you use each?",
		options: [
			{
				id: "1",
				option: "Grid is for 2D layouts, Flexbox is for 1D layouts",
			},
			{
				id: "2",
				option: "Flexbox is for 2D layouts, Grid is for 1D layouts",
			},
			{ id: "3", option: "There is no significant difference" },
		],
	},
	{
		id: "13",
		title:
			"Describe the concept of closures in JavaScript and provide an example.",
		options: [
			{
				id: "1",
				option:
					"Closures capture and store references to the outer function's variables",
			},
			{ id: "2", option: "Closures only occur in asynchronous JavaScript" },
			{ id: "3", option: "Closures are only applicable to arrow functions" },
		],
	},
	{
		id: "14",
		title:
			"How does event delegation work in JavaScript, and why is it useful?",
		options: [
			{
				id: "1",
				option:
					"Event delegation allows you to directly attach events to child elements",
			},
			{ id: "2", option: "Event delegation is not supported in JavaScript" },
			{
				id: "3",
				option: "Event delegation is only applicable to inline event handlers",
			},
		],
	},
	{
		id: "15",
		title:
			"Explain the concept of memoization in the context of optimizing function performance.",
		options: [
			{
				id: "1",
				option:
					"Memoization is a caching technique to optimize repeated function calls",
			},
			{ id: "2", option: "Memoization is only used for debugging purposes" },
			{
				id: "3",
				option: "Memoization is not applicable in functional programming",
			},
		],
	},
	{
		id: "16",
		title:
			"What are WebSockets, and how do they differ from traditional HTTP communication?",
		options: [
			{
				id: "1",
				option:
					"WebSockets provide full-duplex communication over a single, long-lived connection",
			},
			{
				id: "2",
				option: "WebSockets are slower than traditional HTTP communication",
			},
			{
				id: "3",
				option: "WebSockets are used only for static content delivery",
			},
		],
	},
	{
		id: "17",
		title:
			"Discuss the pros and cons of using local storage versus cookies for storing client-side data.",
		options: [
			{
				id: "1",
				option:
					"Local storage has more storage capacity but is not sent with every HTTP request",
			},
			{
				id: "2",
				option: "Cookies are more secure but have limited storage capacity",
			},
			{
				id: "3",
				option:
					"Both local storage and cookies have similar advantages and disadvantages",
			},
		],
	},
	{
		id: "18",
		title: "Explain the purpose and usage of the 'this' keyword in JavaScript.",
		options: [
			{
				id: "1",
				option:
					"'this' refers to the current object and is used in object-oriented programming",
			},
			{
				id: "2",
				option: "'this' always refers to the global object in JavaScript",
			},
			{ id: "3", option: "'this' is only used in arrow functions" },
		],
	},
	{
		id: "19",
		title:
			"What are CSS preprocessors, and how do they enhance the styling capabilities of web development?",
		options: [
			{
				id: "1",
				option:
					"CSS preprocessors extend CSS with variables, nesting, and mixins",
			},
			{ id: "2", option: "CSS preprocessors are only used for minification" },
			{ id: "3", option: "CSS preprocessors are the same as regular CSS" },
		],
	},
	{
		id: "20",
		title:
			"Describe the differences between the 'let', 'const', and 'var' keywords in JavaScript.",
		options: [
			{
				id: "1",
				option:
					"'let' and 'const' have block scope, while 'var' has function scope",
			},
			{
				id: "2",
				option:
					"'var' is used for constants, while 'let' and 'const' are for variables",
			},
			{
				id: "3",
				option:
					"'let' and 'const' are interchangeable, and 'var' is deprecated",
			},
		],
	},
];
