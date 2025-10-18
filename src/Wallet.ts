import { Address } from "./Address.js";
import { PublicKey } from "./PublicKey.js";
import { PrivateKey } from "./PrivateKey.js";


export class Wallet {
  private readonly privateKey: PrivateKey;

  /**
   * @desc
   * Create a wallet from private key.
   */
  public constructor(privKey: PrivateKey) {
    this.privateKey = privKey;
  }

  /**
   * @desc
   * Create a wallet from private key.
   */
  public static FromPrivateKey(privKey: PrivateKey): Wallet {
    return new Wallet(privKey);
  }

  /** 
   * @desc
   *  Generate a new wallet with unique keypair.
   */
  public static Generate(): Wallet {
    const privKey = PrivateKey.Generate();
    return new Wallet(privKey);
  }

  /**
   * @desc
   *  Get the private key associated with this wallet.
   */
  public GetPrivateKey(): PrivateKey {
    return this.privateKey;
  }

  /**
   * @desc
   *  Get the public key associated with this wallet.
   */
  public GetPublicKey(): PublicKey {
    return this.privateKey.GetPublicKey();
  }

  /**
   * @desc
   *  Compute the address (SHA3‑256 hash of the public key) in hex. 
   */
  public GetAddress(): Address {
    return this.privateKey.GetAddress();
  }
}
