import { TransactionType } from "./TransactionType.js";

/**
 * @desc
 *  A signed transaction dictionary interface that includes the transaction and signature details.
 */
export interface SignedTransactionType {
    transaction: TransactionType;
    hash: string;
    pubkey: string;
    signature: string;
  }