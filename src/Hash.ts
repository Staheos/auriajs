import { ed448 } from '@noble/curves/ed448';
import { IBase58 } from "./interfaces/IBase58.js";
import { IHex } from "./interfaces/IHex.js";
import bs58 from "bs58";


export class Hash implements IHex, IBase58 {
  private readonly hash: Uint8Array;

  private constructor(hash: Uint8Array) {
    this.hash = hash;
  }

  /**
   * @desc
   *  Deserialize a hex string to a hash object.
   */
  public static FromHex(hashHex: string): Hash {
    return new Hash(Uint8Array.from(Buffer.from(hashHex, 'hex')));
  }

  /**
   * @desc
   *  Deserialize a Base58 string to a hash object.
   */
  public static FromBase58(hashBs58: string): Hash {
    return new Hash(bs58.decode(hashBs58));
  }

  /**
   * @desc
   *  Encode to a hex string representation.
   */
  public ToHex(): string {
    return Buffer.from(this.hash).toString('hex').toUpperCase();
  }

  /**
   * @desc
   *  Encode to a Base58 string representation.
   */
  public ToBase58(): string {
    return bs58.encode(this.hash);
  }
}
