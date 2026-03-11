/** Represents the type of transaction performed by the user */
export type TransactionType = 'SUBSCRIPTION' | 'CANCELLATION';

/** Represents a transaction in the user's history */
export interface Transaction {
  id: string;
  fundId: number;
  fundName: string;
  type: TransactionType;
  amount: number;
  date: Date;
  notificationMethod: NotificationMethod;
}

/** Notification method selected by the user */
export type NotificationMethod = 'EMAIL' | 'SMS';
