import CustomBuffer from './CustomBuffer.js'
import GenerateMSCH from './GenerateMSCH.js'
import { createCanvas, ImageData, Image, Canvas } from 'canvas'
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

const GenerateSorterArtImage = async ({
	art,
	width = 50,
	height = 50,
	ditherOpacity = 0.95,
}: Partial<{
	art: Image
	width: number
	height: number
	ditherOpacity: number
}>): Promise<[Canvas, Canvas]> => {
	const canvas = createCanvas(width, height)
	const ctx = canvas.getContext('2d')

	ctx.drawImage(art, 0, 0, width, height)

	// Image Quantization
	const imgData = ctx.getImageData(0, 0, width, height)

	const pointContainer = iq.utils.PointContainer.fromUint8Array(
		imgData.data,
		width,
		height
	)

	const palette = await iq.buildPalette([pointContainer], {
		colors: Object.keys(SorterID).length,
	})

	const outPointContainer = await iq.applyPalette(pointContainer, palette, {
		colorDistanceFormula: 'euclidean',
		imageQuantization: 'floyd-steinberg',
	})

	const imageData = outPointContainer.toUint8Array()

	ctx.putImageData(
		new ImageData(new Uint8ClampedArray(imageData), width, height),
		0,
		0
	)

	// Dither Image
	const ditheredImage: ImageData = Dither.atkinson(
		new ImageData(ctx.getImageData(0, 0, width, height).data, width, height)
	)

	const ditheredData = ditheredImage.data

	const newDitheredDataArray = new Uint8ClampedArray(ditheredData.length)

	// Lower Dithered Image Opacity
	for (let i = 0; i < ditheredData.length; i += 4) {
		const red = ditheredData[i]
		const green = ditheredData[i + 1]
		const blue = ditheredData[i + 2]
		const alpha = ditheredData[i + 3]

		newDitheredDataArray[i] = red
		newDitheredDataArray[i + 1] = green
		newDitheredDataArray[i + 2] = blue
		newDitheredDataArray[i + 3] = alpha - 255 * (1 - ditherOpacity)
	}

	const newDitheredData = new ImageData(newDitheredDataArray, width, height)

	const newDitherCanvas = createCanvas(width, height)
	const newDitherCtx = newDitherCanvas.getContext('2d')

	newDitherCtx.putImageData(newDitheredData, 0, 0)

	// Apply Dithered Image Overlay
	ctx.drawImage(newDitherCanvas, 0, 0)

	// Create Dither Canvas
	const ditherCanvas = createCanvas(width, height)
	const ditherCtx = ditherCanvas.getContext('2d')

	ditherCtx.putImageData(ditheredImage, 0, 0)

	return [canvas, ditherCanvas]
}

export default GenerateSorterArtImage
