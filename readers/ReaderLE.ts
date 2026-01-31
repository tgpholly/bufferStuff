// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import IReader from "./IReader";
import ReaderBase from "../base/ReaderBase";
import Vec2 from "../base/Vec2";
import Vec3 from "../base/Vec3";

export default class ReaderLE extends ReaderBase implements IReader {
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

	public readArbInt(length: number) {
		const value = this.buffer.readIntLE(this.offset, length);
		this.offset += length;
		return value;
	}

	public readArbUInt(length: number) {
		const value = this.buffer.readUIntLE(this.offset, length);
		this.offset += length;
		return value;
	}


	public readVec2() {
		const x = this.readFloat();
		const y = this.readFloat();

		return new Vec2(x, y);
	}

	public readVec3() {
		const x = this.readFloat();
		const y = this.readFloat();
		const z = this.readFloat();

		return new Vec3(x, y, z);
	}

	public readCString() {
		let textCharacters = "";

		while(true) {
			const byte = this.readUByte();
			if (byte == 0) {
				break;
			}
			textCharacters += String.fromCharCode(byte);
		}

		return textCharacters;
	}
}