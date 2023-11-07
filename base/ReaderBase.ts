// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

export class ReaderBase {
	public buffer:Buffer;
	public offset:number;

	public constructor(buffer:Buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}

	public get readOffset() {
		return this.offset;
	}

	public get length() {
		return this.buffer.length;
	}

	public readBuffer(bytes:number) {
		const value = this.buffer.subarray(this.offset, this.offset + bytes);
		this.offset += bytes;
		return value;
	}

	// NOTE: This has to be a copy as the subarray is only cropped & offset
	//		 Realistically this is what we want anyway.
	public readUint8Array(bytes:number) {
		const croppedBuffer = this.readBuffer(bytes);
		const newArray = new Uint8Array(croppedBuffer.length);
		for (let i = 0; i < croppedBuffer.length; i++) {
			newArray[i] = croppedBuffer[i];
		}
		return newArray;
	}

	public readByte() {
		const value = this.buffer.readInt8(this.offset);
		this.offset++;
		return value;
	}

	public readUByte() {
		const value = this.buffer.readUInt8(this.offset);
		this.offset++;
		return value;
	}

	public readBool() {
		return Boolean(this.readUByte());
	}
}