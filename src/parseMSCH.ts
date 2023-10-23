import zlib from 'zlib'
import util from 'util'
import fs from 'fs/promises'
import * as url from 'url'
import path from 'path'
import CustomBuffer from './CustomBuffer.js'
import Stile from './Data/Stile.js'
import { ReadObject } from './TypeIO.js'
import Schematic from './Data/Schematic.js'
import Point2 from './Data/Point2.js'

const inflate = util.promisify(zlib.inflate)

// const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const deflatedData = await fs.readFile(
	path.join(__dirname, '../data/metaglass_core.msch')
)

const deflatedBuffer = CustomBuffer.fromBuffer(deflatedData)

const headerBytes = Buffer.from('msch', 'utf-8')

for (const headerByte of headerBytes) {
	if (deflatedBuffer.read() != headerByte)
		throw new Error('Not a schematic file (missing header).')
}

const version = deflatedBuffer.read()

const inflatedData = await inflate(deflatedBuffer.bufferLeft)

const buffer = CustomBuffer.fromBuffer(inflatedData)

const width = buffer.readShort()
const height = buffer.readShort()

if (width > 128 || height > 128)
	throw new Error(
		'Invalid schematic: Too large (max possible size is 128x128)'
	)

const tags: Record<string, string> = {}

const tagsCount = buffer.readUByte()

for (let i = 0; i < tagsCount; i++) {
	tags[buffer.readUTF()] = buffer.readUTF()
}

const blocks: Record<number, string> = {}

const blocksLength = buffer.read()

for (let i = 0; i < blocksLength; i++) {
	const blockName = buffer.readUTF()
	blocks[i] = blockName
}

const total = buffer.readInt()

if (total > 128 * 128) throw new Error('Invalid schematic: Too many blocks.')

const tiles: Stile[] = []

for (let i = 0; i < total; i++) {
	const blockName = blocks[buffer.read()]
	const position = buffer.readInt()

	const config = ReadObject(buffer)

	const rotation = buffer.read()

	tiles.push(new Stile(blockName, Point2.unpack(position), config, rotation))
}

const schematic = new Schematic(version, tiles, tags, width, height)

console.log(schematic)
