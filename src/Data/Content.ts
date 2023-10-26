import Byte from './Number/Byte'
import Short from './Number/Short'

class Content {
	type: Byte
	id: Short

	constructor(type: Byte, id: Short) {
		this.type = type
		this.id = id
	}
}

export default Content
