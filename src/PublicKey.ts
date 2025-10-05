import { ed448 } from '@noble/curves/ed448';
import { sha3_256 } from '@noble/hashes/sha3';
import bs58 from 'bs58';
import { Address } from './Address.js';

export class PublicKey {
  private readonly bytes: Uint8Array;

  private constructor(pubKeyBytes: Uint8Array) {
    this.bytes = pubKeyBytes;
  }

  /**
   * @desc
   * Create public key from raw bytes.
   */
  public static FromBytes(pubKeyBytes: Uint8Array): PublicKey {
    return new PublicKey(pubKeyBytes);
  }

  /**
   * @desc
   * Create public key from a hex string.
   */
  public static FromHex(pubKeyHex: string): PublicKey {
    const pubKeyBytes = Uint8Array.from(Buffer.from(pubKeyHex, 'hex'));
    return new PublicKey(pubKeyBytes);
  }

  /**
   * @desc
   * Create public key from a base58 string.
   */
  public static FromBase58(pubKeyBs58: string): PublicKey {
    const pubKeyBytes = bs58.decode(pubKeyBs58);
    return new PublicKey(pubKeyBytes);
  }

  /**
   * @desc
   *  Get the raw public key bytes.
   */
  public GetBytes(): Uint8Array {
    return this.bytes;
  }

  /**
   * @desc
   *  Get the public key encoded in hex string format.
   */
  public ToHex(): string {
    return Buffer.from(this.bytes).toString('hex');
  }

  /**
   * @desc
   *  Get the public key encoded in base58 string format.
   */
  public ToBase58(): string {
    return bs58.encode(this.bytes);
  }

  /**
   * @desc
   *  Compute the address (SHA3‑256 hash of the public key) of account associated with this public key.
   */
  public GetAddress(): Address {
    const hashBytes = sha3_256(this.bytes);
    return Address.FromBytes(hashBytes);
  }
}
