import ParseMSCH from './ParseMSCH.js'
import CustomBuffer from './CustomBuffer.js'
import GenerateMSCH from './GenerateMSCH.js'
import Point2 from './Data/Point2.js'
import Int from './Data/Number/Int.js'
import Short from './Data/Number/Short.js'
const base64 =
	'bXNjaAF4nGNgZ2BnZmDJS8xNZeBxKspMSU9VCEktLilh4E5JLU4uyiwoyczPY2BgYMtJTErNKWZgio5lZOBPAqvUTc7PK0utzC8CyjMxgBSx/////wwQvwFxGBhA3GNA/IkBAP7VI8U='

// const base64 =
// 	'bXNjaAF4nGNgZGBlZmDJS8xNZeB1KspMSU9VCEktLikpYeBOSS1OLsosKMnMz2NgYGDLSUxKzSlmYIqOZWTgTwIr1U3OzytLrcwvAsozMYAAOwMEsEBI9v///58A4ncMAIgaHHo='

const deflatedData = Buffer.from(base64, 'base64')

const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

console.log(schematic.tiles)

schematic.tiles[0].position = new Point2(new Int(0), new Int(0))
schematic.tiles[0].config = new Point2(new Int(50), new Int(0))
schematic.tiles[1].position = new Point2(new Int(50), new Int(0))

schematic.height = new Short(1)
schematic.width = new Short(51)

console.log("result")

console.log(schematic.tiles)

console.log((await GenerateMSCH(schematic)).toString('base64'))
