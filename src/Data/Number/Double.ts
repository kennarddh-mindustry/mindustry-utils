class Double {
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
}

export default Double
