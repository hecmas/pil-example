module.exports.buildConstants = async function (pols) {

    const N = pols.BYTEp.length;

    for (let i = 0; i < 0xFF; i++) {
        pols.BYTEp[i] = BigInt(i + 1);
    }

    for (let i = 0xFF; i < N; i++) {
        pols.BYTEp[i] = 0xFFn;
    }
}


module.exports.buildCommits = async function (pols, inputs, required) {
    const N = pols.x.length;
    const mod = BigInt(inputs.mod);

    for (let i = 0; i < required.Module.length; i++) {
        pols.x[i] = required.Module[i]["x"];
        pols.q[i] = pols.x[i] / mod;
        pols.r[i] = pols.x[i] % mod;
    }

    for (let i = required.Module.length; i < N - 1; i++) {
        pols.x[i] = 0n;
        pols.q[i] = 0n;
        pols.r[i] = 0n;
    }

    pols.x[N - 1] = mod;
    pols.q[N - 1] = 1n;
    pols.r[N - 1] = 0n;
}