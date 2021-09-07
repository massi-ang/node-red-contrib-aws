// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

function copyArgs(src, arg, out, outArg, isObject) {
   
    var tmpValue = src[arg];
    if (tmpValue === undefined) {
        return;
    }
    outArg = (typeof outArg !== 'undefined') ? outArg : arg;

    if (typeof src[arg] !== 'undefined') {
        if (isObject && typeof src[arg] === "string" && src[arg] !== "") {
            tmpValue = JSON.parse(src[arg]);
        }
        out[outArg] = tmpValue;
    }
    //AWS API takes 'Payload' not 'payload' (see Lambda)
    if (arg === "Payload" && typeof tmpValue === 'undefined'){
            out[arg] = src["payload"];
    }
}

module.exports = {
    copyArgs: copyArgs
}