
const neatCsv = require('neat-csv');
const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

module.exports = {
  transform: async () => {
    try {
      const data = await readFileAsync('./addresses.csv')
      const obj = await neatCsv(data)
      if (obj.length < 1) {
        throw new Error("The file is empty")
      }
      if (!("name" in obj[0]) || !("address" in obj[0])) {
        throw new Error("CSV columns should be `name` and `address`")
      }
      const identities = obj.map(id => ({ createdAt: new Date().getTime(), ...id }))
      writeFileAsync('./addresses.json', JSON.stringify(identities, null, 2))
    } catch(err) {
      console.error(err)
      process.exit(-1)
    }
  },
}
