"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderBase = void 0;
class ReaderBase {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }
    readBuffer(bytes) {
        const value = this.buffer.subarray(this.offset, this.offset + bytes);
        this.offset += bytes;
        return value;
    }
    // NOTE: This has to be a copy as the subarray is only cropped & offset
    //		 Realistically this is what we want anyway.
    readUint8Array(bytes) {
        const croppedBuffer = this.readBuffer(bytes);
        const newArray = new Uint8Array(croppedBuffer.length);
        for (let i = 0; i < croppedBuffer.length; i++) {
            newArray[i] = croppedBuffer[i];
        }
        return newArray;
    }
    readByte() {
        const value = this.buffer.readInt8(this.offset);
        this.offset++;
        return value;
    }
    readUByte() {
        const value = this.buffer.readUInt8(this.offset);
        this.offset++;
        return value;
    }
    readBool() {
        return Boolean(this.readUByte());
    }
}
exports.ReaderBase = ReaderBase;
