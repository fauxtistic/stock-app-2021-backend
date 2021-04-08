import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
  name: String,
  description: String,
  oldValue: Number,
  currentValue: Number,
  dateOfOldValue: Date,
  dateOfCurrentValue: Date,
});
