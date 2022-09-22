import Deso from 'deso-protocol';

type TODO = any;

export async function createDerivedKey(deso: Deso): Promise<TODO> {
  try {
    console.log('starting');

    const keyPair = deso.utils.generateKeyFromSeedHex({
      seedHex:
        '0ec26db3b26f993b8db7b4a9f22c85b7b0d2500ec4ac1f5171acf7efaa108cd5',
    });

    const publicKey = deso.utils.privateKeyToDeSoPublicKey(keyPair);
    console.log('constructing transaction');

    const transaction = await deso.nft.createNftBid({
      BidAmountNanos: 1000,
      MinFeeRateNanosPerKB: 1000,
      UpdaterPublicKeyBase58Check: publicKey,
      NFTPostHashHex:
        '0d810c8f27387bceca8e896f394d0fcb6f91279c0d9a3b8ce108dfe43b1f7aa0',
      SerialNumber: 1,
    });

    console.log('signing locally');
    const signature = deso.utils.signMessageLocally({
      transactionHex: transaction.TransactionHex,
      keyPair,
    });

    console.log('submitting');
    await deso.transaction
      .submitTransaction(signature)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e: any) {
    // console.log(e);
    // console.log(e.request);
    console.log(' ');
    console.log(e.response.config.data);
    console.log(' ');
    console.log(e.response.data);
    // console.log(Object.keys(e));
  }
}

export async function deriveWindowCall(): Promise<void> {
  const derive = window.open(
    'https://identity.deso.org/derive?transactionSpendingLimitResponse=%7B%22GlobalDESOLimit%22:500170000,%22TransactionCountLimitMap%22:%7B%22AUTHORIZE_DERIVED_KEY%22:2,%22BASIC_TRANSFER%22:2%7D,%22NFTOperationLimitMap%22:%7B%22%22:%7B%220%22:%7B%22nft_bid%22:1%7D%7D%7D%7D?callback=window-callback'
  );
}
