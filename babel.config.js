module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		env: {
			production: {
				plugins: ["react-native-paper/babel"],
			},
		},
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						components: "./components",
						screens: "./screens",
						hooks: "./hooks",
						modals: "./modals",
						services: "./services",
						constants: "./constants",
						navigation: "./navigation",
						actions: "./actions",
						reducers: "./reducers",
						types: "./types.tsx",
						classes: "./classes",
					},
				},
			],
		],
	};
};
