
/**
 * @desc
 * Transaction dictionary interface that includes the transaction details.
 */
export interface TransactionDict {
    amount?: number;
    fees?: number;
    recipient?: string;
    sender?: string;
    [key: string]: any;
}