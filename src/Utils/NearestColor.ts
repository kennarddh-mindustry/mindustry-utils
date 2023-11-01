export type RGBColor = { r: number; g: number; b: number }

const HexToRgb = (hex: string): RGBColor => {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

	const normalizedHex = hex.replace(
		shorthandRegex,
		(m, r, g, b) => r + r + g + g + b + b
	)

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		normalizedHex
	)

	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null
}

/**
 * 0 means opposite colors, 1 means same colors
 */
const RGBDelta = (color1: RGBColor, color2: RGBColor): number => {
	let r = 255 - Math.abs(color1.r - color2.r)
	let g = 255 - Math.abs(color1.g - color2.g)
	let b = 255 - Math.abs(color1.b - color2.b)

	r /= 255
	g /= 255
	b /= 255

	return (r + g + b) / 3
}

const NearestColor = (colors: string[], color: RGBColor): string => {
	let highest = Number.NEGATIVE_INFINITY
	let index = 0

	colors.forEach((el, i) => {
		const delta = RGBDelta(color, HexToRgb(el))

		if (delta > highest) {
			highest = delta

			index = i
		}
	})

	return colors[index]
}

export default NearestColor
