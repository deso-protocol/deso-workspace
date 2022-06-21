"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lordBaelish = void 0;
const cors = require("cors");
const deso_protocol_1 = require("deso-protocol");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const deso = new deso_protocol_1.Deso({ identityConfig: { host: 'server' } });
app.get('/test', async (req, res) => {
    const oy = {
        UpdaterPublicKeyBase58Check: 'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
        BodyObj: {
            Body: 'Checking out the developer hub',
            VideoURLs: [],
            ImageURLs: [],
        },
    };
    const response = await deso.posts.submitPost(oy).catch((e) => console.log(e));
    console.log(response);
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
function lordBaelish() {
    return 'lord-baelish';
}
exports.lordBaelish = lordBaelish;
//# sourceMappingURL=lord-baelish.js.map