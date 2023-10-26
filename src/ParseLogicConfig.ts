import CustomBuffer from './CustomBuffer.js'
import { ReadFully } from './TypeIO.js'
import LogicLink from './Data/Logic/LogicLink.js'
import LogicConfig from './Data/Logic/LogicConfig.js'
import { Inflate } from './Utils/Compression.js'

const maxCodeLength = 1024 * 100

const ParseLogicConfig = async (configBuffer: CustomBuffer) => {
	const inflatedBuffer = await Inflate(configBuffer)

	const version = inflatedBuffer.read()

	const codeBuffer = ReadFully(inflatedBuffer)

	const codeLength = codeBuffer.length

	if (codeLength.value > maxCodeLength)
		throw new Error(`Malformed logic data! Length: ${codeLength}`)

	const codeText = codeBuffer.toString('utf-8')

	const linksLength = inflatedBuffer.readInt()

	const links: LogicLink[] = []

	for (let i = 0; i < linksLength.value; i++) {
		const linkName = inflatedBuffer.readUTF()
		const x = inflatedBuffer.readShort()
		const y = inflatedBuffer.readShort()

		links.push(new LogicLink(x, y, linkName))
	}

	return new LogicConfig(version, codeText, links)
}

export default ParseLogicConfig
