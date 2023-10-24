// Copyright (c) Holly Stubbs (tgpholly) - Licensed under MIT
// Check LICENSE in repository root for more information.

// This is a mostly 1:1 feature complete implementation of node's Buffer class for browsers.
// It's missing some of the static stuff but everything in the object *should* be there.

class BrowserBuffer {
	public buffer:Uint8Array;
	private dataView:DataView;

	public constructor(dataOrSize: Array<number> | ArrayBufferLike | number) {
		if (typeof(dataOrSize) === "number") {
			this.buffer = new Uint8Array(dataOrSize);
		} else if (typeof(dataOrSize) === "object") {
			this.buffer = new Uint8Array(dataOrSize); // Convert whatever comes in to a Uint8Array.
		} else {
			this.buffer = new Uint8Array(0); // Fallback
		}

		this.dataView = new DataView(this.buffer.buffer);
	}

	public static allocUnsafe(size:number) { return this.alloc(size); }
	public static allocUnsafeSlow(size:number) { return this.alloc(size); }
	public static alloc(size:number) {
		return new BrowserBuffer(size);
	}

	public static concat(buffers:Array<BrowserBuffer>, totalLength?:number) {
		let joinedArrays:Uint8Array;
		if (totalLength !== undefined) {
			joinedArrays = new Uint8Array(totalLength);
		} else {
			let arraysLength = 0;
			for (const buffer of buffers) {
				arraysLength += buffer.length;
			}
			joinedArrays = new Uint8Array(arraysLength);
		}

		let offset = 0;
		for (const buffer of buffers) {
			joinedArrays.set(buffer.buffer, offset);
			offset += buffer.length;
		}

		return new BrowserBuffer(joinedArrays);
	}

	public static from(data: Array<number> | ArrayBufferLike | string) {
		if (typeof(data) === "string") {
			throw new Error("BrowserBuffer does not currently support creating buffers from strings.");
		}

		return new BrowserBuffer(data);
	}

	// NOTE: Here to match node buffer, has no use.
	public static readonly poolSize:number = 8192;

	// TODO: Implement
	public static of() {}
	public static isBuffer() {}
	public static isEncoding() {}
	public static byteLength() {}
	public static copyBytesFrom() {}
	public static compare() {}

	public get length() {
		return this.buffer.length;
	}

	private checkRanged(value:number|bigint, valueName:string, lowRange:number|bigint, highRange:number|bigint) {
		if (value < lowRange || value > highRange) {
			throw new Error(`The value of "${valueName}" is out of range. It must be >= ${lowRange} and <= ${highRange}. Received ${value}`);
		}
	}

	private checkValue(value:number|bigint, low:number|bigint, high:number|bigint) {
		this.checkRanged(value, "value", low, high);
	}

	private checkOffset(offset?:number) {
		if (offset) {
			this.checkRanged(offset, "offset", 0, this.buffer.length - 1);
		}
	}

	// Writing methods
	public writeInt8(value:number, offset:number) {
		this.checkValue(value, -128, 127);
		this.checkOffset(offset);

		this.dataView.setInt8(offset, value);

		return this;
	}
	
	public writeUInt8(value:number, offset:number) {
		this.checkValue(value, 0, 255);
		this.checkOffset(offset);

		this.dataView.setUint8(offset, value);

		return this;
	}

	// Little Endian

	public writeInt16LE(value:number, offset:number) {
		this.checkValue(value, -32768, 32767);
		this.checkOffset(offset);

		this.dataView.setInt16(offset, value, true);

		return this;
	}

	public writeUInt16LE(value:number, offset:number) {
		this.checkValue(value, 0, 65535);
		this.checkOffset(offset);

		this.dataView.setUint16(offset, value, true);

		return this;
	}

	public writeInt32LE(value:number, offset:number) {
		this.checkValue(value, -2147483648, 2147483647);
		this.checkOffset(offset);

		this.dataView.setInt32(offset, value, true);

		return this;
	}

	public writeUInt32LE(value:number, offset:number) {
		this.checkValue(value, 0, 4294967295);
		this.checkOffset(offset);

		this.dataView.setUint32(offset, value, true);

		return this;
	}

	public writeBigInt64LE(value:bigint|number, offset:number) {
		if (typeof(value) === "number") {
			value = BigInt(value);
		}

		this.checkValue(value, -(2n ** 63n), 2n ** 63n);
		this.checkOffset(offset);

		this.dataView.setBigInt64(offset, value, true);

		return this;
	}

	public writeBigUint64LE(value:bigint|number, offset:number) {
		if (typeof(value) === "number") {
			value = BigInt(value);
		}

		this.checkValue(value, 0n, 2n ** 64n);
		this.checkOffset(offset);

		this.dataView.setBigUint64(offset, value, true);

		return this;
	}

	public writeFloatLE(value:number, offset:number) {
		this.checkOffset(offset);

		this.dataView.setFloat32(offset, value, true);

		return this;
	}

	public writeDoubleLE(value:number, offset:number) {
		this.checkOffset(offset);

		this.dataView.setFloat64(offset, value, true);

		return this;
	}

	// Big Endian
	public writeInt16BE(value:number, offset:number) {
		this.checkValue(value, -32768, 32767);
		this.checkOffset(offset);

		this.dataView.setInt16(offset, value, false);

		return this;
	}

	public writeUInt16BE(value:number, offset:number) {
		this.checkValue(value, 0, 65535);
		this.checkOffset(offset);

		this.dataView.setUint16(offset, value, false);

		return this;
	}

	public writeInt32BE(value:number, offset:number) {
		this.checkValue(value, -2147483648, 2147483647);
		this.checkOffset(offset);

		this.dataView.setInt32(offset, value, false);

		return this;
	}

	public writeUInt32BE(value:number, offset:number) {
		this.checkValue(value, 0, 4294967295);
		this.checkOffset(offset);

		this.dataView.setUint32(offset, value, false);

		return this;
	}

	public writeBigInt64BE(value:bigint|number, offset:number) {
		if (typeof(value) === "number") {
			value = BigInt(value);
		}

		this.checkValue(value, -(2n ** 63n), 2n ** 63n);
		this.checkOffset(offset);

		this.dataView.setBigInt64(offset, value, false);

		return this;
	}

	public writeBigUint64BE(value:bigint|number, offset:number) {
		if (typeof(value) === "number") {
			value = BigInt(value);
		}

		this.checkValue(value, 0n, 2n ** 64n);
		this.checkOffset(offset);

		this.dataView.setBigUint64(offset, value, false);

		return this;
	}

	public writeFloatBE(value:number, offset:number) {
		this.checkOffset(offset);

		this.dataView.setFloat32(offset, value, false);

		return this;
	}

	public writeDoubleBE(value:number, offset:number) {
		this.checkOffset(offset);

		this.dataView.setFloat64(offset, value, false);

		return this;
	}

	// Reading methods
	public readInt8(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getInt8(offset);
	}

	public readUInt8(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getUint8(offset);
	}

	// Little Endian

	public readInt16LE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getInt16(offset, true);
	}

	public readUInt16LE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getUint16(offset, true);
	}

	public readInt32LE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getInt32(offset, true);
	}

	public readUInt32LE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getUint32(offset, true);
	}

	public readBigInt64LE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getBigInt64(offset, true);
	}

	public readBigUint64LE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getBigUint64(offset, true);
	}

	public readFloatLE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getFloat32(offset, true);
	}

	public readDoubleLE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getFloat64(offset, true);
	}

	// Big Endian
	public readInt16BE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getInt16(offset, false);
	}

	public readUInt16BE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getUint16(offset, false);
	}

	public readInt32BE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getInt32(offset, false);
	}

	public readUInt32BE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getUint32(offset, false);
	}

	public readBigInt64BE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getBigInt64(offset, false);
	}

	public readBigUint64BE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getBigUint64(offset, false);
	}

	public readFloatBE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getFloat32(offset, false);
	}

	public readDoubleBE(offset:number) {
		this.checkOffset(offset);

		return this.dataView.getFloat64(offset, false);
	}
}

export function getBufferClass() : BufferConstructor {
	if (typeof(Buffer) === "undefined") {
		// @ts-ignore
		return BrowserBuffer;
	} else {
		return Buffer;
	}
}