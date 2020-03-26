#!/usr/bin/env node

import { startBackend, runSC, calcCred, processCSV, getInput } from "./mint";
import transform from "./addresses";
import key from "../secret";

const Listr = require("listr");

const args = process.argv.slice(2);

process.env.SOURCECRED_GITHUB_TOKEN = key;

const mintTasks = async () => {
  const input = await getInput();
  console.log(input);
  const tasks = new Listr([
    {
      title: "Run Backend",
      task: async () => {
        await startBackend();
      }
    },
    {
      title: "Run SourceCred",
      task: async () => {
        await runSC(input);
      }
    },
    {
      title: "Calc Grain",
      task: async () => {
        console.log(await calcCred(input));
      }
    },
    {
      title: "saveCSV",
      task: async () => {
        await processCSV();
      }
    }
  ]);

  tasks.run();
};

const addressesTasks = async () => {
  const tasks = new Listr([
    {
      title: "Transform CSV to JSON",
      task: async () => {
        await transform();
      }
    }
  ]);

  tasks.run();
};
if (!args[0]) {
  mintTasks();
} else if (args[0] === "addresses") {
  addressesTasks();
}
