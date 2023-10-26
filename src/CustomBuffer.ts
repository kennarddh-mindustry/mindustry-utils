import { MUtf8Decoder, MUtf8Encoder } from 'mutf-8'
import Short from './Data/Number/Short'
import Byte from './Data/Number/Byte'
import Double from './Data/Number/Double'
import Float from './Data/Number/Float'
import Long from './Data/Number/Long'
import Int from './Data/Number/Int'

class CustomBuffer {
	#offset: number = 0
	#length: number = 0
	#buffer: Buffer = Buffer.alloc(0)
	#capacity: number = 0

	read(): Byte {
		this.checkCanRead(1)

		const data = this.#buffer.readInt8(this.#offset)

		this.#offset += 1

		return new Byte(data)
	}

	readShort(): Short {
		this.checkCanRead(2)

		const data = this.#buffer.readInt16BE(this.#offset)

		this.#offset += 2

		return new Short(data)
	}

	readInt(): Int {
		this.checkCanRead(4)

		const data = this.#buffer.readInt32BE(this.#offset)

		this.#offset += 4

		return new Int(data)
	}

	readLong(): Long {
		this.checkCanRead(8)

		const data = this.#buffer.readBigInt64BE(this.#offset)

		this.#offset += 8

		return new Long(data)
	}

	readFloat(): Float {
		this.checkCanRead(4)

		const data = this.#buffer.readFloatBE(this.#offset)

		this.#offset += 4

		return new Float(data)
	}

	readDouble(): Double {
		this.checkCanRead(8)

		const data = this.#buffer.readDoubleBE(this.#offset)

		this.#offset += 8

		return new Double(data)
	}

	readUByte(): Byte {
		this.checkCanRead(1)

		const data = this.#buffer.readUint8(this.#offset)

		this.#offset += 1

		return new Byte(data, false)
	}

	readUShort(): Short {
		this.checkCanRead(2)

		const data = this.#buffer.readUint16BE(this.#offset)

		this.#offset += 2

		return new Short(data, false)
	}

	readBoolean(): boolean {
		const data = this.read()

		return data.value != 0
	}

	readUTF(): string {
		const length = this.readUShort().value

		const textBuffer: CustomBuffer = CustomBuffer.alloc(length)

		this.checkCanRead(length)

		for (let i = 0; i < length; i++) {
			textBuffer.write(this.read())
		}

		const decoder = new MUtf8Decoder()

		const text = decoder.decode(textBuffer.buffer)

		return text
	}

	readString(): string {
		const length = this.read().value & 0xff

		const stringBuffer = CustomBuffer.alloc(length)

		for (let i = 0; i < length; i++) {
			const data = this.read()

			stringBuffer.write(data)
		}

		return stringBuffer.toString('utf-8')
	}

	write(value: Byte): void {
		if (!value.signed)
			throw new Error('Cannot write unsigned byte to signed')

		this.checkExpand(1)

		this.#buffer.writeInt8(value.value, this.#offset)

		this.#offset += 1
		this.#length += 1
	}

	writeShort(value: Short): void {
		if (!value.signed)
			throw new Error('Cannot write unsigned short to signed')

		this.checkExpand(2)

		this.#buffer.writeInt16BE(value.value, this.#offset)

		this.#offset += 2
		this.#length += 2
	}

	writeInt(value: Int): void {
		if (!value.signed)
			throw new Error('Cannot write unsigned int to signed')

		this.checkExpand(4)

		this.#buffer.writeInt32BE(value.value, this.#offset)

		this.#offset += 4
		this.#length += 4
	}

	writeLong(value: Long): void {
		if (!value.signed)
			throw new Error('Cannot write unsigned long to signed')

		this.checkExpand(8)

		this.#buffer.writeBigInt64BE(value.value, this.#offset)

		this.#offset += 8
		this.#length += 8
	}

	writeFloat(value: Float): void {
		if (!value.signed)
			throw new Error('Cannot write unsigned float to signed')

		this.checkExpand(4)

		this.#buffer.writeFloatBE(value.value, this.#offset)

		this.#offset += 4
		this.#length += 4
	}

	writeDouble(value: Double): void {
		if (!value.signed)
			throw new Error('Cannot write unsigned double to signed')

		this.checkExpand(8)

		this.#buffer.writeDoubleBE(value.value, this.#offset)

		this.#offset += 8
		this.#length += 8
	}

	writeUByte(value: Byte): void {
		if (value.signed)
			throw new Error('Cannot write signed byte to unsigned')

		this.checkExpand(1)

		this.#buffer.writeUInt8(value.value, this.#offset)

		this.#offset += 1
		this.#length += 1
	}

	writeUShort(value: Short): void {
		if (value.signed)
			throw new Error('Cannot write signed short to unsigned')

		this.checkExpand(2)

		this.#buffer.writeUInt16BE(value.value, this.#offset)

		this.#offset += 2
		this.#length += 2
	}

	writeBoolean(value: boolean): void {
		this.write(value ? new Byte(1) : new Byte(0))
	}

	writeUTF(str: string): void {
		const encoder = new MUtf8Encoder()

		const text = encoder.encode(str)

		const textBuffer: CustomBuffer = CustomBuffer.fromUint8Array(text)

		const length = textBuffer.length

		this.writeUShort(new Short(length.value, false))

		this.checkExpand(length.value)

		for (let i = 0; i < length.value; i++) {
			this.write(textBuffer.read())
		}
	}

	static fromBuffer(buffer: Buffer): CustomBuffer {
		const newBuffer = CustomBuffer.alloc(buffer.length)

		newBuffer.#length = buffer.length

		newBuffer.copy(buffer)

		return newBuffer
	}

	static fromUint8Array(data: Uint8Array): CustomBuffer {
		return this.fromBuffer(Buffer.from(data))
	}

	static alloc(length: number): CustomBuffer {
		if (length < 0)
			throw Error('Cannot allocate buffer with less than 0 length')

		const newBuffer = new CustomBuffer()

		newBuffer.#buffer = Buffer.alloc(length)

		newBuffer.#capacity = length
		newBuffer.#length = 0

		return newBuffer
	}

	expand(requiredEmptyLength: number) {
		if (this.#capacity == 0) this.#capacity = 1

		while (this.#capacity - this.#offset < requiredEmptyLength)
			this.#capacity *= 2

		const newBuffer = Buffer.alloc(this.#capacity)

		this.#buffer.copy(newBuffer)

		this.#buffer = newBuffer
	}

	checkExpand(requiredEmptyLength: number) {
		if (this.#offset + requiredEmptyLength >= this.#capacity)
			this.expand(requiredEmptyLength)
	}

	checkCanRead(byteLength: number) {
		if (this.#offset + byteLength > this.#length)
			throw new Error(
				"Can't read attempting to access memory outside capacity bounds"
			)
	}

	copy(originalBuffer: Buffer): void {
		originalBuffer.copy(this.#buffer, 0)

		this.resetOffset()
	}

	toString(encoding: BufferEncoding = 'utf-8'): string {
		return this.#buffer.toString(encoding)
	}

	get offset(): Int {
		return new Int(this.#offset)
	}

	get bufferLeft(): Buffer {
		return this.#buffer.subarray(this.#offset, this.#length)
	}

	get buffer(): Buffer {
		return this.#buffer.subarray(0, this.#length)
	}

	get capacity(): Int {
		return new Int(this.#capacity)
	}

	get length(): Int {
		return new Int(this.#length)
	}

	resetOffset(): void {
		this.#offset = 0
	}

	*[Symbol.iterator](): IterableIterator<Byte> {
		for (const byte of this.buffer) {
			yield new Byte(byte, false)
		}
	}

	static concat(...buffers: CustomBuffer[]): CustomBuffer {
		return CustomBuffer.fromBuffer(
			Buffer.concat(buffers.map(customBuffer => customBuffer.buffer))
		)
	}
}

export default CustomBuffer
