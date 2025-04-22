import { ed448 } from '@noble/curves/ed448';     
import { sha3_256 } from '@noble/hashes/sha3';   

export class Wallet {
  private readonly privateKey: Uint8Array;

  private constructor(privateKey: Uint8Array) {
    this.privateKey = privateKey;
  }

  /**
   * @desc
   * Create a wallet from raw private key bytes. 
   */
  static fromPrivateKeyBytes(privateKeyBytes: Uint8Array): Wallet {
    return new Wallet(privateKeyBytes);
  }

  /** 
   * @desc 
   * Create a wallet from a private key in hex string format. 
   */
  static fromPrivateKeyHex(privateKeyHex: string): Wallet {
    const privateKey = Uint8Array.from(Buffer.from(privateKeyHex, 'hex'));
    return new Wallet(privateKey);
  }

  /** 
   * @desc
   *  Generate a new ED448 private key. 
   */
  static generate(): Wallet {
    const privKey = ed448.utils.randomPrivateKey();
    return new Wallet(privKey);
  }

  /**
   * @desc
   *  Get the raw private key bytes. 
   */
  getPrivateKey(): Uint8Array {
    return this.privateKey;
  }

  /**
   * @desc
   *  Get the public key bytes for this wallet. 
   */
  getPublicKey(): Uint8Array {
    return ed448.getPublicKey(this.privateKey);
  }

  /**
   * @desc
   *  Compute the address (SHA3‑256 hash of the public key) in hex. 
   */
  getAddress(): string {
    const pub = this.getPublicKey();
    const hashBytes = sha3_256(pub);
    return Buffer.from(hashBytes).toString('hex');
  }
}
