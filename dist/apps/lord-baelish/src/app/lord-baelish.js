"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lordBaelish = void 0;
const deso_protocol_1 = require("deso-protocol");
const elliptic_1 = require("elliptic");
const ethers_1 = require("ethers");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.post('/send-funds', (req, res) => {
    console.log('hello?');
    console.log(req.body);
    res.send('hello');
});
function lordBaelish() {
    const deso = new deso_protocol_1.default();
    return 'lord-baelish';
}
exports.lordBaelish = lordBaelish;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
const getKeyFromSignature = (message, signature) => {
    const e = new elliptic_1.ec('secp256k1');
    const arrayify = ethers_1.ethers.utils.arrayify;
    const messageHash = arrayify(ethers_1.ethers.utils.hashMessage(message));
    const publicKeyUncompressedHexWith0x = ethers_1.ethers.utils.recoverPublicKey(messageHash, signature);
    const messagingPublicKey = e.keyFromPublic(publicKeyUncompressedHexWith0x.slice(2), 'hex');
    // const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
    // const key = messagingPublicKey.getPublic().encode('array', true);
    // const desoKey = Uint8Array.from([...prefix, ...key]);
    // const encodedDesoKey = bs58check.encode(desoKey);
    // return encodedDesoKey;
};
//# sourceMappingURL=lord-baelish.js.map