"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lordBaelish = void 0;
const cors = require("cors");
const deso_protocol_1 = require("deso-protocol");
const ethers_1 = require("ethers");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const deso = new deso_protocol_1.Deso({ identityConfig: { host: 'server' } });
app.post('/send-funds', async (req, res) => {
    const body = req.body;
    const response = await getKeyFromSignature(body.message, body.signature);
    const provider = ethers_1.ethers.getDefaultProvider();
    let balance = await (await provider.getBalance(body.publicAddress)).toString();
    balance = ethers_1.ethers.utils.formatEther(balance);
    res.send({ response, balance });
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
const getKeyFromSignature = async (message, signature) => {
    const response = await deso.metamask.getMetaMaskMasterPublicKeyFromSignature(signature, message);
    return response;
};
function lordBaelish() {
    return 'lord-baelish';
}
exports.lordBaelish = lordBaelish;
//# sourceMappingURL=lord-baelish.js.map