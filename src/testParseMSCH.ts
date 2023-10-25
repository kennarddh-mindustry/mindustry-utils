import * as url from 'url'

import path from 'path'
import ParseMSCH from './ParseMSCH.js'
import fs from 'fs/promises'
import CustomBuffer from './CustomBuffer.js'
import ParseLogicConfig from './ParseLogicConfig.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// const deflatedData = await fs.readFile(
// 	path.join(__dirname, '../data/metaglass_core.msch')
// )

const base64 =
	'bXNjaAF4nD3MQQ7CMAwEwHWSpqWceAgvQhxC8SFSm6DEVOL3uEbCp1lba8wgj1DSxgjCXXB+cl9afkmuBUBc04PXDne7e0xLLTt/akPstQk3XCRLKvm9Xf8nYIYNEQgYjHCmY+NNThVMXjWYgiriFwijKaom06id0/HrC/5OGSQ='

const deflatedData = Buffer.from(base64, 'base64')

const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

console.log(schematic.tiles)

// console.log(await ParseLogicConfig(schematic.tiles[0].config))
