import { Hash } from "../Hash.js";


export interface IHashable {
  GetHash: () => Hash;
}