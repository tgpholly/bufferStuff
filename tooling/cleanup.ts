// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import { readdirSync, rmSync, renameSync } from "fs";

const libFiles = readdirSync("./lib");

for (const file of libFiles) {
	if (!file.startsWith("combined")) {
		rmSync(`./lib/${file}`, { recursive: true });
	}
}

renameSync("./lib/combined.js", "./lib/index.js");
renameSync("./lib/combined.d.ts", "./lib/index.d.ts");