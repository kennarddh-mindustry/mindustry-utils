class CustomBuffer {
	#offset: number = 0
	#buffer: Buffer = Buffer.alloc(0)

	get(): number {
		const data = this.#buffer.readInt8(this.#offset)

		this.#offset += 1

		return data
	}

	getInt2(): number {
		const data = this.#buffer.readInt16BE(this.#offset)

		this.#offset += 2

		return data
	}

	getInt4(): number {
		const data = this.#buffer.readInt32BE(this.#offset)

		this.#offset += 4

		return data
	}

	getInt8(): bigint {
		const data = this.#buffer.readBigInt64BE(this.#offset)

		this.#offset += 8

		return data
	}

	getFloat(): number {
		const data = this.#buffer.readFloatBE(this.#offset)

		this.#offset += 8

		return data
	}

	getDouble(): number {
		const data = this.#buffer.readDoubleBE(this.#offset)

		this.#offset += 8

		return data
	}

	write(value: number): void {
		this.#buffer.writeInt8(value, this.#offset)

		this.#offset += 1
	}

	writeInt2(value: number): void {
		this.#buffer.writeInt16BE(value, this.#offset)

		this.#offset += 2
	}

	writeInt4(value: number): void {
		this.#buffer.writeInt32BE(value, this.#offset)

		this.#offset += 4
	}

	writeInt8(value: bigint): void {
		this.#buffer.writeBigInt64BE(value, this.#offset)

		this.#offset += 8
	}

	writeFloat(value: number): void {
		this.#buffer.writeFloatBE(value, this.#offset)

		this.#offset += 8
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
