const fs = require("fs");
const path = require("path");
const { newCommitPolsArray, compile, F3g: F } = require("pil-stark");
const version = require("../package").version;

const Main = require("../components/main/main.js");
const Module = require("../components/module/module.js");

const argv = require("yargs")
    .version(version)
    .usage("node main_buildcommits.js -o <tmp/main.commit> -i <inputs.json>")
    .alias("o", "output")
    .alias("i", "inputs")
    .argv;

async function run() {

    const inputFile = typeof(argv.inputs) === "string" ?  argv.inputs.trim() : "src/inputs.json";
    const outputFile = typeof(argv.output) === "string" ?  argv.output.trim() : "tmp/main.commit";

    const pil = await compile(F, path.join(__dirname, "..", "components/main/main.pil"));

    const inputs = JSON.parse(await fs.promises.readFile(inputFile, "utf8"));

    const cmPols = newCommitPolsArray(pil);

    const required = await Main.buildCommits(cmPols.Main, inputs);
    await Module.buildCommits(cmPols.Module, inputs, required);

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

