import * as url from 'url'

import path from 'path'
import ParseMSCH from './ParseMSCH.js'
import fs from 'fs/promises'
import CustomBuffer from './CustomBuffer.js'
import ParseLogicConfig from './ParseLogicConfig.js'
import GenerateMSCH from './GenerateMSCH.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// const deflatedData = await fs.readFile(
// 	path.join(__dirname, '../data/metaglass_core.msch')
// )

const base64 =
	'bXNjaAF4nGNgZGBiZmDJS8xNZWAJSS0uYeBOSS1OLsosKMnMz2NgYGDLSUxKzSlmYIqOZWLgz81MLsrXLSjKT04tLs4vYmDPBdKJ6alAhUwMIMDHwMCsUzGnN9Q7/7YBj19+dB3rxdcGCp+MX2Y6XOS1ztHedXeXzJQI372W07JPd9feipfP9N62xuLoBIvGE+8fe6vUbo3Y8ze6c88k1TeVjDt9WJr5W206P60O2L7nwe+Qrd68K6eUKN6fquOaxJD57pX9czf17Kda+69maXJXnFpi5nc+7+dqOzEBZ7VVr44bn7dOM2a6yFlXrrLilewTp4uSji88dyZYXbp8sHKSg3PCl8vViYoyXgenarD7Z+bprF6n1qJ62DPqbeLSTMMPb47cPmXAsWBZgFvapC/8E9iaZZKVHOXPr7vUvsinmPV6/+1qLd4Zh+4fSNbe5DNv23WpJkHJD+fvHPjtbcEebJP+4HeQ2te4pUbuTGr6n95aOx/wOfdhu9F6g3RfB/vb39n8TLd/2B5xqHlH4+t9HvvM4xRjJ62bK+/jlZetFHyVzXWZypOLET3PGZz51ifMOXShtORFQ2PFysq0dWdOPUuem6r7Zn5lpQBnWNqKaWUiFccmSsn2uhhlFP82qboRsPXVLSWhR9z+LG+ifoQsO85+kDsw60hwWPj5giNVn5oTTi95on4jvWn6A1bDDRm8ObIN4m0bDmVUbT2z4eY1xQrtGqf8VbpH5R63aTR85fqZ3jVV+/3Ziby/CzMrXvKtD1r6R7eBMTpRRWBtzOS5CcciOuTrvV48yVDvOjnF+8N1jSTjngmxAQnftjnx51x+qzjLRETmNQ8rr9Oui8cKdv9nZl1jLrpZ+tc71oMHo5pnisez/JzHtjftJPeW3dd1DP2b1Up1PQt2rvNVV4tb9X+p5BGLY75r3+06eCB35dIbnn/XXDhnbJR9bK3qnKCdJaZLt4aunFGhttZwZfqJew/ELE25fP2qL09+99LY5vzlLc5W1w+LR/mZd715Etshre2cumuBpNGNH4/FJKZk5SW51dsazsub93lZjs6HYxWS8bpf2rIUuT7mmj/cpnxdctPmmWcvxdjESGx1NDfPay7Ke+K22jjZXGPuRekpD/IVvjFMl/rnZ9rIv+P5B/M+GV49c5fFmtMv7+bqdJ+/cEEPa3L35ei6XWtqVrl7HPmfOVePxaj/tH5Rc9zkjm2PFN6HW8alTPw4TVe8++jVR70335T8Ytdqv23IwAjMNYwsjAx7o2MD8stTixScEwsSkzNLKq0UoitTc3Lyy2PzSnNyuGDSwSX5RakpCEkDuExAUX5KaTIo3wJl04tSU/NitRGyzvl5xaW5BVBpoBGxuiBJ54zEvPRUVOPcgPZVKiRnJBalp6YoZCKMMyjmAuv0TUxJVUiqVHAvyswNSk0sSC1iAADogOGW'

const deflatedData = Buffer.from(base64, 'base64')

const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

console.log(schematic.tiles)

const reconstructedBuffer = await GenerateMSCH(schematic)

const newBase64 = reconstructedBuffer.toString('base64')

console.log(base64)
console.log(newBase64)
console.log(base64 === newBase64)

console.log(CustomBuffer.fromBuffer(deflatedData).buffer)
console.log(reconstructedBuffer.buffer)

console.log(await ParseLogicConfig(schematic.tiles[0].config))
