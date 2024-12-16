// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import { readFileSync, writeFileSync } from "fs";
import { minify } from "terser";

(async () => {
	const mangled = await minify(readFileSync("./lib/index.js").toString(), {
		mangle: true,
		toplevel: true,
	});
	writeFileSync("./lib/index.min.js", `${mangled.code}`);
})();