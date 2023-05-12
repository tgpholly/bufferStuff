import { IWriter } from "./IWriter";
import { WriterBase } from "./WriterBase";
export declare class WriterLE extends WriterBase implements IWriter {
    writeShort(value: number): this;
    writeUShort(value: number): this;
    writeInt(value: number): this;
    writeUInt(value: number): this;
    writeLong(value: number | bigint): this;
    writeULong(value: number | bigint): this;
    writeFloat(value: number): this;
    writeDouble(value: number): this;
    writeShortString(text: string): this;
    writeString(text: string): this;
    writeString16(text: string): this;
}
