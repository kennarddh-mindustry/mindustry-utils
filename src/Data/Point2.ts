class Point2 {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	static unpack(packed: number): Point2 {
		return new Point2(packed >>> 16, packed & 0xffff)
	}

	static pack(x: number, y: number): number {
		return (x << 16) | (y & 0xffff)
	}

	pack() {
		return Point2.pack(this.x, this.y)
	}
}

export default Point2
