#!/usr/bin/env node

const Listr = require("listr");
const mint = require("./mint");
const addresses = require("./addresses")
//
// Flow:
//    - get info from json file : token, url, DAO addresses
//    - 1. `yarn backend`
//    - 2. await `node bin/sourcecred.js discourse https://discourse.sourcecred.io`
//    - 3. await `node bin/sourcecred.js scores discourse.sourcecred.io`
//    - format grain
//    - Save grain to json file
//    - display grain
//    - Ask to mint
//    - Mint
//
//  github
//    - 1. `yarn backend`
//    - 2. await `node bin/sourcecred.js load pythonpete32/aracred-cli` 
//    - 3. await `node bin/sourcecred.js scores pythonpete32/aracred-cli`

//const config = require("../scores.json");

const args = process.argv.slice(2);

process.env.SOURCECRED_GITHUB_TOKEN = '71b30c97c9f9115c5f125446665ba1439249fcb3';

const mintTasks = async () => {
  const input = await mint.getInput()
  console.log(input)
  const tasks = new Listr([
    {
      title: "Run Backend",
      task: async () => {
        await mint.startBackend();
      },
    },
    {
      title: "Run SourceCred",
      task: async () => {
        await mint.runSC(input);
      },
    },
    {
      title: "Calc Grain",
      task: async () => {
        console.log(await mint.calcCred(input));
      },
    },
    {
      title: "saveCSV",
      task: async () => {
        await mint.processCSV();
      },
    },
  ]);

  tasks.run();
};

const addressesTasks = async () => {
  const tasks = new Listr([
    {
      title: "Transform CSV to JSON",
      task: async () => {
        await addresses.transform();
      },
    },
  ]);

  tasks.run();
};
if (!args[0]) {
  mintTasks()
} else if (args[0] === 'addresses') {
  addressesTasks()
}