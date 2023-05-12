"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterBase = void 0;
class WriterBase {
    constructor(size = 0) {
        this.buffer = Buffer.alloc(size);
        this.offset = 0;
        this.resizable = size === 0;
    }
    toBuffer() {
        return this.buffer;
    }
    toString() {
        return this.buffer.toString();
    }
    writeBuffer(buffer) {
        this.buffer = Buffer.concat([this.buffer, buffer], this.buffer.length + buffer.length);
        return this;
    }
    writeUint8Array(array) {
        this.writeBuffer(Buffer.from(array));
        return this;
    }
    writeByte(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(1);
            buffer.writeInt8(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeInt8(value, this.offset);
            this.offset++;
        }
        return this;
    }
    writeUByte(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(1);
            buffer.writeUInt8(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeUInt8(value, this.offset);
            this.offset++;
        }
        return this;
    }
    writeBool(value) {
        if (typeof (value) === "number") {
            value = Boolean(value);
        }
        this.writeUByte(value ? 1 : 0);
        return this;
    }
}
exports.WriterBase = WriterBase;
