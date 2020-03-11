const chalk = require('chalk');
const jsonfile = require('jsonfile')
const Configstore = require('configstore');
const execa = require('execa');
const ora = require('ora');

var Table = require('cli-table');
var nrc = require('node-run-cmd');

// data store
const pkg = require('../package.json')
const daoConf = new Configstore(pkg.name);

process.on("SIGPIPE", process.exit);


module.exports = {
    toTokenTable: (data) => {

        var table = new Table({
            head: [chalk.blueBright.bold('Address'), chalk.blueBright.bold('Ammount')],
            colWidths: [60, 30]
        });

        data.map((row) => {
            table.push(row)
        })

        return table.toString()
    },
    saveTxConfig: async (data) => {
        let s = String(__dirname)
        const file = s.substring(0, s.length - 4) + '/aragon-toolkit-examples/examples/mintAndBurn/assignations.json'
        const obj = {
            'daoAddress': '0xD08FF71fba48d4f08Ccd27d7538b9ea365730A31',
            'tokenManagerAddress': '0xcd1934f8ce5cccc41c9f8c19e0baa97f9fd4893d',
            'votingAddress': '0x85e699f4a1726d5bf6f409d2bd63213c4afd85a0',
            'environment': 'rinkeby',
            'mints': data,
            'burns': []
        }

        jsonfile.writeFile(file, obj)
            .then(res => {
                console.log(obj)
            })
            .catch(error => console.error(error))
    },
    submitTx: async () => {
        const spinner = ora('Building Transaction......')

        try {
            spinner.start('Sending Transaction...')
            //console.log('node ' + __dirname + '/aragon-toolkit-examples/examples/mintAndBurn/index.js | sh')
            const com = await execa.command('node /home/m-root/projects/powertools/aragon-toolkit-examples/examples/mintAndBurn/index.js | sh', {
                shell: true
            })

            console.log(com)
            //const tx = await execa.command(com.stdout)
            //console.log(tx.stdout)
        } catch (error) {
            spinner.fail('error')
            console.log("Error: ", error)
        }
        spinner.succeed('Check your DAOs voting app')
        spinner.stop()
    }
}