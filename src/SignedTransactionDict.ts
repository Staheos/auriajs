import { TransactionDict } from "./TransactionDict.js";

/**
 * @desc
 *  A signed transaction dictionary interface that includes the transaction and signature details.
 */
export interface SignedTransactionDict {
    transaction: TransactionDict;
    hash: string;
    pubkey: string;
    signature: string;
  }