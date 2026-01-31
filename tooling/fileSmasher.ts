// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

// fileSmasher ~.~
// for when you're just too lazy to
// do it properly.

import { readdirSync, lstatSync, readFileSync, writeFileSync } from "fs";

const tsFileData:Array<string> = new Array<string>();

// Github Actions forced my hand
const toolinglessFolderPath = __dirname.replace("/tooling", "/");

function readDir(nam:string) {
	const files = readdirSync(nam);
	for (const file of files) {
		if (nam == toolinglessFolderPath && (file.startsWith(".") || file == "tooling" || file == "lib" || file == "node_modules" || file == "combined.ts")) {
			continue;
		}
		
		if (lstatSync(`${nam}/${file}`).isDirectory()) {
			readDir(`${nam}/${file}`);
		} else if (file.endsWith(".ts")) {
			tsFileData.push(readFileSync((`${nam}/${file}`).replace("//", "/")).toString());
		}
	}
}

readDir(toolinglessFolderPath);

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
	"class:Vec2",
	"class:Vec3",
	"interface:IReader",
	"interface:IWriter"
];

function checkForMatchAndReplace(s:string) {
	for (const tUExp of unExport) {
		const spl = tUExp.split(":");
		const type = spl[0];
		if (s.startsWith(`export ${type} ${spl[1]}`)) {
			return s.replace(`export ${type} ${spl[1]}`, `${type} ${spl[1]}`);
		}
		if (s.startsWith(`export default ${type} ${spl[1]}`)) {
			return s.replace(`export default ${type} ${spl[1]}`, `${type} ${spl[1]}`);
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
	// if (process.argv[2] === "forweb") {
	// 	resultLines.push(line.replace("export default class", "class").replace("export default interface", "interface").replace("export default function", "function").replace("export class", "class").replace("export function", "function").replace("export enum", "enum").replace("export interface", "interface"));
	// } else {
	// 	resultLines.push(checkForMatchAndReplace(line));
	// }
}

writeFileSync("./combined.ts", resultLines.join("\n"));
