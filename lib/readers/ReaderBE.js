"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderBE = void 0;
const ReaderBase_1 = require("./ReaderBase");
class ReaderBE extends ReaderBase_1.ReaderBase {
    readShort() {
        const value = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return value;
    }
    readUShort() {
        const value = this.buffer.readUInt16BE(this.offset);
        this.offset += 2;
        return value;
    }
    readInt() {
        const value = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return value;
    }
    readUInt() {
        const value = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return value;
    }
    readLong() {
        const value = this.buffer.readBigInt64BE(this.offset);
        this.offset += 8;
        return value;
    }
    readULong() {
        const value = this.buffer.readBigUint64BE(this.offset);
        this.offset += 8;
        return value;
    }
    readFloat() {
        const value = this.buffer.readFloatBE(this.offset);
        this.offset += 4;
        return value;
    }
    readDouble() {
        const value = this.buffer.readDoubleBE(this.offset);
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
exports.ReaderBE = ReaderBE;
