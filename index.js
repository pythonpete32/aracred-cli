#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const Configstore = require('configstore')
const inquirer = require('./lib/inquirer')

//
const processing = require('./lib/processing');
const sc = require('./lib/cred');


// data store TODO: persist,  Data from add DAO. 
const pkg = require('./package.json')
const daoConf = new Configstore(pkg.name)
daoConf.set('tokenManager', '0xdddf3dc0c04cb25b585ed042d21b58a0401cf3d1')
daoConf.set('voting', '0x85e699f4a1726d5bf6f409d2bd63213c4afd85a0')
daoConf.set('dao', '0xD08FF71fba48d4f08Ccd27d7538b9ea365730A310x0f1449527c458EDee87d19C39CA4f0326818aA46')
daoConf.set('network', 'rinkeby')

// banner
const banner = () => {
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


// run program
const run = async () => {
    banner()

    // login logic
    const newDAO = await inquirer.login()
    //console.log(newDAO)
    if (newDAO) {
        const dao = await inquirer.askDaoAddresses()
        console.log(dao)
        console.log(daoConf)
    }

    // main menu
    let c = await inquirer.menu()
    if (c.command == 'mint') {
        const mints = await inquirer.getMints();
        await inquirer.confirmMints(mints)
        await processing.saveTxConfig(mints)
        await processing.submitTx()
    }
    if (c.command == 'payments') {
        console.log('payments')
    }
    if (c.command == 'sourcecred') {
        const mode = await sc.mode()
        await sc.startBackend()
        console.log(mode.discourse)
        await sc.runSC(mode.discourse)
        await sc.calcCred()
        const cred = await sc.processCSV()
        await inquirer.confirmMints(cred)
        await sc.resolveAddresses(cred)
        const tx = await processing.saveTxConfig()
        await processing.submitTx(tx)
        console.log(mode)
    }
    if (c.command == 'swap') {
        console.log('swap')
    }
    if (c.command == 'permissions') {
        console.log('permissions')
    }
    if (c.command == 'quit') {
        console.log('quit')
    }
}
run()