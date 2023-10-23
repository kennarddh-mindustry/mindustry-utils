import Point2 from './Point2'

class Stile {
	blockName: string
	position: Point2
	config: any
	rotation: number

	constructor(
		blockName: string,
		position: Point2,
		config: any,
		rotation: number
	) {
		this.blockName = blockName
		this.position = position
		this.config = config
		this.rotation = rotation
	}
}

export default Stile
