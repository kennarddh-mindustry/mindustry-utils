import dgram from 'node:dgram'
import CustomBuffer from '../CustomBuffer.js'

const RequestUDP = (host: string, port: number, data: CustomBuffer) =>
	new Promise<CustomBuffer>((resolve, reject) => {
		const client = dgram.createSocket('udp4')

		client.on('message', message => {
			client.close()

			const buffer = CustomBuffer.fromBuffer(message)

			resolve(buffer)
		})

		client.send(data.buffer, port, host, err => {
			if (err) reject(err)
		})
	})

export default RequestUDP
