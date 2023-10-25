import zlib from 'zlib'
import util from 'util'

export const Inflate = util.promisify(zlib.inflate)

export const Deflate = util.promisify(zlib.deflate)
