import { SignedTransaction } from './SignedTransaction.js';

/**
   * @desc
   *  Submit a signed transaction to the node via HTTP POST.
   */
export async function SubmitTransaction(tr: SignedTransaction): Promise<string> {
  const response = await fetch('http://127.0.0.1:25561/st', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: tr.serialize(),
  });
  return await response.text();
}

/**
   * @desc
   *  Fetch the balance for the given account address.
   */
export async function FetchBalance(accountAddress: string): Promise<number | string> {
  const response = await fetch(`http://127.0.0.1:25561/balance/${accountAddress}`);
  const text = await response.text();
  if (!response.ok) {
    return text;
  }
  return parseInt(text, 10);
}
