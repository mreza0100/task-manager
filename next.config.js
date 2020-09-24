const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([
	[
		(config, options) => {
			return withBundleAnalyzer(options);
		},
	],
	[
		(config, options) => {
			return withImages(options);
		},
	],
]);
