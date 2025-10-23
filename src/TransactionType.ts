
/**
 * @desc
 * Transaction dictionary interface that includes the transaction details.
 */
export interface TransactionType {
    amount: number;
    fees: number;
    recipient: string;
    sender: string;
    timestamp: number;
    timestamp_valid: number;
    [key: string]: any;
}