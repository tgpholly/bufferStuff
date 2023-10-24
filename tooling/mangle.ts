import { readFileSync, writeFileSync } from "fs";
import { minify } from "terser";

(async () => {
	const mangled = await minify(readFileSync("./lib/index.js").toString(), {
		mangle: true,
		toplevel: true,
	});
	writeFileSync("./lib/index.min.js", `${mangled.code}`);
})();