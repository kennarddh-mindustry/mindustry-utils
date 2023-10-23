import Stile from './Stile'

class Schematic {
	version: number
	tiles: Stile[]
	tags: Record<string, string>
	width: number
	height: number

	public Schematic(
		version: number,
		tiles: Stile[],
		tags: Record<string, string>,
		width: number,
		height: number
	) {
		this.version = version
		this.tiles = tiles
		this.tags = tags
		this.width = width
		this.height = height
	}
}

export default Schematic