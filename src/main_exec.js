const fs = require("fs");
const path = require("path");
const { F3g } = require("pil-stark");
const version = require("../../../package").version;

const Main = require("../components/main");
const Module = require("../components/module");

const { newCommitPolsArray, compile } = require("pilcom");


const argv = require("yargs")
    .version(version)
    .usage("node main_exec.js -o <tmp/main.commit> -i <input.json>")
    .alias("o", "output")
    .alias("i", "input")
    .argv;

async function run() {

    const outputFile = typeof(argv.output) === "string" ?  argv.output.trim() : "tmp/main.commit";
    const inputFile = typeof(argv.input) === "string" ?  argv.input.trim() : "input.json";

    const F = new F3g();
    const pil = await compile(F, path.join(__dirname, "pil/main.pil"));

    const input = JSON.parse(await fs.promises.readFile(inputFile, "utf8"));
    const cmPols =  newCommitPolsArray(pil);

    await Main.execute(cmPols.Main, input);
    await Module.execute(cmPols.Module, input);

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

