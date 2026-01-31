// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import Vec2 from "../base/Vec2";
import Vec3 from "../base/Vec3";

export default interface IWriter {
	writeOffset: number,
	length: number,
	toBuffer(): Buffer,
	toString(): string,
	writeBuffer(buffer:Buffer): IWriter,
	writeUint8Array(array:Uint8Array): IWriter,
	writeByte(value:number): IWriter,
	writeUByte(value:number): IWriter,
	writeBool(value:boolean|number): IWriter,
	writeStringAsBytes(text:string): IWriter,
	writeShort(value:number): IWriter,
	writeUShort(value:number): IWriter,
	writeInt(value:number): IWriter,
	writeUInt(value:number): IWriter,
	writeLong(value:number|bigint): IWriter,
	writeULong(value:number|bigint): IWriter,
	writeFloat(value:number): IWriter,
	writeDouble(value:number): IWriter,
	writeShortString(text:string): IWriter,
	writeString(text:string): IWriter,
	writeString16(text:string): IWriter,
	writeStringAsShorts(text:string): IWriter,
	writeVec2(vec:Vec2): IWriter,
	writeVec3(vec:Vec3): IWriter,
	writeCString(text:string): IWriter
}