import { Buffer } from 'node:buffer'
import CustomBuffer from './CustomBuffer.js'
import RequestUDP from './Utils/RequestUDP.js'
import ParseHrtimeToSeconds from './Utils/ParseHrtimeToSeconds.js'
import Host from './Host.js'
import { Gamemode } from './Vars.js'
import { ReadString } from './TypeIO.js'

const PingMindustryServer = async (host: string, port: number) => {
	const pingMessage = CustomBuffer.fromBuffer(Buffer.from([-2, 1]))

	const startPing = process.hrtime()

	const response = await RequestUDP(host, port, pingMessage)

	const pingDuration = process.hrtime(startPing)
	const ping = ParseHrtimeToSeconds(pingDuration)

	const name = ReadString(response)
	const map = ReadString(response)
	const players = response.getInt4()
	const wave = response.getInt4()
	const version = response.getInt4()
	const verType = ReadString(response)
	const gamemode = response.get() as Gamemode
	const limit = response.getInt4()
	const description = ReadString(response)
	const modeName = ReadString(response)

	return new Host(
		ping,
		name,
		`${host}:${port}`,
		players,
		map,
		wave,
		version,
		verType,
		limit,
		gamemode,
		description,
		modeName
	)
}

export default PingMindustryServer
