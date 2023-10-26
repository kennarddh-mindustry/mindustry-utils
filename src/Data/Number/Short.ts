class Short {
	#signed: boolean
	#value: number

	constructor(value: number, signed: boolean = true) {
		this.#signed = signed
		this.#value = value
	}

	get signed() {
		return this.#signed
	}

	get value() {
		return this.#value
	}

	get [Symbol.toStringTag]() {
		return `Signed: ${this.signed}, ${this.value}`
	}
}

export default Short
