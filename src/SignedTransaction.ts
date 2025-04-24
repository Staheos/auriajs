import { Wallet } from './Wallet.js';
import { Transaction } from './Transaction.js';
import { Signature } from './Signature.js';
import { SignedTransactionDict } from './SignedTransactionDict.js';

/**
 * @desc
 *  A transaction enriched with a signature and public key for verification.
 */
export class SignedTransaction extends Transaction {
  private readonly _signature: Signature;
  private readonly _publicKey: Uint8Array;

  /**
   * @desc
   *  Create a signed transaction using the provided wallet.
   */
  public constructor(transaction: Transaction, wallet: Wallet) {
    super(transaction.amount, transaction.fees, transaction.recipient, transaction.sender);
    // Sign the hash of the base transaction
    const txHash = this.GetHash();
    this._signature = Signature.Sign(new TextEncoder().encode(txHash), wallet.GetPrivateKey());
    this._publicKey = wallet.GetPublicKey();
  }

  /**
   * @desc
   *  Serialize the signed transaction to a plain object including signature and pubkey.
   */
  public override ToDict(): SignedTransactionDict {
    return {
      transaction: super.ToDict(),
      hash: this.GetHash(),
      pubkey: Buffer.from(this._publicKey).toString('hex'),
      signature: this._signature.Serialize(),
    };
  }

  /**
   * @desc
   *  Serialize the signed transaction to a JSON string.
   */
  public override Serialize(): string {
    return JSON.stringify(this.ToDict());
  }
}
