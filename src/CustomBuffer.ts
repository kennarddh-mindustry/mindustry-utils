class CustomBuffer {
	#offset: number = 0
	#buffer: Buffer = Buffer.alloc(0)

	read(): number {
		const data = this.#buffer.readInt8(this.#offset)

		this.#offset += 1

		return data
	}

	readShort(): number {
		const data = this.#buffer.readInt16BE(this.#offset)

		this.#offset += 2

		return data
	}

	readInt(): number {
		const data = this.#buffer.readInt32BE(this.#offset)

		this.#offset += 4

		return data
	}

	readLong(): bigint {
		const data = this.#buffer.readBigInt64BE(this.#offset)

		this.#offset += 8

		return data
	}

	readFloat(): number {
		const data = this.#buffer.readFloatBE(this.#offset)

		this.#offset += 4

		return data
	}

	readDouble(): number {
		const data = this.#buffer.readDoubleBE(this.#offset)

		this.#offset += 8

		return data
	}

	readUByte(): number {
		const data = this.#buffer.readUint8(this.#offset)

		this.#offset += 1

		return data
	}

	readUShort(): number {
		const data = this.#buffer.readUint16BE(this.#offset)

		this.#offset += 2

		return data
	}

	readBoolean(): boolean {
		const data = this.read()

		return data != 0
	}

	write(value: number): void {
		this.#buffer.writeInt8(value, this.#offset)

		this.#offset += 1
	}

	writeShort(value: number): void {
		this.#buffer.writeInt16BE(value, this.#offset)

		this.#offset += 2
	}

	writeInt(value: number): void {
		this.#buffer.writeInt32BE(value, this.#offset)

		this.#offset += 4
	}

	writeLong(value: bigint): void {
		this.#buffer.writeBigInt64BE(value, this.#offset)

		this.#offset += 8
	}

	writeFloat(value: number): void {
		this.#buffer.writeFloatBE(value, this.#offset)

		this.#offset += 4
	}

	writeDouble(value: number): void {
		this.#buffer.writeDoubleBE(value, this.#offset)

		this.#offset += 8
	}

	static fromBuffer(buffer: Buffer): CustomBuffer {
		const newBuffer = CustomBuffer.alloc(buffer.length)

		newBuffer.copy(buffer)

		return newBuffer
	}

	static alloc(length: number): CustomBuffer {
		const newBuffer = new CustomBuffer()

		newBuffer.#buffer = Buffer.alloc(length)

		return newBuffer
	}

	copy(originalBuffer: Buffer): void {
		originalBuffer.copy(this.#buffer, 0)

		this.resetOffset()
	}

	toString(encoding: BufferEncoding = 'utf-8'): string {
		return this.#buffer.toString(encoding)
	}

	get offset(): number {
		return this.#offset
	}

	get bufferLeft(): Buffer {
		return this.#buffer.subarray(this.#offset)
	}

	get buffer(): Buffer {
		return this.#buffer
	}

	resetOffset(): void {
		this.#offset = 0
	}
}

export default CustomBuffer
