// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

export interface IWriter {
	writeOffset: number,
	length: number,
	toBuffer(): Buffer,
	toString(): string,
	writeBuffer(buffer:Buffer): IWriter,
	writeUint8Array(array:Uint8Array): IWriter,
	writeByte(value:number): IWriter,
	writeUByte(value:number): IWriter,
	writeBool(value:boolean|number): IWriter,
	writeShort(value:number): IWriter,
	writeUShort(value:number): IWriter,
	writeInt(value:number): IWriter,
	writeUInt(value:number): IWriter,
	writeLong(value:number|bigint): IWriter,
	writeULong(value:number): IWriter,
	writeFloat(value:number): IWriter,
	writeDouble(value:number): IWriter,
	writeShortString(text:string): IWriter,
	writeString(text:string): IWriter,
	writeString16(text:string): IWriter,
}