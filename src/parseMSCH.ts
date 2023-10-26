import CustomBuffer from './CustomBuffer.js'
import Stile from './Data/Stile.js'
import { ReadObject } from './TypeIO.js'
import Schematic from './Data/Schematic.js'
import Point2 from './Data/Point2.js'
import { Inflate } from './Utils/Compression.js'

const ParseMSCH = async (deflatedBuffer: CustomBuffer): Promise<Schematic> => {
	const headerBytes = Buffer.from('msch', 'utf-8')

	for (const headerByte of headerBytes) {
		if (deflatedBuffer.read().value != headerByte)
			throw new Error('Not a schematic file (missing header).')
	}

	const version = deflatedBuffer.read()

	const buffer = await Inflate(deflatedBuffer, false)

	const width = buffer.readShort()
	const height = buffer.readShort()

	if (width.value > 128 || height.value > 128)
		throw new Error(
			'Invalid schematic: Too large (max possible size is 128x128)'
		)

	const tags: Record<string, string> = {}

	const tagsCount = buffer.readUByte().value

	for (let i = 0; i < tagsCount; i++) {
		tags[buffer.readUTF()] = buffer.readUTF()
	}

	const blocks: Record<number, string> = {}

	const blocksLength = buffer.read().value

	for (let i = 0; i < blocksLength; i++) {
		const blockName = buffer.readUTF()
		blocks[i] = blockName
	}

	const total = buffer.readInt().value

	if (total > 128 * 128)
		throw new Error('Invalid schematic: Too many blocks.')

	const tiles: Stile[] = []

	for (let i = 0; i < total; i++) {
		const blockName = blocks[buffer.read().value]
		const position = buffer.readInt()

		const config = ReadObject(buffer)

		const rotation = buffer.read()

		tiles.push(
			new Stile(blockName, Point2.unpack(position), config, rotation)
		)
	}

	const schematic = new Schematic(version, tiles, tags, width, height)

	return schematic
}

export default ParseMSCH
