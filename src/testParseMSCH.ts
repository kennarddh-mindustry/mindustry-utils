import * as url from 'url'

import path from 'path'
import ParseMSCH from './ParseMSCH.js'
import fs from 'fs/promises'
import CustomBuffer from './CustomBuffer.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const deflatedData = await fs.readFile(
	path.join(__dirname, '../data/metaglass_core.msch')
)

const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

console.log(schematic)
