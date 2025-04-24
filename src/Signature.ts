import { ed448 } from '@noble/curves/ed448';


export class Signature {
  private readonly signature: Uint8Array;

  private constructor(signature: Uint8Array) {
    this.signature = signature;
  }

  /**
   * @desc
   *  Sign bytes using given private key.
   */
  public static Sign(data: Uint8Array, privateKey: Uint8Array): Signature {
    const sig = ed448.sign(data, privateKey);
    return new Signature(sig);
  }

  /**
   * @desc
   *  Deserialize a hex string to a Signature object.
   */
  public static Deserialize(signatureHex: string): Signature {
    const sigBytes = Uint8Array.from(Buffer.from(signatureHex, 'hex'));
    return new Signature(sigBytes);
  }

  /**
   * @desc
   *  Verify signature against data and public key.
   */
  public Verify(data: Uint8Array, publicKey: Uint8Array): boolean {
    return ed448.verify(this.signature, data, publicKey);
  }

  /**
   * @desc
   *  Serialize the signature to a hex string.
   */
  public Serialize(): string {
    return Buffer.from(this.signature).toString('hex');
  }

  /**
   * @desc
   *  String representation of the signature.
   */
  public ToString(): string {
    return this.Serialize();
  }
}
