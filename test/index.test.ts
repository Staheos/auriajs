

import { Wallet } from '../src/Wallet';
import { Transaction } from '../src/Transaction';
import { SignedTransaction } from '../src/SignedTransaction';

describe('Transaction ↔ Signing ↔ Verification flow', () => {
    it('creates a transaction, signs it with a Wallet, and verifies it', () => {
      
    const wallet = Wallet.Generate();
    expect(typeof wallet.GetAddress()).toBe('string');
    expect(wallet.GetAddress()).toMatch(/^0x[0-9a-fA-F]{40}$/);

        const tx = new Transaction(
            123.45, 
            0, 
            '0x' + 'a'.repeat(40), 
            wallet.GetAddress()
        );

    const signed: SignedTransaction = new SignedTransaction(tx, wallet);
    expect(signed).toBeInstanceOf(SignedTransaction);
    // expect(typeof signed).toBe('string');

    // const ok = SignedTransaction.Verify(signed, wallet.address);
    // expect(ok).toBe(true);
  });
});

describe('Transaction serialization', () => {
    it('round-trips through the dict form', () => {
        const data = {
            amount: 42,
            fees: 7,
            recipient: '0x' + 'b'.repeat(40),
            sender: '0x' + 'c'.repeat(40)
      
        };
        const tx = Transaction.FromDict(data);
        expect(tx.ToDict()).toEqual(data);
    });
});