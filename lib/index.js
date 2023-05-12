"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWriter = exports.createReader = exports.Endian = void 0;
const ReaderBE_1 = require("./readers/ReaderBE");
const ReaderLE_1 = require("./readers/ReaderLE");
const WriterBE_1 = require("./writers/WriterBE");
const WriterLE_1 = require("./writers/WriterLE");
var Endian;
(function (Endian) {
    Endian[Endian["LE"] = 0] = "LE";
    Endian[Endian["BE"] = 1] = "BE";
})(Endian = exports.Endian || (exports.Endian = {}));
function createReader(endianness, buffer) {
    if (endianness === Endian.LE) {
        return new ReaderLE_1.ReaderLE(buffer);
    }
    else {
        return new ReaderBE_1.ReaderBE(buffer);
    }
}
exports.createReader = createReader;
function createWriter(endianness, size) {
    if (endianness === Endian.LE) {
        return new WriterLE_1.WriterLE(size);
    }
    else {
        return new WriterBE_1.WriterBE(size);
    }
}
exports.createWriter = createWriter;
