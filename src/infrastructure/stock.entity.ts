import { Document } from 'mongoose';

export interface StockEntity extends Document {
  readonly _id: string;
  readonly __v: number;
  readonly name: string;
  readonly description: string;
  readonly oldValue: number;
  readonly dateOfOldValue: Date;
  readonly currentValue: number;
  readonly dateOfCurrentValue: Date;
}
