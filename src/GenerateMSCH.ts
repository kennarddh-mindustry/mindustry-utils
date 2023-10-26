import CustomBuffer from './CustomBuffer.js'
import Stile from './Data/Stile.js'
import { ReadObject, WriteObject } from './TypeIO.js'
import Schematic from './Data/Schematic.js'
import Point2 from './Data/Point2.js'
import { Deflate } from './Utils/Compression.js'
import Byte from './Data/Number/Byte.js'
import Int from './Data/Number/Int.js'
import Short from './Data/Number/Short.js'

const GenerateMSCH = async (schematic: Schematic): Promise<CustomBuffer> => {
	const headerBytes = Buffer.from('msch', 'utf-8')

	const headerBuffer = CustomBuffer.alloc(6)

	for (const headerByte of headerBytes) {
		headerBuffer.write(new Byte(headerByte))
	}

	// Version
	headerBuffer.write(new Byte(1))

	const inflatedBuffer = CustomBuffer.alloc(128)

	if (schematic.width.value > 128 || schematic.height.value > 128)
		throw new Error(
			'Invalid schematic: Too large (max possible size is 128x128)'
		)

	inflatedBuffer.writeShort(schematic.width)
	inflatedBuffer.writeShort(schematic.height)

	inflatedBuffer.writeUByte(
		new Byte(Object.keys(schematic.tags).length, false)
	)

	for (const [key, value] of Object.entries(schematic.tags)) {
		inflatedBuffer.writeUTF(key)
		inflatedBuffer.writeUTF(value)
	}

	const blocks: Map<string, Byte> = new Map()

	let counter = 0

	for (const tile of schematic.tiles) {
		if (!blocks.has(tile.blockName)) {
			blocks.set(tile.blockName, new Byte(counter))

			counter += 1
		}
	}

	inflatedBuffer.write(new Byte(counter))

	for (const block of blocks) {
		inflatedBuffer.writeUTF(block[0])
	}

	const total = schematic.width.value * schematic.height.value

	if (total > 128 * 128)
		throw new Error('Invalid schematic: Too many blocks.')

	inflatedBuffer.writeInt(new Int(total))

	for (const tile of schematic.tiles) {
		inflatedBuffer.write(blocks.get(tile.blockName))
		inflatedBuffer.writeInt(tile.position.pack())

		WriteObject(inflatedBuffer, tile.config)

		inflatedBuffer.write(tile.rotation)
	}

	const deflatedBuffer = await Deflate(inflatedBuffer)

	return CustomBuffer.concat(headerBuffer, deflatedBuffer)
}

export default GenerateMSCH
