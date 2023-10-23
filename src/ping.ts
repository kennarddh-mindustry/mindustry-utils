import PingMindustryServer from './PingMindustryServer.js'

const mindustryServerHost = 'alexmindustryv7.servegame.com'
const mindustryServerPort = 41962

const host = await PingMindustryServer(mindustryServerHost, mindustryServerPort)

console.log({ host })
