const { F3g: F } = require("pil-stark");

module.exports.buildConstants = async function(pols) {

    const N = pols.L1.length;

    for (let i = 0; i < N; i++) {
        pols.L1[i] = (i == 0) ? 1n : 0n;
        pols.LN[i] = (i == N-1) ? 1n : 0n;
    }
}


module.exports.buildCommits = async function(pols, input) {
    const required = {Module: []};

    const F = new F3g("0xFFFFFFFF00000001");

    const N = pols.a.length;
    const mod = BigInt(inputs[2]);

    pols.a[0] = BigInt(input[0]);
    pols.b[0] = BigInt(input[1]);
    for (let i = 1; i < N; i++) {
        const sqSum = F.add(F.square(pols.a[i-1]), F.square(pols.b[i-1]));

        required.Module.push({x: sqSum});

        pols.a[i] = pols.b[i-1];
        pols.b[i] = sqSum % mod;
    }

    required.output = pols.b[N-1];

    return required;
}