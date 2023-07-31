export class Buffer {
	public data:Uint8Array;

	public constructor(size:number, data?:Array<number>|Uint8Array) {
		if (data !== undefined) {
			let usableData:Uint8Array;
			if (data instanceof Array) {
				usableData = new Uint8Array(data);
			} else {
				usableData = data;
			}
			
			this.data = usableData;
		} else {
			this.data = new Uint8Array(size);
		}
	}

	public get length() {
		return this.data.length;
	}

	// TODO: toString

	// TODO: Check correctness of this.
	public static concat(buffers:Array<Buffer>, totalLength?:number) {
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
			joinedArrays.set(buffer.data, offset);
			offset += buffer.length;
		}

		return new Buffer(0, joinedArrays);
	}

	// Little Endian

	// Writer methods
	public writeInt8(value:number, offset?:number) {
		if (offset === undefined) {
			// TODO: Handle writing without an offset
			throw new Error("Writing without offset is currently unimplemented");
		}
		if (value >= 0) {
			this.data[offset] = value;	
		} else {
			this.data[offset] = 256 + value;
		}
	}

	public writeUInt8(value:number, offset?:number) {
		if (offset === undefined) {
			// TODO: Handle writing without an offset
			throw new Error("Writing without offset is currently unimplemented");
		}
		this.data[offset] = value;
	}
}