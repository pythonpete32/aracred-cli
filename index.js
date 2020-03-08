const chalk = require('chalk')
const Configstore = require('configstore')
const inquirer = require('inquirer');
const jsonfile = require('jsonfile')
const execa = require('execa');
const ora = require('ora');

let Table = require('cli-table');

//
// Flow:
//    - get info from json file : token, url, DAO addresses
//    - `yarn backend`
//    - await `node bin/sourcecred.js discourse https://discourse.sourcecred.io`
//    - await `node bin/sourcecred.js scores discourse.sourcecred.io`
//    - format grain
//    - Save grain to json file
//    - display grain
//    - Ask to mint
//    - Mint
//



const loadConfig = async () => {
    return Promise.resolve('data');
}

const startBackend = () => {
    

}

const runSC = async () => {
    return Promise.resolve('data');
}

const calcGrain = async () => {
    return Promise.resolve('data');
}

const saveGrain = async () => {
    return Promise.resolve('data');
}

const mintGrain = async () => {
    return Promise.resolve('data');
}

const userInput = async () => {
    /*
     * mint grain
     */
    const questions = [

        {
            name: 'mint',
            type: 'confirm',
            message: chalk.bold('Mint Grain?'),
            default: true
        }
    ]
}
