import { sha3_256 } from '@noble/hashes/sha3';

import { TransactionDict } from './TransactionDict.js';


/**
 * @desc
 *  A simple transaction model with serialization, deserialization, and hashing.
 */
export class Transaction {
  amount: number;
  fees: number;
  recipient: string;
  sender: string;

  /**
   * @desc
   *  Initialize a new Transaction.
   */
  constructor(amount: number, fees: number, recipient: string, sender: string) {
    this.amount = amount;
    this.fees = fees;
    this.recipient = recipient;
    this.sender = sender;
  }

  /**
   * @desc
   *  Create a Transaction object from a plain object.
   */
  static fromDict(data: {
    amount: number;
    fees: number;
    recipient: string;
    sender: string;
  }): Transaction {
    return new Transaction(data.amount, data.fees, data.recipient, data.sender);
  }

  /**
   * @desc
   *  Create a Transaction object from a JSON string.
   */
  static deserialize(jsonStr: string): Transaction {
    const data = JSON.parse(jsonStr) as {
      amount: number;
      fees: number;
      recipient: string;
      sender: string;
    };
    return Transaction.fromDict(data);
  }

  /**
   * @desc
   *  Serialize the transaction to a plain object.
   */
  toDict(): TransactionDict {
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
  serialize(): string {
    return JSON.stringify(this.toDict());
  }

  /**
   * @desc
   *  String representation of the transaction.
   */
  toString(): string {
    return this.serialize();
  }

  /**
   * @desc
   *  Get the hash of the transaction.
   */
  getHash(): string {
    const bytes = new TextEncoder().encode(this.serialize());
    const hashBytes = sha3_256(bytes) as Uint8Array;
    
    return Array.from(hashBytes)
      .map((b: number) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
