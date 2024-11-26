// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import { IReader } from "./IReader";
import { ReaderBase } from "../base/ReaderBase";

export class ReaderLE extends ReaderBase implements IReader {
	public readShort() {
		const value = this.buffer.readInt16LE(this.offset);
		this.offset += 2
		return value;
	}

	public readUShort() {
		const value = this.buffer.readUInt16LE(this.offset);
		this.offset += 2
		return value;
	}

	public readInt() {
		const value = this.buffer.readInt32LE(this.offset);
		this.offset += 4;
		return value;
	}

	public readUInt() {
		const value = this.buffer.readUInt32LE(this.offset);
		this.offset += 4;
		return value;
	}

	public readLong() {
		const value = this.buffer.readBigInt64LE(this.offset);
		this.offset += 8;
		return value;
	}

	public readULong() {
		const value = this.buffer.readBigUInt64LE(this.offset);
		this.offset += 8;
		return value;
	}

	public readFloat() {
		const value = this.buffer.readFloatLE(this.offset);
		this.offset += 4;
		return value;
	}

	public readDouble() {
		const value = this.buffer.readDoubleLE(this.offset);
		this.offset += 8;
		return value;
	}

	public readUString() {
		const length = this.readUShort();
		let text:string = "";

		for (let i = 0; i < length; i++) {
			text += String.fromCharCode(this.readUByte());
		}

		return text;
	}

	public readString() {
		const length = this.readShort();
		let text:string = "";

		for (let i = 0; i < length; i++) {
			text += String.fromCharCode(this.readByte());
		}

		return text;
	}
	
	public readUString16() {
		const length = this.readUShort();
		let text:string = "";

		for (let i = 0; i < length; i++) {
			text += String.fromCharCode(this.readUShort());
		}

		return text;
	}

	public readString16() {
		const length = this.readShort();
		let text:string = "";

		for (let i = 0; i < length; i++) {
			text += String.fromCharCode(this.readShort());
		}

		return text;
	}

	public readShortsAsString(shortsToRead:number) {
		let text = "";

		for (let i = 0; i < shortsToRead; i++) {
			text += String.fromCharCode(this.readUShort());
		}

		return text;
	}
}