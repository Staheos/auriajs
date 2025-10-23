import { Transaction } from './Transaction.js';
import { Signature } from './Signature.js';
import { SignedTransactionType } from './SignedTransactionType.js';
import { PublicKey } from "./PublicKey.js";

/**
 * @desc
 *  A transaction enriched with a signature and public key for verification.
 */
export class SignedTransaction extends Transaction {
  private readonly _signature: Signature;
  private readonly _publicKey: PublicKey;

  /**
   * @desc
   *  Create a signed transaction using the provided wallet.
   */
  public constructor(transaction: Transaction, signature: Signature, publicKey: PublicKey) {
    super(transaction.amount, transaction.fees, transaction.recipient, transaction.sender, transaction.timestamp, transaction.timestamp);
    // Sign the hash of the base transaction
    this._signature = signature
    this._publicKey = publicKey
  }

  /**
   * @desc
   *  Create a Transaction object from a plain object.
   */
  public static FromDict(data2: object): SignedTransaction {
    const data = data2 as SignedTransactionType;
    return new SignedTransaction(Transaction.FromDict(data.transaction), Signature.FromBase58(data.signature), PublicKey.FromBase58(data.pubkey));
  }

  /**
   * @desc
   *  Serialize the signed transaction to a plain object including signature and pubkey.
   */
  public override ToDict(): object {
    return {
      transaction: super.ToDict(),
      hash: this.GetHash(),
      pubkey: this._publicKey.ToBase58(),
      signature: this._signature.ToBase58(),
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
