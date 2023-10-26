import Byte from './Number/Byte'
import Short from './Number/Short'
import Stile from './Stile'

class Schematic {
	version: Byte
	tiles: Stile[]
	tags: Record<string, string>
	width: Short
	height: Short

	constructor(
		version: Byte,
		tiles: Stile[],
		tags: Record<string, string>,
		width: Short,
		height: Short
	) {
		this.version = version
		this.tiles = tiles
		this.tags = tags
		this.width = width
		this.height = height
	}
}

export default Schematic
