import LogicLink from './LogicLink.js'

class LogicConfig {
	version: number
	code: string
	links: LogicLink[]

	constructor(version: number, code: string, links: LogicLink[]) {
		this.version = version
		this.code = code
		this.links = links
	}
}

export default LogicConfig
