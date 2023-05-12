"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterBE = void 0;
const WriterBase_1 = require("./WriterBase");
class WriterBE extends WriterBase_1.WriterBase {
    writeShort(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(2);
            buffer.writeInt16BE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeInt16BE(value, this.offset);
            this.offset += 2;
        }
        return this;
    }
    writeUShort(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(2);
            buffer.writeUInt16BE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeUInt16BE(value, this.offset);
            this.offset += 2;
        }
        return this;
    }
    writeInt(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(4);
            buffer.writeInt32BE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeInt32BE(value, this.offset);
            this.offset += 4;
        }
        return this;
    }
    writeUInt(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32BE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeUInt32BE(value, this.offset);
            this.offset += 4;
        }
        return this;
    }
    writeLong(value) {
        if (typeof (value) !== "bigint") {
            value = BigInt(value);
        }
        if (this.resizable) {
            const buffer = Buffer.alloc(8);
            buffer.writeBigInt64BE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeBigInt64BE(value, this.offset);
            this.offset += 8;
        }
        return this;
    }
    writeULong(value) {
        if (typeof (value) !== "bigint") {
            value = BigInt(value);
        }
        if (this.resizable) {
            const buffer = Buffer.alloc(8);
            buffer.writeBigUint64BE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeBigUint64BE(value, this.offset);
            this.offset += 8;
        }
        return this;
    }
    writeFloat(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(4);
            buffer.writeFloatBE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeFloatBE(value, this.offset);
            this.offset += 4;
        }
        return this;
    }
    writeDouble(value) {
        if (this.resizable) {
            const buffer = Buffer.alloc(8);
            buffer.writeDoubleBE(value);
            this.writeBuffer(buffer);
        }
        else {
            this.buffer.writeDoubleBE(value, this.offset);
            this.offset += 8;
        }
        return this;
    }
    writeShortString(text) {
        this.writeUByte(text.length);
        for (let i = 0; i < text.length; i++) {
            this.writeUByte(text.charCodeAt(i));
        }
        return this;
    }
    writeString(text) {
        this.writeUShort(text.length);
        for (let i = 0; i < text.length; i++) {
            this.writeUByte(text.charCodeAt(i));
        }
        return this;
    }
    writeString16(text) {
        this.writeUShort(text.length);
        for (let i = 0; i < text.length; i++) {
            this.writeUShort(text.charCodeAt(i));
        }
        return this;
    }
}
exports.WriterBE = WriterBE;
