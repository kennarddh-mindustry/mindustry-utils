import Short from '../Number/Short'

class LogicLink {
	x: Short
	y: Short
	name: string

	constructor(x: Short, y: Short, name: string) {
		this.x = x
		this.y = y
		this.name = name
	}
}

export default LogicLink
