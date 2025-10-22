import { ed448 } from '@noble/curves/ed448';
import { PrivateKey } from "./PrivateKey.js";
import { PublicKey } from "./PublicKey.js";
import { IBase58 } from "./interfaces/IBase58.js";
import { IHex } from "./interfaces/IHex.js";
import bs58 from "bs58";


export class Signature implements IHex, IBase58 {
  private readonly signature: Uint8Array;

  private constructor(signature: Uint8Array) {
    this.signature = signature;
  }

  /**
   * @desc
   *  Sign bytes using given private key.
   */
  public static Sign(data: Uint8Array, privateKey: PrivateKey): Signature {
    const sig = ed448.sign(data, privateKey.GetBytes());
    return new Signature(sig);
  }

  /**
   * @desc
   *  Deserialize a hex string to a Signature object.
   */
  public static FromHex(signatureHex: string): Signature {
    const sigBytes = Uint8Array.from(Buffer.from(signatureHex, 'hex'));
    return new Signature(sigBytes);
  }

  /**
   * @desc
   *  Deserialize a Base58 string to a Signature object.
   */
  public static FromBase58(signatureBs58: string): Signature {
    const sigBytes = bs58.decode(signatureBs58);
    return new Signature(sigBytes);
  }

  /**
   * @desc
   *  Verify signature against data and public key.
   */
  public Verify(data: Uint8Array, publicKey: PublicKey): boolean {
    return ed448.verify(this.signature, data, publicKey.GetBytes());
  }

  /**
   * @desc
   *  Serialize the signature to a hex string.
   */
  public ToHex(): string {
    return Buffer.from(this.signature).toString('hex');
  }

  /**
   * @desc
   *  Serialize the signature to a hex string.
   */
  public ToBase58(): string {
    return bs58.encode(this.signature);
  }

  /**
   * @desc
   *  String representation of the signature.
   */
  public ToString(): string {
    return this.ToBase58();
  }
}
