import { MUtf8Encoder } from 'mutf-8'
import CustomBuffer from './CustomBuffer.js'
import Content from './Data/Content.js'
import Vec2 from './Data/Vec2.js'
import Point2 from './Data/Point2.js'

export const ReadString = (buffer: CustomBuffer): string => {
	const length = buffer.read() & 0xff

	const stringBuffer = CustomBuffer.alloc(length)

	for (let i = 0; i < length; i++) {
		const data = buffer.read()

		stringBuffer.write(data)
	}

	return stringBuffer.toString('utf-8')
}

export const WriteString = (buffer: CustomBuffer, string: string) => {
	buffer.write(1)

	const encoder = new MUtf8Encoder()
	const encoded = encoder.encode(string)

	buffer.writeShort(encoded.length)

	for (const byte of encoded) {
		buffer.writeInt(byte)
	}
}

export const ReadInts = (buffer: CustomBuffer): number[] => {
	const length = buffer.readShort()

	const output: number[] = []

	for (let i = 0; i < length; i++) {
		output.push(buffer.readInt())
	}

	return output
}

export const ReadPoint2s = (buffer: CustomBuffer): Point2[] => {
	const length = buffer.read()

	const output: Point2[] = []

	for (let i = 0; i < length; i++) {
		output.push(Point2.unpack(buffer.readInt()))
	}

	return output
}

export const ReadFully = (buffer: CustomBuffer): CustomBuffer => {
	const length = buffer.readInt()

	const output = CustomBuffer.alloc(length)

	for (let i = 0; i < length; i++) {
		output.write(buffer.read())
	}

	return output
}

export const ReadBooleans = (buffer: CustomBuffer): boolean[] => {
	const length = buffer.readInt()

	const output: boolean[] = []

	for (let i = 0; i < length; i++) {
		output.push(buffer.readBoolean())
	}

	return output
}

export const ReadVec2s = (buffer: CustomBuffer): Vec2[] => {
	const length = buffer.readShort()

	const output: Vec2[] = []

	for (let i = 0; i < length; i++) {
		output.push(new Vec2(buffer.readFloat(), buffer.readFloat()))
	}

	return output
}

export const ReadObject = (buffer: CustomBuffer) => {
	const type = buffer.read()

	switch (type) {
		case 0:
			return null
		case 1:
			return buffer.readInt()
		case 2:
			return buffer.readLong()
		case 3:
			return buffer.readFloat()
		case 4:
			return ReadString(buffer)
		case 5:
			return new Content(buffer.read(), buffer.readShort())
		case 6:
			return ReadInts(buffer)
		case 7:
			return new Point2(buffer.readInt(), buffer.readInt())
		case 8:
			return ReadPoint2s(buffer)
		case 9:
			return new Content(buffer.read(), buffer.readShort())
		case 10:
			return buffer.readBoolean()
		case 11:
			return buffer.readDouble()
		case 12:
			return buffer.readInt()
		case 13:
			return buffer.readShort()
		case 14:
			return ReadFully(buffer)
		case 15:
			buffer.read()

			return null
		case 16:
			return ReadBooleans(buffer)
		case 17:
			return buffer.readInt()
		case 18:
			return ReadVec2s(buffer)
		case 19:
			return new Vec2(buffer.readFloat(), buffer.readFloat())
		case 20:
			return buffer.readUByte()
		case 21:
			return ReadInts(buffer)
		case 22:
			throw new Error('Object with type 22 is not implemented')
		case 23:
			return buffer.readUShort()
		default:
			throw new Error(`Object with type ${type} is unknown`)
	}
}
