import { IWriter } from "./IWriter";
import { WriterBase } from "../base/WriterBase";

export class WriterLE extends WriterBase implements IWriter {
	public writeShort(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(2);
			buffer.writeInt16LE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeInt16LE(value, this.offset);
			this.offset += 2;
		}

		return this;
	}

	public writeUShort(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(2);
			buffer.writeUInt16LE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeUInt16LE(value, this.offset);
			this.offset += 2;
		}

		return this;
	}

	public writeInt(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(4);
			buffer.writeInt32LE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeInt32LE(value, this.offset);
			this.offset += 4;
		}

		return this;
	}
	public writeUInt(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(4);
			buffer.writeUInt32LE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeUInt32LE(value, this.offset);
			this.offset += 4;
		}

		return this;
	}

	public writeLong(value:number|bigint) {
		if (typeof(value) !== "bigint") {
			value = BigInt(value);
		}

		if (this.resizable) {
			const buffer = Buffer.alloc(8);
			buffer.writeBigInt64LE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeBigInt64LE(value, this.offset);
			this.offset += 8;
		}

		return this;
	}

	public writeULong(value:number|bigint) {
		if (typeof(value) !== "bigint") {
			value = BigInt(value);
		}

		if (this.resizable) {
			const buffer = Buffer.alloc(8);
			buffer.writeBigUint64LE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeBigUint64LE(value, this.offset);
			this.offset += 8;
		}

		return this;
	}

	public writeFloat(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(4);
			buffer.writeFloatLE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeFloatLE(value, this.offset);
			this.offset += 4;
		}

		return this;
	}

	public writeDouble(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(8);
			buffer.writeDoubleLE(value);
			this.writeBuffer(buffer);
		} else {
			this.buffer.writeDoubleLE(value, this.offset);
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
}