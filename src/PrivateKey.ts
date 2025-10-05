import { ed448 } from '@noble/curves/ed448';
import { sha3_256 } from '@noble/hashes/sha3';
import bs58 from 'bs58';
import { Address } from './Address.js';
import { PublicKey } from "./PublicKey.js";

export class PrivateKey {
  private readonly bytes: Uint8Array;

  private constructor(privKeyBytes: Uint8Array) {
    this.bytes = privKeyBytes;
  }

  /**
   * @desc
   *  Generate a new ED448 private key.
   */
  public static Generate(): PrivateKey {
    return PrivateKey.FromBytes(ed448.utils.randomPrivateKey());
  }

  /**
   * @desc
   * Create private key from raw bytes.
   */
  public static FromBytes(privKeyBytes: Uint8Array): PrivateKey {
    return new PrivateKey(privKeyBytes);
  }

  /**
   * @desc
   * Create private key from a hex string.
   */
  public static FromHex(pubKeyHex: string): PrivateKey {
    const privKeyBytes = Uint8Array.from(Buffer.from(pubKeyHex, 'hex'));
    return new PrivateKey(privKeyBytes);
  }

  /**
   * @desc
   * Create private key from a base58 string.
   */
  public static FromBase58(pubKeyBs58: string): PrivateKey {
    const privKeyBytes = bs58.decode(pubKeyBs58);
    return new PrivateKey(privKeyBytes);
  }

  /**
   * @desc
   *  Get the raw private key bytes.
   */
  public GetBytes(): Uint8Array {
    return this.bytes;
  }

  /**
   * @desc
   *  Get the private key encoded in hex string format.
   */
  public ToHex(): string {
    return Buffer.from(this.bytes).toString('hex');
  }

  /**
   * @desc
   *  Get the private key encoded in base58 string format.
   */
  public ToBase58(): string {
    return bs58.encode(this.bytes);
  }

  /**
   * @desc
   *  Compute the public key associated with this private key.
   */
  public GetPublicKey(): PublicKey {
    return PublicKey.FromBytes(ed448.getPublicKey(this.bytes));
  }

  /**
   * @desc
   *  Compute the address (SHA3‑256 hash of the public key) of account associated with this private key.
   */
  public GetAddress(): Address {
    return this.GetPublicKey().GetAddress();
  }
}
