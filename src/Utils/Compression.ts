import zlib from 'zlib'
import util from 'util'
import CustomBuffer from '../CustomBuffer'

const inflate = util.promisify(zlib.inflate)

export const Inflate = async (
	buffer: CustomBuffer,
	all: boolean = true
): Promise<CustomBuffer> => {
	return CustomBuffer.fromBuffer(
		await inflate(all ? buffer.buffer : buffer.bufferLeft)
	)
}

const deflate = util.promisify(zlib.deflate)

export const Deflate = async (
	buffer: CustomBuffer,
	all: boolean = true
): Promise<CustomBuffer> => {
	return CustomBuffer.fromBuffer(
		await deflate(all ? buffer.buffer : buffer.bufferLeft)
	)
}
