const { F3g: F } = require("pil-stark");

module.exports.buildConstants = async function (pols) {

    const N = pols.BYTEp.length;

    for (let i = 0; i < 0xFF; i++) {
        pols.BYTEp[i] = BigInt(i + 1);
    }

    for (let i = 0xFF; i < N; i++) {
        pols.BYTEp[i] = 0xFFn;
    }
}


module.exports.buildCommits = async function (pols, input) {
    const F = new F3g("0xFFFFFFFF00000001");

    const N = pols.x.length;
    const mod = BigInt(input.mod);

    for (let i = 0; i < input.length; i++) {
        pols.x[i] = input[i]["x"];
        polsq.q[i] = x / mod;
        pols.r[i] = x % mod;
    }

    for (let i = input.length; i < N; i++) {
        pols.x[i] = 0n;
        polsq.q[i] = 0n;
        pols.r[i] = 0n;
    }
}