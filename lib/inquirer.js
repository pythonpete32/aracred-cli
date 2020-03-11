const inquirer = require('inquirer');

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const Configstore = require('configstore');

// data store
const pkg = require('../package.json')
const daoConf = new Configstore(pkg.name);

const processing = require('./processing');


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
}

module.exports = {
    askDaoAddresses: async () => {
        await refresh()

        const questions = [{
                name: 'dao',
                type: 'input',
                message: ('Enter your ' + chalk.white.bold('DAO') + ' address:'),
                validate: function (value) {
                    if (value.length == 42) {
                        return true;
                    } else {
                        return 'Please enter a valid Ethereum address';
                    }
                }
            },
            {
                name: 'voting',
                type: 'input',
                message: ('Enter your ' + chalk.white.bold('Voting') + ' address:'),
                validate: function (value) {
                    if (value.length == 42) {
                        return true;
                    } else {
                        return 'Please enter a valid Ethereum address';
                    }
                }
            },
            {
                name: 'tokenManager',
                type: 'input',
                message: ('Enter your ' + chalk.white.bold('Token Manager') + ' address:'),
                validate: function (value) {
                    if (value.length == 42) {
                        return true;
                    } else {
                        return 'Please enter a valid Ethereum address';
                    }
                }
            },
            {
                name: 'network',
                type: 'checkbox',
                message: 'Which network is the DAO on:',
                choices: [
                    'mainnet',
                    'rinkeby'
                ]
            }
        ];
        return inquirer.prompt(questions);
    },
    getMints: async () => {
        await refresh()

        const mints = []
        let more = true
        let count = 1
        while (more) {
            console.log(processing.toTokenTable(mints))

            const questions = [{
                    name: 'reciever',
                    type: 'input',
                    message: (chalk.yellow(count) + chalk.redBright.bold(' Recipient') + ' address:'),
                    validate: function (value) {
                        if (value.length == 42) {
                            return true;
                        } else {
                            return 'Please enter a valid Ethereum address';
                        }
                    }
                },
                {
                    name: 'ammount',
                    type: 'number',
                    message: ('Enter the ' + chalk.redBright.bold('Ammount') + ' to mint:'),
                    validate: function (value) {
                        if (value >= 0) {
                            return true;
                        } else {
                            return 'Please enter a value greater than 0';
                        }
                    }
                },
                {
                    name: 'again',
                    type: 'confirm',
                    message: chalk.bold('Mint to another address?'),
                    default: true
                },
            ]
            const res = await inquirer.prompt(questions);
            mints.push([res.reciever, String(res.ammount * (10 ** 18))]) // <--- this breaks >999 tokens

            count++
            if (!res.again) {
                more = false
            }
            await refresh()
        }
        return mints
    },
    confirmMints: async (data) => {
        await refresh()

        const questions = [{
            name: 'dao',
            type: 'list',
            message: ('\n' + processing.toTokenTable(data) + `\nAre  you sure you want to mint these tokens`),
            choices: [
                chalk.greenBright('Yes'),
                new inquirer.Separator(),
                chalk.redBright('No')
            ]
        }];
        const res = await inquirer.prompt(questions)


    },
    login: async () => {
        await refresh()

        const questions = [{
            name: 'dao',
            type: 'list',
            message: ('Load saved ' + chalk.white.bold('DAO')),
            choices: [
                chalk.yellowBright('MetaGame DAO'),
                new inquirer.Separator(),
                "new"
            ]
        }];
        const res = await inquirer.prompt(questions)
        console.log(res)
        if (res.dao == 'new') {
            return true
        }
        return false
    },
    menu: async () => {
        //await refresh()

        const questions = [{
            name: 'command',
            type: 'list',
            message: (chalk.white.bold('Which Tool?')),
            choices: [{
                    name: chalk.green('Super Mint:      ') + '   mints tokens to multiple addresses',
                    value: 'mint'
                },
                {
                    name: chalk.green('SourceCred:      ') + '   Calculate cred and mint grain in your DAO.',
                    value: 'sourcecred'
                }, {
                    name: chalk.green('Atomic payments: ') + '   Pay multiple people with just one vote.',
                    value: 'payments'
                },
                {
                    name: chalk.green('Swap SAI to DAI: ') + '   Swap SAI in a Vault/Agent into DAI with just one vote.',
                    value: 'swap'
                },
                {
                    name: chalk.green('Permissions:     ') + '   Create, grant, and revoke many permissions with just one vote.',
                    value: 'permissions'
                },
                new inquirer.Separator(),
                chalk.redBright.bold("Quit")
            ]
        }];
        return await inquirer.prompt(questions)
    },
};