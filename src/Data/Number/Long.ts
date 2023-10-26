class Long {
	#signed: boolean
	#value: bigint

	constructor(signed: boolean, value: bigint) {
		this.#signed = signed
		this.#value = value
	}

    get signed(){
        return this.#signed
    }

    get value(){
        return this.#value
    }
}

export default Long