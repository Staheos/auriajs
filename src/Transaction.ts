import { sha3_256 } from '@noble/hashes/sha3';

import { TransactionType } from './TransactionType.js';
import { Hash } from "./Hash.js";
import { IHashable } from "./interfaces/IHashable.js";


/**
 * @desc
 *  A simple transaction model with serialization, deserialization, and hashing.
 */
export class Transaction implements IHashable {
  amount: number;
  fees: number;
  recipient: string;
  sender: string;
  timestamp: number;
  timestampValid: number;

  /**
   * @desc
   *  Initialize a new Transaction.
   */
  public constructor(amount: number, fees: number, recipient: string, sender: string, timestamp?: number, timestampValid?: number) {
    this.amount = amount;
    this.fees = fees;
    this.recipient = recipient;
    this.sender = sender;
    if (timestamp && timestampValid) {
      this.timestamp = timestamp;
      this.timestampValid = timestampValid;
    } else {
      this.timestamp = Date.now();
      this.timestampValid = this.timestamp + 30 * 1000;
    }
  }

  /**
   * @desc
   *  Create a Transaction object from a plain object.
   */
  public static FromDict(data2: object): Transaction {
    const data = data2 as TransactionType;
    return new Transaction(data.amount, data.fees, data.recipient, data.sender, data.timestamp, data.timestamp_valid);
  }

  /**
   * @desc
   *  Create a Transaction object from a JSON string.
   */
  public static Deserialize(jsonStr: string): Transaction {
    const data = JSON.parse(jsonStr) as {
      amount: number;
      fees: number;
      recipient: string;
      sender: string;
    };
    return Transaction.FromDict(data);
  }

  /**
   * @desc
   *  Serialize the transaction to a plain object.
   */
  public ToDict(): object {
    return {
      amount: this.amount,
      fees: this.fees,
      recipient: this.recipient,
      sender: this.sender,
    };
  }

  /**
   * @desc
   *  Serialize the transaction to a JSON string.
   */
  public Serialize(): string {
    return JSON.stringify(Transaction.prototype.ToDict.call(this));
  }

  /**
   * @desc
   *  Get the hash of the transaction.
   */
  public GetHash(): Hash {
    const bytes = new TextEncoder().encode(Transaction.prototype.Serialize.call(this));
    const hashBytes = sha3_256(bytes) as Uint8Array;

    return Hash.FromHex(Array.from(hashBytes)
      .map((b: number) => b.toString(16).padStart(2, '0'))
      .join(''));
  }
}
