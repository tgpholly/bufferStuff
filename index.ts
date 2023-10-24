// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import { IReader } from "./readers/IReader";
import { IWriter } from "./writers/IWriter";
import { ReaderBE } from "./readers/ReaderBE";
import { ReaderLE } from "./readers/ReaderLE";
import { WriterBE } from "./writers/WriterBE";
import { WriterLE } from "./writers/WriterLE";

export enum Endian {
	LE,
	BE
}

export function createReader(endianness:Endian, buffer:Buffer) : IReader {
	if (endianness === Endian.LE) {
		return new ReaderLE(buffer);
	} else {
		return new ReaderBE(buffer);
	}
}

export function createWriter(endianness:Endian, size?:number) : IWriter {
	if (endianness === Endian.LE) {
		return new WriterLE(size);
	} else {
		return new WriterBE(size);
	}
}