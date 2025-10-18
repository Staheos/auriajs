import axios from 'axios';
import { SignedTransaction } from './SignedTransaction.js';


const DEFAULT_API_ENDPOINT = axios.create({
  baseURL: 'https://swipeu.dev:7190',
  headers: { 'Content-Type': 'application/json' },
});

const UNVERIFIED_API_ENDPOINT = axios.create({
  baseURL: 'http://swipeu.dev:7190',
  headers: { 'Content-Type': 'application/json' },
});

// @desc Current API endpoint used for requests.
let API_ENDPOINT = DEFAULT_API_ENDPOINT;

/**
 * @desc
 *  Select the API endpoint used to make requests to the node.
 */
export function SelectAPIEndpoint(isUnverified: boolean): void {
  API_ENDPOINT = isUnverified ? UNVERIFIED_API_ENDPOINT : DEFAULT_API_ENDPOINT;
}

/**
 * @desc
 *  Select local API endpoint with given address.
 */
export function SelectLocalAPIEndpoint(isUnverified: boolean, address: string): void {
  if (isUnverified) {
    API_ENDPOINT = axios.create({
      baseURL: `http://${ address }:7190`,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    API_ENDPOINT = axios.create({
      baseURL: `https://${ address }:7190`,
      headers: { 'Content-Type': 'application/json' },
    });
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
 *  Fetch the balance for the given account address. Returns a number on success or an error string on failure.
 */
export async function FetchBalance(accountAddress: string): Promise<number | string> {
  const response = await API_ENDPOINT.get<string>(`/balance/${ accountAddress }`);
  const text = response.data;
  if (!(response.status === 200) || parseInt(text, 10) === Number.NaN) {
    return text;
  }
  return parseInt(text, 10);
}
