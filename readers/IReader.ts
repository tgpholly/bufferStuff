// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

export interface IReader {
	readOffset: number,
	length: number,
	readBuffer(bytes:number): Buffer,
	readUint8Array(bytes:number): Uint8Array,
	readByte(): number,
	readUByte(): number,
	readBool(): boolean,
	readUShortString(): string,
	readShortString(): string,
	readBytesAsString(bytesToRead:number): string,
	readShort(): number,
	readUShort(): number,
	readInt(): number,
	readUInt(): number,
	readLong(): bigint,
	readULong(): bigint,
	readFloat(): number,
	readDouble(): number,
	readUString(): string,
	readString(): string,
	readShortsAsString(shortsToRead:number): string,
	readUString16(): string,
	readString16(): string,
}