/// <reference types="node" />
export declare class WriterBase {
    buffer: Buffer;
    offset: number;
    readonly resizable: boolean;
    constructor(size?: number);
    toBuffer(): Buffer;
    toString(): string;
    writeBuffer(buffer: Buffer): this;
    writeUint8Array(array: Uint8Array): this;
    writeByte(value: number): this;
    writeUByte(value: number): this;
    writeBool(value: boolean | number): this;
}
