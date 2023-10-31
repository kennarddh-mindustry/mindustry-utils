type RGBColor = { r: number; g: number; b: number }

const hexToRgb = (hex: string): RGBColor => {
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

const RGBDistance = (a: RGBColor, b: RGBColor): number =>
	Math.sqrt(
		Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2)
	)

const NearestColor = (colors: string[], colorHex: string): string => {
	let lowest = Number.POSITIVE_INFINITY
	let index = 0

	colors.forEach((el, i) => {
		const distance = RGBDistance(hexToRgb(colorHex), hexToRgb(el))
		if (distance < lowest) {
			lowest = distance
			index = i
		}
	})

	return colors[index]
}

export default NearestColor
