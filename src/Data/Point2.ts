import Int from "./Number/Int"

class Point2 {
	x: Int
	y: Int

	constructor(x: Int, y: Int) {
		this.x = x
		this.y = y
	}

	static unpack(packed: Int): Point2 {
		return new Point2(new Int(packed.value >>> 16), new Int(packed.value & 0xffff))
	}

	static pack(x: Int, y: Int): Int {
		return new Int((x.value << 16) | (y.value & 0xffff))
	}

	pack() {
		return Point2.pack(this.x, this.y)
	}
}

export default Point2
