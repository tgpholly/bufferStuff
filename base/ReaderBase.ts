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

	public readUShortString() {
		const length = this.readUByte();
		let text = "";

		for (let i = 0; i < length; i++) {
			text += String.fromCharCode(this.readUByte());
		}

		return text;
	}

	public readShortString() {
		const length = this.readByte();
		let text = "";

		for (let i = 0; i < length; i++) {
			text += String.fromCharCode(this.readByte());
		}

		return text;
	}

	public readBytesAsString(bytesToRead:number) {
		let text = "";

		for (let i = 0; i < bytesToRead; i++) {
			text += String.fromCharCode(this.readUByte());
		}

		return text;
	}

	public readVarint() {
		let total = 0;
		let shift = 0;
		let byte = this.readUByte();

		if (!(byte & 0x80)) {
			return (byte & 0x7F);
		} else {
			let end = false;
			while (!end) {
				if (shift) {
					byte = this.readUByte();
				}
				total |= ((byte & 0x7F) << shift);
				end = !(byte & 0x80);
				shift += 7;
			}
		}

		return total;
	}
}