// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import Vec2 from "../base/Vec2";
import Vec3 from "../base/Vec3";

export default interface IReader {
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
	readVarint(): number,
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
	readArbInt(length: number): number,
	readArbUInt(length: number): number,
	readVec2(): Vec2,
	readVec3(): Vec3,
	readCString(): string
}