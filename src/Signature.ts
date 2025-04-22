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
  static sign(data: Uint8Array, privateKey: Uint8Array): Signature {
    const sig = ed448.sign(data, privateKey);
    return new Signature(sig);
  }

  /**
   * @desc
   *  Deserialize a hex string to a Signature object.
   */
  static deserialize(signatureHex: string): Signature {
    const sigBytes = Uint8Array.from(Buffer.from(signatureHex, 'hex'));
    return new Signature(sigBytes);
  }

  /**
   * @desc
   *  Verify signature against data and public key.
   */
  verify(data: Uint8Array, publicKey: Uint8Array): boolean {
    return ed448.verify(this.signature, data, publicKey);
  }

  /**
   * @desc
   *  Serialize the signature to a hex string.
   */
  serialize(): string {
    return Buffer.from(this.signature).toString('hex');
  }

  /**
   * @desc
   *  String representation of the signature.
   */
  toString(): string {
    return this.serialize();
  }
}
