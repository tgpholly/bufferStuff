// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

import { getBufferClass } from "./BufferShim";

export class WriterBase {
	public buffer:Buffer;
	public offset:number;
	public readonly resizable:boolean;

	public constructor(size:number = 0) {
		this.buffer = getBufferClass().alloc(size);
		this.offset = 0;
		this.resizable = size === 0;
	}

	public get writeOffset() {
		return this.offset;
	}

	public get length() {
		return this.buffer.length;
	}

	public toBuffer() {
		return this.buffer;
	}

	public toString() {
		return this.buffer.toString();
	}

	public writeBuffer(buffer:Buffer) {
		this.buffer = getBufferClass().concat([this.buffer, buffer], this.buffer.length + buffer.length);

		return this;
	}

	public writeUint8Array(array:Uint8Array) {
		this.writeBuffer(getBufferClass().from(array));

		return this;
	}

	public writeByte(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(1);
			buffer.writeInt8(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeInt8(value, this.offset);
			this.offset++;
		}

		return this;
	}

	public writeUByte(value:number) {
		if (this.resizable) {
			const buffer = getBufferClass().alloc(1);
			buffer.writeUInt8(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeUInt8(value, this.offset);
			this.offset++;
		}

		return this;
	}
	
	public writeBool(value:boolean|number) {
		if (typeof(value) === "number") {
			value = Boolean(value);
		}
		this.writeUByte(value ? 1 : 0);

		return this;
	}

	public writeStringAsBytes(text:string) {
		let buffer;
		if (this.resizable) {
			buffer = getBufferClass().alloc(text.length);
		} else {
			buffer = this.buffer;
		}

		for (let i = 0; i < text.length; i++) {
			buffer.writeUInt8(text.charCodeAt(i), i);
		}

		return this;
	}
}