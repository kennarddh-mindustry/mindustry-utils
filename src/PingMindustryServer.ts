import { Buffer } from 'node:buffer'
import CustomBuffer from './CustomBuffer.js'
import RequestUDP from './Utils/RequestUDP.js'
import ParseHrtimeToSeconds from './Utils/ParseHrtimeToSeconds.js'
import Host from './Data/Host.js'
import { Gamemode } from './Data/Vars.js'

const PingMindustryServer = async (host: string, port: number) => {
	const pingMessage = CustomBuffer.fromBuffer(Buffer.from([-2, 1]))

	const startPing = process.hrtime()

	const response = await RequestUDP(host, port, pingMessage)

	const pingDuration = process.hrtime(startPing)
	const ping = ParseHrtimeToSeconds(pingDuration)

	const name = response.readString()
	const map = response.readString()
	const players = response.readInt()
	const wave = response.readInt()
	const version = response.readInt()
	const verType = response.readString()
	const gamemode = response.read().value as Gamemode
	const limit = response.readInt()
	const description = response.readString()
	const modeName = response.readString()

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
