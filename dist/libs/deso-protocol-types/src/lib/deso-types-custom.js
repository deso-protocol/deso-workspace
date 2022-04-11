"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.NFTLimitOperationString = exports.DAOCoinLimitOperationString = exports.CreatorCoinLimitOperationString = exports.DeSoNetwork = void 0;
var DeSoNetwork;
(function (DeSoNetwork) {
    DeSoNetwork["mainnet"] = "mainnet";
    DeSoNetwork["testnet"] = "testnet";
})(DeSoNetwork = exports.DeSoNetwork || (exports.DeSoNetwork = {}));
var CreatorCoinLimitOperationString;
(function (CreatorCoinLimitOperationString) {
    CreatorCoinLimitOperationString["ANY"] = "any";
    CreatorCoinLimitOperationString["BUY"] = "buy";
    CreatorCoinLimitOperationString["SELL"] = "sell";
    CreatorCoinLimitOperationString["TRANSFER"] = "transfer";
})(CreatorCoinLimitOperationString = exports.CreatorCoinLimitOperationString || (exports.CreatorCoinLimitOperationString = {}));
var DAOCoinLimitOperationString;
(function (DAOCoinLimitOperationString) {
    DAOCoinLimitOperationString["ANY"] = "any";
    DAOCoinLimitOperationString["MINT"] = "mint";
    DAOCoinLimitOperationString["BURN"] = "burn";
    DAOCoinLimitOperationString["DISABLE_MINTING"] = "disable_minting";
    DAOCoinLimitOperationString["UPDATE_TRANSFER_RESTRICTION_STATUS"] = "update_transfer_restriction_status";
    DAOCoinLimitOperationString["TRANSFER"] = "transfer";
})(DAOCoinLimitOperationString = exports.DAOCoinLimitOperationString || (exports.DAOCoinLimitOperationString = {}));
var NFTLimitOperationString;
(function (NFTLimitOperationString) {
    NFTLimitOperationString["ANY"] = "any";
    NFTLimitOperationString["UPDATE"] = "update";
    NFTLimitOperationString["BID"] = "nft_bid";
    NFTLimitOperationString["ACCEPT_BID"] = "accept_nft_bid";
    NFTLimitOperationString["TRANSFER"] = "transfer";
    NFTLimitOperationString["BURN"] = "burn";
    NFTLimitOperationString["ACCEPT_TRANSFER"] = "accept_nft_transfer";
})(NFTLimitOperationString = exports.NFTLimitOperationString || (exports.NFTLimitOperationString = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["BasicTransfer"] = "BASIC_TRANSFER";
    TransactionType["BitcoinExchange"] = "BITCOIN_EXCHANGE";
    TransactionType["PrivateMessage"] = "PRIVATE_MESSAGE";
    TransactionType["SubmitPost"] = "SUBMIT_POST";
    TransactionType["UpdateProfile"] = "UPDATE_PROFILE";
    TransactionType["UpdateBitcoinUSDExchangeRate"] = "UPDATE_BITCOIN_USD_EXCHANGE_RATE";
    TransactionType["Follow"] = "FOLLOW";
    TransactionType["Like"] = "LIKE";
    TransactionType["CreatorCoin"] = "CREATOR_COIN";
    TransactionType["SwapIdentity"] = "SWAP_IDENTITY";
    TransactionType["UpdateGlobalParams"] = "UPDATE_GLOBAL_PARAMS";
    TransactionType["CreatorCoinTransfer"] = "CREATOR_COIN_TRANSFER";
    TransactionType["CreateNFT"] = "CREATE_NFT";
    TransactionType["UpdateNFT"] = "UPDATE_NFT";
    TransactionType["AcceptNFTBid"] = "ACCEPT_NFT_BID";
    TransactionType["NFTBid"] = "NFT_BID";
    TransactionType["NFTTransfer"] = "NFT_TRANSFER";
    TransactionType["AcceptNFTTransfer"] = "ACCEPT_NFT_TRANSFER";
    TransactionType["BurnNFT"] = "BURN_NFT";
    TransactionType["AuthorizeDerivedKey"] = "AUTHORIZE_DERIVED_KEY";
    TransactionType["MessagingGroup"] = "MESSAGING_GROUP";
    TransactionType["DAOCoin"] = "DAO_COIN";
    TransactionType["DAOCoinTransfer"] = "DAO_COIN_TRANSFER";
    TransactionType["DAOCoinLimitOrder"] = "DAO_COIN_LIMIT_ORDER";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
//# sourceMappingURL=deso-types-custom.js.map