export interface IWriter {
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
	writeLong(value:number): IWriter,
	writeULong(value:number): IWriter,
	writeFloat(value:number): IWriter,
	writeDouble(value:number): IWriter,
	writeString(text:string): IWriter,
	writeShortString(text:string): IWriter
}