import { MUtf8Encoder } from "mutf-8"
import CustomBuffer from "./CustomBuffer.js"

export const ReadString = (buffer: CustomBuffer): string => {
	const length = buffer.get() & 0xff

	const stringBuffer = CustomBuffer.alloc(length)

	for (let i = 0; i < length; i++) {
		const data = buffer.get()

		stringBuffer.write(data)
	}

	return stringBuffer.toString('utf-8')
}

export const WriteString = (buffer: CustomBuffer, string: string) => {
	buffer.write(1)

	const encoder = new MUtf8Encoder()
	const encoded = encoder.encode(string)

	buffer.writeInt2(encoded.length)

	for (const byte of encoded) {
		buffer.writeInt4(byte)
	}
}