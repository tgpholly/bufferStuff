// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

export interface IReader {
	readBuffer(bytes:number): Buffer,
	readUint8Array(bytes:number): Uint8Array,
	readByte(): number,
	readUByte(): number,
	readBool(): boolean,
	readShort(): number,
	readUShort(): number,
	readInt(): number,
	readUInt(): number,
	readLong(): bigint,
	readULong(): bigint,
	readFloat(): number,
	readDouble(): number,
	readShortString(): string,
	readString(): string,
	readString16(): string,
}