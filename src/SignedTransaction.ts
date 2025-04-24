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
  constructor(transaction: Transaction, wallet: Wallet) {
    super(transaction.amount, transaction.fees, transaction.recipient, transaction.sender);
    // Sign the hash of the base transaction
    const txHash = this.getHash();
    this._signature = Signature.sign(new TextEncoder().encode(txHash), wallet.getPrivateKey());
    this._publicKey = wallet.getPublicKey();
  }

  /**
   * @desc
   *  Serialize the signed transaction to a plain object including signature and pubkey.
   */
  override toDict(): SignedTransactionDict {
    return {
      transaction: super.toDict(),
      hash: this.getHash(),
      pubkey: Buffer.from(this._publicKey).toString('hex'),
      signature: this._signature.serialize(),
    };
  }

  /**
   * @desc
   *  Serialize the signed transaction to a JSON string.
   */
  override serialize(): string {
    return JSON.stringify(this.toDict());
  }
}
