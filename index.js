#!/usr/bin/env node

const Listr = require("listr");
const f = require("./functions");
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

process.env.SOURCECRED_GITHUB_TOKEN =
  "11ff774f6d38b7bcebb943813b9d28b6fc9cbf28";

//const config = require("../scores.json");

const run = async () => {
  const tasks = new Listr([{
      title: "Run Backend",
      task: async () => {
        await f.startBackend();
      },
    },
    {
      title: "Run SourceCred",
      task: async () => {
        await f.runSC();
      },
    },
    {
      title: "Calc Grain",
      task: async () => {
        console.log(await f.calcCred());
      },
    },
  ]);

  tasks.run();
};
run();