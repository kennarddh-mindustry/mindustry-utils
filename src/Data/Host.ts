import Int from './Number/Int.js'
import { Gamemode } from './Vars.js'

class Host {
	ping: number
	name: string
	address: string
	players: Int
	mapname: string
	wave: Int
	version: Int
	versionType: string
	playerLimit: Int
	gamemode: Gamemode
	description: string
	modeName: string

	constructor(
		ping: number,
		name: string,
		address: string,
		players: Int,
		mapname: string,
		wave: Int,
		version: Int,
		versionType: string,
		playerLimit: Int,
		gamemode: Gamemode,
		description: string,
		modeName: string
	) {
		this.ping = ping
		this.name = name
		this.address = address
		this.players = players
		this.mapname = mapname
		this.wave = wave
		this.version = version
		this.versionType = versionType
		this.playerLimit = playerLimit
		this.gamemode = gamemode
		this.description = description
		this.modeName = modeName
	}
}

export default Host
