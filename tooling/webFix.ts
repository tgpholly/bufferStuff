import { readFileSync, writeFileSync } from "fs";

const builtModule = readFileSync("./lib/index.js", "utf-8");
writeFileSync("./lib/index.js", builtModule.replace("\"use strict\";", `"use strict";
const exports = {};`) +
	`for (const key of Object.keys(exports)) {
	if (key === "default") {
		window[exports.default.toString().split(" ")[1].split("(")[0]] = exports.default;
		continue;
	}
	window[key] = exports[key];
}`);