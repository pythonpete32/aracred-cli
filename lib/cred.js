/*
 *J
 *  FLOW:
 *       - Get Info:         Discourse Address
 *       - Mint or CSV:      Slightly different flow for llops app
 *       - Calculate Cred:   JSON file
 *       - Parse Json:       Turn into something usefull
 *       - Resolve Address:  Assume Everyone is in the book
 *       - Create Mint Conf: add to the mint & burn script
 *       - Send TX:          Send
 *
 */
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const inquirer = require('inquirer');
const execa = require('execa')
const ora = require('ora')
const fs = require('fs')
const Table = require('cli-table');

const processing = require('./processing')
const addresses = [
    '0x0003f5b950e37aafa5a06b9aac50436bfdadfd40',
    '0x32b789ba285327175902455f260beb3c6357e1d6',
    '0x8f08d1795e03f86176b1eb97dfbe34ebdb30a3b2',
    '0xa760faf5e9debe7f2b3e685edacd676b804dfec6',
    '0x6c18c8f2e163ef411272f46c1c31c5862f276a38',
    '0xffeb1f3c31e0f2839b856b8726f1eb52d98ac0dc',
    '0x0003f5b950e37aafa5a06b9aac50436bfdadfd40',
    '0x05656a4d5a72384e07be894a116781b70595f0b7',
    '0x9d7a0c5c6fe4d62760b9c7692e9342eb687a690f',
    '0xc48eabf59da036cef74d182c87672dbb54e4b665'
]
const refresh = async () => {
    clear();
    console.log(
        chalk.blueBright(
            figlet.textSync('Power Tools', {
                horizontalLayout: 'full'
            })
        )
    )
    console.log(
        chalk.blue.bold('For Aragon Power Users')
    )
    return Promise.resolve(true)
}

module.exports = {
    mode: async () => {
        await refresh()
        const questions = [{
                name: 'discourse',
                type: 'input',
                message: ('Enter your ' + chalk.white.bold('Discourse Forum') + ' address:'),
                validate: function (value) {
                    // validate 
                    return true
                }
            },
            {
                name: 'mintOrSave',
                type: 'list',
                message: (chalk.white.bold('What do you want to do?')),
                choices: [{
                        name: chalk.yellowBright('Calculate Cred and Mint Grain'),
                        value: "mint"
                    },
                    new inquirer.Separator(),
                    {
                        name: chalk.yellowBright('Calculate Cred and Save to .csv'),
                        value: "save"
                    }

                ]
            }
        ];
        const res = await inquirer.prompt(questions)
        if (res == 'mint') {
            console.log(res)
            return res
        }
        return res
    },
    startBackend: async () => {
        const spinner = ora()
        try {
            spinner.start('Starting SourceCred BackEnd')
            await execa.command("yarn backend");
        } catch (error) {
            console.error();
            spinner.fail()
            console.log(error)
            return
        }
        spinner.succeed('SourceCred Backend ' +
            chalk.greenBright('UP'))

    },
    runSC: async (url) => {
        const spinner = ora()
        try {
            spinner.start('Running SourceCred, This may take a while')
            await execa.command(`node bin/sourcecred.js discourse https://${url}`);
        } catch (error) {
            spinner.fail()
            console.error(error);
            return
        }
        spinner.succeed()
    },
    calcCred: async () => {
        const spinner = ora()
        try {
            spinner.start('Saving Cred')
            await execa.command(`node bin/sourcecred.js scores port.oceanprotocol.com > CRED.json`, {
                shell: true
            });
            spinner.succeed('Cred saved to ' + chalk.bold.green('CRED.json'))
            return
        } catch (error) {
            console.error();
            spinner.fail()
        }
    },
    processCSV: async () => {
        try {
            console.log(process.cwd() + '/Cred.json')
            const data = require(process.cwd() + '/CRED.json')
            cred = []
            data[1].users.map((element) => {
                cred.push([element.address[4], element.totalCred])
            })


            var jsonString = JSON.stringify(cred);
            fs.writeFile('./toMint.json', jsonString, (error) => {
                if (error) {
                    console.log(error)
                }
                console.log("Saved to " + chalk.bold.greenBright(process.cwd() + "/CRED.json"))
            })

            // SAVE CSV LOGIC
            const csvContent = cred.map(e => e.join(",")).join("\n");

            fs.writeFile('./toMint.csv', csvContent, (error) => {
                if (error) {
                    console.log(error);
                }
                console.log("Saved toMint.csv");
            })
            return cred
        } catch (error) {
            console.log(error)
        }

    },
    resolveAddresses: async (data) => {
        data.map((row) => {
            row[0] = addresses.pop()
        })
        console.log(processing.toTokenTable(data))
        return data
    }
}