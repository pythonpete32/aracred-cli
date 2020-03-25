#!/usr/bin/env node

const Listr = require("listr");
const mint = require("./mint");
const addresses = require("./addresses")
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

//const config = require("../scores.json");

const args = process.argv.slice(2);

const mintTasks = async () => {
  const forum = await mint.getInput()
  console.log(forum)
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
        await mint.runSC(forum);
      },
    },
    {
      title: "Calc Grain",
      task: async () => {
        console.log(await mint.calcCred(forum));
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