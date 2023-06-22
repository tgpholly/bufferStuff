// fileSmasher ~.~
// for when you're just too lazy to
// do it properly.

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

let tsFileData:Array<string> = new Array<string>();

function readDir(nam:string) {
	const files = readdirSync(nam);
	for (const file of files) {
		if (nam == "./" && (file.startsWith(".") || file == "tooling" || file == "lib" || file == "node_modules" || file == "combined.ts")) {
			continue;
		}

		// This is a very dumb way of checking for folders
		// protip: don't do this.
		if (statSync(`${nam}/${file}`).size == 0) {
			readDir(`${nam}/${file}`);
		} else if (file.endsWith(".ts")) {
			tsFileData.push(readFileSync((`${nam}/${file}`).replace("//", "/")).toString());
		}
	}
}

readDir("./");

const combinedFiles = tsFileData.join("\n");

const splitLines = combinedFiles.split("\n");
const resultLines:Array<string> = new Array<string>();

const unExport = [
	"class:ReaderBase",
	"class:ReaderLE",
	"class:ReaderBE",
	"class:WriterBase",
	"class:WriterLE",
	"class:WriterBE",
];

function checkForMatchAndReplace(s:string) {
	for (const tUExp of unExport) {
		const spl = tUExp.split(":");
		const type = spl[0];
		if (s.startsWith(`export ${type} ${spl[1]}`)) {
			return s.replace(`export ${type} ${spl[1]}`, `${type} ${spl[1]}`);
		}
	}

	return s;
}

// Let's process the file to make it usable
for (const line of splitLines) {
	// Throw away imports as they aren't needed
	// TODO: Add allow list for npm module imports
	if (line.startsWith("import")) {
		continue;
	}
	// Fix up classes, interfaces and such.
	resultLines.push(checkForMatchAndReplace(line));
	//resultLines.push(line.replace("export class", "class").replace("export interface", "interface").replace("export enum", "enum"));
}

writeFileSync("./combined.ts", resultLines.join("\n"));