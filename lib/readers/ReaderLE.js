"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderLE = void 0;
const ReaderBase_1 = require("./ReaderBase");
class ReaderLE extends ReaderBase_1.ReaderBase {
    readShort() {
        const value = this.buffer.readInt16LE(this.offset);
        this.offset += 2;
        return value;
    }
    readUShort() {
        const value = this.buffer.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
    }
    readInt() {
        const value = this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return value;
    }
    readUInt() {
        const value = this.buffer.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
    }
    readLong() {
        const value = this.buffer.readBigInt64LE(this.offset);
        this.offset += 8;
        return value;
    }
    readULong() {
        const value = this.buffer.readBigUint64LE(this.offset);
        this.offset += 8;
        return value;
    }
    readFloat() {
        const value = this.buffer.readFloatLE(this.offset);
        this.offset += 4;
        return value;
    }
    readDouble() {
        const value = this.buffer.readDoubleLE(this.offset);
        this.offset += 8;
        return value;
    }
    readShortString() {
        const length = this.readUByte();
        let text = "";
        for (let i = 0; i < length; i++) {
            text += String.fromCharCode(this.readUByte());
        }
        return text;
    }
    readString() {
        const length = this.readUShort();
        let text = "";
        for (let i = 0; i < length; i++) {
            text += String.fromCharCode(this.readUByte());
        }
        return text;
    }
    readString16() {
        const length = this.readUShort();
        let text = "";
        for (let i = 0; i < length; i++) {
            text += String.fromCharCode(this.readUShort());
        }
        return text;
    }
}
exports.ReaderLE = ReaderLE;
