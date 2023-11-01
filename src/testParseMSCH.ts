import * as url from 'url'

import path from 'path'
import ParseMSCH from './ParseMSCH.js'
import fs from 'fs/promises'
import CustomBuffer from './CustomBuffer.js'
import ParseLogicConfig from './ParseLogicConfig.js'
import GenerateMSCH from './GenerateMSCH.js'
import { createCanvas, loadImage, ImageData, Image } from 'canvas'
import Stile from './Data/Stile.js'
import Point2 from './Data/Point2.js'
import Byte from './Data/Number/Byte.js'
import Int from './Data/Number/Int.js'
import Content from './Data/Content.js'
import Short from './Data/Number/Short.js'
import { SorterID, SorterIDToColor } from './Data/Vars.js'
import Schematic from './Data/Schematic.js'
import NearestColor, { RGBColor } from './Utils/NearestColor.js'
import * as iq from 'image-q'
import Dither from 'canvas-dither'
import GenerateSorterArt from './GenerateSorterArt.js'
import GenerateSorterArtImage from './GenerateSorterArtImage.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// const deflatedData = await fs.readFile(
// 	path.join(__dirname, '../data/metaglass_core.msch')
// )

// const base64 =
// 	'bXNjaAF4nEXJSwqAMAwE0NHWVnDj/cSFnywK/mhyf7QOaAKZMA8tvIM/pl0QTVTNDN0quuR0WToPAGGbZtkU9TBWCHpmk/zUPf6py6mefcN9VYn3cTRH8zRPa2gNLdACLdJisRubug+/'

// const deflatedData = Buffer.from(base64, 'base64')

// const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

// console.log(schematic.tiles)

const art = await loadImage(path.join(__dirname, '../data/TransparentImage.png'))

const [canvas, ditherCanvas] = await GenerateSorterArtImage({
	art,
	width: 100,
	height: 100,
	ditherOpacity: 0.05,
})

const schematicBuffer = await GenerateSorterArt({
	canvas,
	schematicTags: {
		name: 'Pixel Art Dithered',
		labels: '["Pixel Art","Normal"]',
	},
})

const schematicBase64 = schematicBuffer.toString('base64')

const schematicDitherBuffer = await GenerateSorterArt({
	canvas: ditherCanvas,
	schematicTags: {
		name: 'Pixel Art Dithered',
		labels: '["Pixel Art","Dither"]',
	},
})

const schematicDitherBase64 = schematicDitherBuffer.toString('base64')

await fs.writeFile(
	path.join(__dirname, '../data/output.png'),
	canvas.toBuffer('image/png')
)
await fs.writeFile(
	path.join(__dirname, '../data/output-dithered.png'),
	ditherCanvas.toBuffer('image/png')
)

await fs.writeFile(path.join(__dirname, '../data/output.txt'), schematicBase64)
await fs.writeFile(
	path.join(__dirname, '../data/output-dither.txt'),
	schematicDitherBase64
)
