# bufferStuff &nbsp; [![CodeFactor](https://www.codefactor.io/repository/github/tgpholly/bufferstuff/badge)](https://www.codefactor.io/repository/github/tgpholly/bufferstuff) &nbsp; [![Node.js CI](https://github.com/tgpholly/bufferStuff/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/tgpholly/bufferStuff/actions/workflows/node.js.yml) &nbsp; [![npm](https://img.shields.io/npm/v/bufferstuff)](https://www.npmjs.com/package/bufferstuff)
A set of utility classes for reading and writing binary data in NodeJS.

## Motivations
I tend to write code a lot that needs to read and write from buffers ***and*** this is sometimes in big-endian too, so I decided eventually to make a utility to help me with that which is what you see here.
Originally I had two variants of bufferStuff that were for LE and BE respectively but this got difficult to manage so I rewrote it in TypeScript and added support for both reader / writer types.

## Usage
You can create an instance of the Reader and Writer classes like this:
```ts
// You *must* be expicit with the endianness
const leReader:IReader = createReader(Endian.LE, buffer);
const beReader:IReader = createReader(Endian.BE, buffer);

// Size is optional, will dynamically allocate if left empty or 0
const leWriter:IWriter = createWriter(Endian.LE, <optional: size>);
const beWriter:IWriter = createWriter(Endian.BE, <optional: size>);
```

I tried to keep it as simple as possible to use, for example if you want to write a (signed) byte you do as follows:
```ts
writer.writeByte(<number>);
```

You can find a list of all of the methods for [Writers](https://git.eusv.net/tgpholly/bufferStuff/src/branch/master/writers/IWriter.ts) and [Readers](https://git.eusv.net/tgpholly/bufferStuff/src/branch/master/readers/IReader.ts) in their interface files.

## Projects using bufferStuff
If your project uses bufferStuff feel free to make a PR to add it to this list!
### [tgpholly/mc-beta-server](https://git.eusv.net/tgpholly/mc-beta-server)
### [tgpholly/ultrakillMP_server](https://github.com/tgpholly/ultrakillMP_server)

## Projects similar to bufferStuff
### [tgpholly/csharp-extensions/BinaryTools](https://github.com/tgpholly/csharp-extensions/tree/master/BinaryTools) - Basically bufferStuff but for C#
