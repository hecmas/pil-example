const fs = require("fs");
const path = require("path");
const { newCommitPolsArray, compile } = require("pil-stark");
const version = require("../package").version;

const Main = require("../components/main/main");
const Module = require("../components/module/module");

const argv = require("yargs")
    .version(version)
    .usage("node main_exec.js -o <tmp/main.commit> -i <input.json>")
    .alias("o", "output")
    .alias("i", "input")
    .argv;

async function run() {

    const outputFile = typeof(argv.output) === "string" ?  argv.output.trim() : "tmp/main.commit";
    const inputFile = typeof(argv.input) === "string" ?  argv.input.trim() : "input.json";

    const pil = await compile(F, path.join(__dirname, "..", "components/main/main.pil"));

    const input = JSON.parse(await fs.promises.readFile(inputFile, "utf8"));
    const cmPols = newCommitPolsArray(pil);

    const required = await Main.execute(cmPols.Main, input);
    await Module.execute(cmPols.Module, {...input, ...required});

    await cmPols.saveToFile(outputFile);

    console.log("file Generated Correctly");
}

run().then(()=> {
    process.exit(0);
}, (err) => {
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
});

