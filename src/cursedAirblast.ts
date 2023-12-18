import ParseMSCH from './ParseMSCH.js'
import CustomBuffer from './CustomBuffer.js'
import GenerateMSCH from './GenerateMSCH.js'
import Point2 from './Data/Point2.js'
import Int from './Data/Number/Int.js'
import Short from './Data/Number/Short.js'

const base64 =
	'bXNjaAF4nCXNTRKDIAwF4Aco1VLbhRfoBThRpwtUFswgOkD/bl8wLPIFSOahx1WgCWa1GIyLkzcp37NNGWqxaY5uz24LAKQ3k/UJ/PEUUMecXqLzHrePyTZq+83RzHmLGPf6a4J7rXrewtv+yiMwAgyiNIWuFk49h0IpArLSoAWrSOJEdERPnAlFXIgBjJXl48gaxMtN1hRJeW0N+gNsFCKA'

const deflatedData = Buffer.from(base64, 'base64')

const schematic = await ParseMSCH(CustomBuffer.fromBuffer(deflatedData))

console.log(schematic.tiles.length)

schematic.tiles[0].position = new Point2(new Int(1), new Int(1))
schematic.tiles[1].position = new Point2(new Int(1), new Int(2))
schematic.tiles[2].position = new Point2(new Int(2), new Int(0))
schematic.tiles[3].position = new Point2(new Int(2), new Int(3))
schematic.tiles[4].position = new Point2(new Int(3), new Int(1))
schematic.tiles[5].position = new Point2(new Int(4), new Int(0))
schematic.tiles[6].position = new Point2(new Int(4), new Int(1))
schematic.tiles[7].position = new Point2(new Int(4), new Int(2))
schematic.tiles[8].position = new Point2(new Int(4), new Int(3))
schematic.tiles[9].position = new Point2(new Int(4), new Int(4))
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()
schematic.tiles.pop()

schematic.height = new Short(5)
schematic.width = new Short(5)

schematic.tags.name = "The Cursed Tho Most Compact 2 Airblast Drills"
schematic.tags.description = "Water extractors included"

console.log('result')

// console.log(schematic.tiles)

console.log((await GenerateMSCH(schematic)).toString('base64'))
