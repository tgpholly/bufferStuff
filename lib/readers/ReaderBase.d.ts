/// <reference types="node" />
export declare class ReaderBase {
    buffer: Buffer;
    offset: number;
    constructor(buffer: Buffer);
    readBuffer(bytes: number): Buffer;
    readUint8Array(bytes: number): Uint8Array;
    readByte(): number;
    readUByte(): number;
    readBool(): boolean;
}
