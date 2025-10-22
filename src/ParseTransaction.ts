import { TransactionType } from "./TransactionType.js";
import { SignedTransactionType } from "./SignedTransactionType.js";
import { Transaction } from "./Transaction.js";
import { SignedTransaction } from "./SignedTransaction.js";


export function CheckTransactionType(v: object): TransactionType | undefined {
  if ("amount" in v && typeof v.amount !== "number") return undefined;
  if ("fees" in v && typeof v.fees !== "number") return undefined;
  if ("recipient" in v && typeof v.recipient !== "string") return undefined;
  if ("sender" in v && typeof v.sender !== "string") return undefined;
  return v as TransactionType;
}

export function CheckSignedTransactionType(v: object): SignedTransactionType | undefined {
  if ("transaction" in v && typeof v.amount !== "object") return undefined;
  if ("hash" in v && typeof v.fees !== "string") return undefined;
  if ("pubkey" in v && typeof v.recipient !== "string") return undefined;
  if ("signature" in v && typeof v.sender !== "string") return undefined;
  return v as TransactionType;
}

export function ParseTransaction(v: object): Transaction | SignedTransaction | undefined {
  let tx = CheckTransactionType(v);
  if (tx) {
    return Transaction.FromDict(tx);
  }
  tx = CheckSignedTransactionType(v);
  if (tx) {
    return SignedTransaction.FromDict(tx);
  }
  return undefined;
}
