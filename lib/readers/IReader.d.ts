/// <reference types="node" />
export interface IReader {
    readBuffer(bytes: number): Buffer;
    readUint8Array(bytes: number): Uint8Array;
    readByte(): number;
    readUByte(): number;
    readBool(): boolean;
    readShort(): number;
    readUShort(): number;
    readInt(): number;
    readUInt(): number;
    readLong(): bigint;
    readULong(): bigint;
    readFloat(): number;
    readDouble(): number;
    readShortString(): string;
    readString(): string;
    readString16(): string;
}
