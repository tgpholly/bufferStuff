import { IReader } from "./IReader";
import { ReaderBase } from "./ReaderBase";
export declare class ReaderBE extends ReaderBase implements IReader {
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
