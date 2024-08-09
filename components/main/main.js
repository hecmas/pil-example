const { F3g: F } = require("pil-stark");

module.exports.buildConstants = async function(pols) {}


module.exports.buildCommits = async function(pols, inputs) {
    const required = {Module: []};

    const N = pols.a.length;
    const mod = BigInt(inputs.mod);

    pols.a[0] = BigInt(inputs.in1);
    pols.b[0] = BigInt(inputs.in2);
    for (let i = 1; i < N; i++) {
        const sqSum = F.add(F.square(pols.a[i-1]), F.square(pols.b[i-1]));

        required.Module.push({x: sqSum});

        pols.a[i] = pols.b[i-1];
        pols.b[i] = sqSum % mod;
    }

    inputs.out = BigInt(pols.b[N-1]);

    return required;
}