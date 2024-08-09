const path = require("path");
const { F3g: F, newConstantPolsArray, compile } = require("pil-stark");
const version = require("../package").version;

const Main = require("../components/main");
const Module = require("../components/module");

const argv = require("yargs")
    .version(version)
    .usage("node main_buildconst.js -o <main.const>")
    .alias("o", "output")
    .argv;

async function run() {

    const outputFile = typeof(argv.output) === "string" ?  argv.output.trim() : "tmp/main.const";

    const pil = await compile(F, path.join(__dirname, "..", "pil/main.pil"));

    const constPols = newConstantPolsArray(pil);

    await Main.buildConstants(constPols.Main);
    await Module.buildConstants(constPols.Module);

    await constPols.saveToFile(outputFile);

    console.log("file Generated Correctly");
}

run().then(()=> {
    process.exit(0);
}, (err) => {
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
});

