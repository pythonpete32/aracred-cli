import neatCsv from "neat-csv";
import { readFile, writeFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

export default async function transform() {
  try {
    const data = await readFileAsync("./addresses.csv");
    const obj = await neatCsv(data);
    if (obj.length < 1) {
      throw new Error("The file is empty");
    }
    if (!("name" in obj[0]) || !("address" in obj[0])) {
      throw new Error("CSV columns should be `name` and `address`");
    }
    const identities = obj.map(id => ({
      createdAt: new Date().getTime(),
      ...id
    }));
    writeFileAsync("./addresses.json", JSON.stringify(identities, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
}
