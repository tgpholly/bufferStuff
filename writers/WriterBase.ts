export class WriterBase {
	public buffer:Buffer;
	public offset:number;
	public readonly resizable:boolean;

	public constructor(size:number = 0) {
		this.buffer = Buffer.alloc(size);
		this.offset = 0;
		this.resizable = size === 0;
	}

	public toBuffer() {
		return this.buffer;
	}

	public toString() {
		return this.buffer.toString();
	}

	public writeBuffer(buffer:Buffer) {
		this.buffer = Buffer.concat([this.buffer, buffer], this.buffer.length + buffer.length);

		return this;
	}

	public writeUint8Array(array:Uint8Array) {
		this.writeBuffer(Buffer.from(array));

		return this;
	}

	public writeByte(value:number) {
		if (this.resizable) {
			const buffer = Buffer.alloc(1);
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
			const buffer = Buffer.alloc(1);
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
}