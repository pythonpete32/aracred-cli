const chalk = require("chalk");
const execa = require("execa");

module.exports = {
    saveinput: async (input) => {},
    displayinput: async (input) => {},
    startBackend: async () => {
        try {
            await execa.command("yarn backend");
        } catch (error) {
            console.error();

        }

    },
    runSC: async () => {
        try {
            await execa.command(`node bin/sourcecred.js load pythonpete32/powertools`);

        } catch (error) {
            console.error(error);
        }
    },
    calcCred: async () => {
        try {
            await execa.command(`node bin/sourcecred.js scores pythonpete32/powertools > CRED.json`, {
                shell: true
            });
        } catch (error) {
            console.error();
        }
    },
    processCSV: async () => {
        try {
            const data = require('./CRED.json')
            cred = []
            data[1].users.map((element) => {
                cred.push([element.address[4], element.totalCred])
            })

            console.log(cred)
            return Promise.resolve(data);

        } catch (error) {
            console.log(error)
        }
        return Promise.resolve("data");
    },
    mintGrain: async () => {
        return Promise.resolve("data");
    },
    userInput: async () => {
        const questions = [{
            name: "mint",
            type: "confirm",
            message: chalk.bold("Mint Grain?"),
            default: true,
        }, ];
    },
};