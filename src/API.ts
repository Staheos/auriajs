import axios from 'axios';
import { SignedTransaction } from './SignedTransaction.js';


const DEFAULT_API_ENDPOINT = axios.create({
  baseURL: 'https://api.auria.dev:7190',
  headers: { 'Content-Type': 'application/json' },
});

const UNVERIFIED_API_ENDPOINT = axios.create({
  baseURL: 'http://api.auria.dev:7190',
  headers: { 'Content-Type': 'application/json' },
});

const LOCAL_API_ENDPOINT = axios.create({
  baseURL: 'https://localhost:7190',
  headers: { 'Content-Type': 'application/json' },
});

const LOCAL_UNVERIFIED_API_ENDPOINT = axios.create({
  baseURL: 'http://localhost:7190',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * @desc
 *  Select the API endpoint used to make requests to the node.
 */
let API_ENDPOINT = DEFAULT_API_ENDPOINT;
export function SelectAPIEndpoint(isLocal: boolean, isUnverified: boolean): void {
  if (isLocal) {
    API_ENDPOINT = isUnverified ? LOCAL_UNVERIFIED_API_ENDPOINT : LOCAL_API_ENDPOINT;
  } else {
    API_ENDPOINT = isUnverified ? UNVERIFIED_API_ENDPOINT : DEFAULT_API_ENDPOINT;
  }
}

/**
   * @desc
   *  Submit a signed transaction to the node via HTTP POST.
   */
export async function SubmitTransaction(tr: SignedTransaction): Promise<string> {
  const response = await API_ENDPOINT.post<string>('/st', tr.Serialize());
  return response.data;
}

/**
   * @desc
   *  Fetch the balance for the given account address.
   */
export async function FetchBalance(accountAddress: string): Promise<number | string> {
  const response = await API_ENDPOINT.get<string>(`/balance/${accountAddress}`);
  const text = response.data;
  if (!(response.status === 200)) {
    return text;
  }
  return parseInt(text, 10);
}
