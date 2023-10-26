import { MUtf8Encoder } from 'mutf-8'
import CustomBuffer from './CustomBuffer.js'
import Content from './Data/Content.js'
import Vec2 from './Data/Vec2.js'
import Point2 from './Data/Point2.js'
import Int from './Data/Number/Int.js'
import Byte from './Data/Number/Byte.js'
import Short from './Data/Number/Short.js'
import Long from './Data/Number/Long.js'
import Float from './Data/Number/Float.js'
import TechNode from './Data/TechNode.js'
import Double from './Data/Number/Double.js'
import BuildingBox from './Data/BuildingBox.js'
import Building from './Data/Building.js'
import LAccess from './Data/LAccess.js'

export const ReadInts = (buffer: CustomBuffer): Int[] => {
	const length = buffer.readShort().value

	const output: Int[] = []

	for (let i = 0; i < length; i++) {
		output.push(buffer.readInt())
	}

	return output
}

export const ReadPoint2s = (buffer: CustomBuffer): Point2[] => {
	const length = buffer.read().value

	const output: Point2[] = []

	for (let i = 0; i < length; i++) {
		output.push(Point2.unpack(buffer.readInt()))
	}

	return output
}

export const ReadFully = (buffer: CustomBuffer): CustomBuffer => {
	const length = buffer.readInt().value

	const output = CustomBuffer.alloc(length)

	for (let i = 0; i < length; i++) {
		output.write(buffer.read())
	}

	output.resetOffset()

	return output
}

export const ReadBooleans = (buffer: CustomBuffer): boolean[] => {
	const length = buffer.readInt().value

	const output: boolean[] = []

	for (let i = 0; i < length; i++) {
		output.push(buffer.readBoolean())
	}

	return output
}

export const ReadVec2s = (buffer: CustomBuffer): Vec2[] => {
	const length = buffer.readShort().value

	const output: Vec2[] = []

	for (let i = 0; i < length; i++) {
		output.push(new Vec2(buffer.readFloat(), buffer.readFloat()))
	}

	return output
}

export const ReadObject = (buffer: CustomBuffer) => {
	const type = buffer.read()

	switch (type.value) {
		case 0:
			return null
		case 1:
			return buffer.readInt()
		case 2:
			return buffer.readLong()
		case 3:
			return buffer.readFloat()
		case 4:
			return buffer.readString()
		case 5:
			return new Content(buffer.read(), buffer.readShort())
		case 6:
			return ReadInts(buffer)
		case 7:
			return new Point2(buffer.readInt(), buffer.readInt())
		case 8:
			return ReadPoint2s(buffer)
		case 9:
			return new TechNode(buffer.read(), buffer.readShort())
		case 10:
			return buffer.readBoolean()
		case 11:
			return buffer.readDouble()
		case 12:
			return new BuildingBox(Point2.unpack(buffer.readInt()))
		case 13:
			return new LAccess(buffer.readShort())
		case 14:
			return ReadFully(buffer)
		// Unit commands
		// case 15:
		// 	buffer.read()

		// 	return null
		// case 16:
		// 	return ReadBooleans(buffer)
		// case 17:
		// 	return buffer.readInt()
		// case 18:
		// 	return ReadVec2s(buffer)
		// case 19:
		// 	return new Vec2(buffer.readFloat(), buffer.readFloat())
		// case 20:
		// 	return buffer.readUByte()
		// case 21:
		// 	return ReadInts(buffer)
		// case 22:
		// 	throw new Error('Object with type 22 is not implemented')
		// case 23:
		// 	return buffer.readUShort()
		default:
			throw new Error(`Object with type ${type} is unknown`)
	}
}

export const WriteObject = (buffer: CustomBuffer, object: any) => {
	if (object == null) buffer.write(new Byte(0))
	else if (object instanceof Int) {
		buffer.write(new Byte(1))
		buffer.writeInt(object)
	} else if (object instanceof Long) {
		buffer.write(new Byte(2))
		buffer.writeLong(object)
	} else if (object instanceof Float) {
		buffer.write(new Byte(3))
		buffer.writeFloat(object)
	} else if (typeof object === 'string') {
		buffer.write(new Byte(4))
		buffer.write(new Byte(1))
		buffer.writeUTF(object)
	} else if (object instanceof Content) {
		buffer.write(new Byte(5))
		buffer.write(object.type)
		buffer.writeShort(object.id)
	} else if (Array.isArray(object) && typeof object[0] === 'number') {
		buffer.write(new Byte(6))
		buffer.writeShort(new Short(object.length))

		for (const int of object) {
			buffer.writeInt(new Int(int))
		}
	} else if (object instanceof Point2) {
		buffer.write(new Byte(7))
		buffer.writeInt(object.x)
		buffer.writeInt(object.y)
	} else if (Array.isArray(object) && object[0] instanceof Point2) {
		buffer.write(new Byte(8))
		buffer.writeShort(new Short(object.length))

		for (const point2 of object) {
			buffer.writeInt(point2.pack())
		}
	} else if (object instanceof TechNode) {
		buffer.write(new Byte(9))
		buffer.write(object.type)
		buffer.writeShort(object.id)
	} else if (typeof object === 'boolean') {
		buffer.write(new Byte(10))
		buffer.writeBoolean(object)
	} else if (object instanceof Double) {
		buffer.write(new Byte(11))
		buffer.writeDouble(object)
	} else if (object instanceof BuildingBox) {
		buffer.write(new Byte(12))
		buffer.writeInt(object.position.pack())
	} else if (object instanceof Building) {
		buffer.write(new Byte(12))
		buffer.writeInt(object.position.pack())
	} else if (object instanceof LAccess) {
		buffer.write(new Byte(13))
		buffer.writeShort(object.type)
	} else if (object instanceof CustomBuffer) {
		buffer.write(new Byte(14))
		buffer.writeInt(object.length)

		for (const byte of object) {
			buffer.writeUByte(byte)
		}
	}
}
