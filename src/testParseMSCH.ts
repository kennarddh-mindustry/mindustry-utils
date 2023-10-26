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
	'bXNjaAF4nD3MQQ7CMAwEwHWSpqWceAgvQhxC8SFSm6DEVOL3uEbCp1lba8wgj1DSxgjCXXB+cl9afkmuBUBc04PXDne7e0xLLTt/akPstQk3XCRLKvm9Xf8nYIYNEQgYjHCmY+NNThVMXjWYgiriFwijKaom06id0/HrC/5OGSQ='

const deflatedData = Buffer.from(base64, 'base64')

const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

// console.log(schematic.tiles)

const reconstructedBuffer = await GenerateMSCH(schematic)

const newBase64 = reconstructedBuffer.toString('base64')

console.log(base64)
console.log(newBase64)
console.log(base64 === newBase64)

console.log(CustomBuffer.fromBuffer(deflatedData).buffer)
console.log(reconstructedBuffer.buffer)

// console.log(await ParseLogicConfig(schematic.tiles[0].config))
