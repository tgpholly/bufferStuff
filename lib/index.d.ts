/// <reference types="node" />
import { IReader } from "./readers/IReader";
import { IWriter } from "./writers/IWriter";
export declare enum Endian {
    LE = 0,
    BE = 1
}
export declare function createReader(endianness: Endian, buffer: Buffer): IReader;
export declare function createWriter(endianness: Endian, size?: number): IWriter;
