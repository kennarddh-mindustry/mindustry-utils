import Byte from '../Number/Byte.js'
import LogicLink from './LogicLink.js'

class LogicConfig {
	version: Byte
	code: string
	links: LogicLink[]

	constructor(version: Byte, code: string, links: LogicLink[]) {
		this.version = version
		this.code = code
		this.links = links
	}
}

export default LogicConfig
