import bs58 from 'bs58';


/**
 * @desc
 * Class to handle account addresses.
 */
export class Address {
  private readonly bytes: Uint8Array;

  private constructor(addressBytes: Uint8Array) {
    this.bytes = addressBytes;
  }

  /**
   * @desc
   * Create address from raw bytes.
   */
  public static FromBytes(addressBytes: Uint8Array): Address {
    return new Address(addressBytes);
  }

  /**
   * @desc
   * Create address from a hex string.
   */
  public static FromHex(addressHex: string): Address {
    const addressBytes = Uint8Array.from(Buffer.from(addressHex, 'hex'));
    return new Address(addressBytes);
  }

  /**
   * @desc
   * Create address from a base58 string.
   */
  public static FromBase58(addressBs58: string): Address {
    const addressBytes = bs58.decode(addressBs58);
    return new Address(addressBytes);
  }

  /**
   * @desc
   *  Get the raw address bytes.
   */
  public GetBytes(): Uint8Array {
    return this.bytes;
  }

  /**
   * @desc
   *  Get the address encoded in hex string format.
   */
  public ToHex(): string {
    return Buffer.from(this.bytes).toString('hex');
  }

  /**
   * @desc
   *  Get the address encoded in base58 string format.
   */
  public ToBase58(): string {
    return bs58.encode(this.bytes);
  }
}
