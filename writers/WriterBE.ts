// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import IWriter from "./IWriter";
import Vec2 from "../base/Vec2";
import Vec3 from "../base/Vec3";
import WriterBase from "../base/WriterBase";
import getBufferClass from "../base/BufferShim";

export default class WriterBE extends WriterBase implements IWriter {
	public writeShort(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(2);
			buffer.writeInt16BE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeInt16BE(value, this.offset);
			this.offset += 2;
		}

		return this;
	}

	public writeUShort(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(2);
			buffer.writeUInt16BE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeUInt16BE(value, this.offset);
			this.offset += 2;
		}

		return this;
	}

	public writeInt(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(4);
			buffer.writeInt32BE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeInt32BE(value, this.offset);
			this.offset += 4;
		}

		return this;
	}

	public writeUInt(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(4);
			buffer.writeUInt32BE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeUInt32BE(value, this.offset);
			this.offset += 4;
		}

		return this;
	}

	public writeLong(value:number|bigint) {
		if (typeof(value) !== "bigint") {
			value = BigInt(value);
		}

		if (this.resizable) {
			const buffer = getBufferClass().alloc(8);
			buffer.writeBigInt64BE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeBigInt64BE(value, this.offset);
			this.offset += 8;
		}

		return this;
	}

	public writeULong(value:number|bigint) {
		if (typeof(value) !== "bigint") {
			value = BigInt(value);
		}

		if (this.resizable) {
			const buffer = getBufferClass().alloc(8);
			buffer.writeBigUint64BE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeBigUint64BE(value, this.offset);
			this.offset += 8;
		}

		return this;
	}

	public writeFloat(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(4);
			buffer.writeFloatBE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeFloatBE(value, this.offset);
			this.offset += 4;
		}

		return this;
	}

	public writeDouble(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(8);
			buffer.writeDoubleBE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeDoubleBE(value, this.offset);
			this.offset += 8;
		}

		return this;
	}

	public writeShortString(text:string) {
		this.writeUByte(text.length);

		for (let i = 0; i < text.length; i++) {
			this.writeUByte(text.charCodeAt(i));
		}

		return this;
	}

	public writeString(text:string) {
		this.writeUShort(text.length);

		for (let i = 0; i < text.length; i++) {
			this.writeUByte(text.charCodeAt(i));
		}

		return this;
	}

	public writeString16(text:string) {
		this.writeUShort(text.length);

		for (let i = 0; i < text.length; i++) {
			this.writeUShort(text.charCodeAt(i));
		}

		return this;
	}

	public writeStringAsShorts(text:string) {
		let buffer:Buffer;
		if (this.resizable) {
			buffer = getBufferClass().alloc(text.length * 2);
		} else {
			buffer = this.buffer;
		}

		for (let i = 0; i < text.length; i++) {
			buffer.writeUint16BE(text.charCodeAt(i), i);
		}

		return this;
	}

	public writeVec2(vec2: Vec2) {
		this.writeFloat(vec2.x);
		this.writeFloat(vec2.y);

		return this;
	}

	public writeVec3(vec3: Vec3) {
		this.writeFloat(vec3.x);
		this.writeFloat(vec3.y);
		this.writeFloat(vec3.z);

		return this;
	}

	public writeCString(value: string) {
		let buffer: Buffer;
		if (this.resizable) {
			buffer = getBufferClass().alloc(value.length);
		} else {
			buffer = this.buffer;
		}

		for (let i = 0; i < value.length; i++) {
			buffer.writeUInt8(value.charCodeAt(i), i);
		}

		if (this.resizable) {
			this.writeBuffer(buffer);
		}

		this.writeUByte(0) // null

		return this;
	}
}