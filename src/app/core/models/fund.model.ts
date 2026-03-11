/** Represents the category of an investment fund */
export type FundCategory = 'FPV' | 'FIC';

/** Represents an investment fund available for subscription */
export interface Fund {
  id: number;
  name: string;
  minimumAmount: number;
  category: FundCategory;
  isSubscribed: boolean;
}
