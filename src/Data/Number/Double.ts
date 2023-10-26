class Double {
	#signed: boolean
	#value: number

	constructor(signed: boolean, value: number) {
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

export default Double