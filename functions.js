const chalk = require("chalk");
const execa = require("execa");
var fs = require('fs');
var Table = require('cli-table');
const inquirer = require('inquirer')



module.exports = {
    saveinput: async (input) => {},
    displayinput: async (input) => {},
	getInput: async () => {
		const questions = [{
				name: "forum",
				type: "input",
				message: "Enter the " + chalk.white.bold("Discourse Forum") + " you want to run SourceCred against:",
			}
		];
		return inquirer.prompt(questions);
	},
    startBackend: async () => {
        try {
            await execa.command("yarn backend");
        } catch (error) {
            console.error();

        }

    },
    runSC: async forum => {
        try {
            await execa.command(`node bin/sourcecred.js discourse https://${forum.forum}`);

        } catch (error) {
            console.error(error);
            return
        }
    },
    calcCred: async forum => {
        try {
            await execa.command(`node bin/sourcecred.js scores ${forum.forum} > CRED.json`, {
                shell: true
            });
        } catch (error) {
            console.error();
        }
    },
    processCSV: async () => {
        try {
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
                console.log("Saved toMint.json")
            })
            const fields = ['Address', 'Grain'];
            const opts = {
                fields
            };

            // SAVE CSV LOGIC
            const csvContent = cred.map(e => e.join(",")).join("\n");

            fs.writeFile('./toMint.csv', csvContent, (error) => {
                if (error) {
                    console.log(error)
                }
                console.log("Saved toMint.csv")
            })
            // return Promise.resolve(data);

            // print the cred as table
            var table = new Table({
                head: [chalk.blueBright.bold('Address'), chalk.blueBright.bold('Amount')],
                colWidths: [60, 30]
            });

            cred.map((row) => {
                table.push(row)
            })

            return table.toString()

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