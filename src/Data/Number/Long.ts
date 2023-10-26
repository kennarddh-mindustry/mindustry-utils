class Long {
	#signed: boolean
	#value: bigint

	constructor(value: bigint, signed: boolean = true) {
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

export default Long
