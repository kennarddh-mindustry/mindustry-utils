const ParseHrtimeToSeconds = (hrtime: [number, number]) => {
	return hrtime[0] + hrtime[1] / 1e9
}

export default ParseHrtimeToSeconds
