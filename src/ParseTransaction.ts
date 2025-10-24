import { TransactionType } from "./TransactionType.js";
import { SignedTransactionType } from "./SignedTransactionType.js";
import { Transaction } from "./Transaction.js";
import { SignedTransaction } from "./SignedTransaction.js";


export function CheckTransactionType(v: any): TransactionType | undefined {
  if (! ("amount" in v) || typeof v.amount !== "number")
        return undefined;
    if (! ("fees" in v) || typeof v.fees !== "number")
        return undefined;
    if (! ("recipient" in v) || typeof v.recipient !== "string")
        return undefined;
    if (! ("sender" in v) || typeof v.sender !== "string")
        return undefined;
    if (! ("timestamp" in v) || typeof v.timestamp !== "number")
        return undefined;
    if (! ("timestamp_valid" in v) || typeof v.timestamp_valid !== "number")
        return undefined;
    return v as TransactionType;
}

export function CheckSignedTransactionType(v: any): SignedTransactionType | undefined {
  if (! ("transaction" in v) || typeof v.transaction !== "object")
        return undefined;
    if (! ("hash" in v) || typeof v.hash !== "string")
        return undefined;
    if (! ("pubkey" in v) || typeof v.pubkey !== "string")
        return undefined;
    if (! ("signature" in v) || typeof v.signature !== "string")
        return undefined;
    return v as SignedTransactionType;
}

export function ParseTransaction(v: object): Transaction | SignedTransaction | undefined {
  const tx = CheckTransactionType(v);
  if (tx) {
    return Transaction.FromDict(tx);
  }
  const stx = CheckSignedTransactionType(v);
  if (stx) {
    return SignedTransaction.FromDict(stx);
  }
  return undefined;
}
