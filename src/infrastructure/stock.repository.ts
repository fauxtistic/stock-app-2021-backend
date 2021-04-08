import { Inject, Injectable } from '@nestjs/common';
import { StockEntity } from './stock.entity';
import { Model } from 'mongoose';
import { Stock } from '../core/models/stock.model';

@Injectable()
export class StockRepository {
  constructor(
    @Inject('STOCK_MODEL')
    private stockDBModel: Model<StockEntity>,
  ) {}

  async addStock(stock: Stock): Promise<Stock> {
    const createdStock = new this.stockDBModel(stock);
    const savedStockEntity = await createdStock.save();
    const returnStock: Stock = {
      id: savedStockEntity._id,
      name: savedStockEntity.name,
      description: savedStockEntity.description,
      oldValue: savedStockEntity.oldValue,
      dateOfOldValue: savedStockEntity.dateOfOldValue,
      currentValue: savedStockEntity.currentValue,
      dateOfCurrentValue: savedStockEntity.dateOfCurrentValue,
    };
    return returnStock;
  }

  async deleteStock(stock: Stock): Promise<Stock> {
    await this.stockDBModel.findByIdAndDelete(stock.id);
    return stock; //probably unnecessary
  }

  async deleteAllStocks(): Promise<void> {
    await this.stockDBModel.deleteMany({});
  }

  async updateStock(stock: Stock): Promise<Stock> {
    const updatedStockEntity = await this.stockDBModel.findByIdAndUpdate(
      stock.id,
      stock,
      {
        new: true,
      },
    );
    const returnedStock = {
      id: updatedStockEntity._id,
      name: updatedStockEntity.name,
      description: updatedStockEntity.description,
      oldValue: updatedStockEntity.oldValue,
      dateOfOldValue: updatedStockEntity.dateOfOldValue,
      currentValue: updatedStockEntity.currentValue,
      dateOfCurrentValue: updatedStockEntity.dateOfCurrentValue,
    };
    return returnedStock;
  }

  async getAllStocks(): Promise<Stock[]> {
    const stockEntities = await this.stockDBModel.find();
    const stocks: Stock[] = [];
    for (const entity of stockEntities) {
      const stock: Stock = {
        id: entity._id,
        name: entity.name,
        description: entity.description,
        oldValue: entity.oldValue,
        dateOfOldValue: entity.dateOfOldValue,
        currentValue: entity.currentValue,
        dateOfCurrentValue: entity.dateOfCurrentValue,
      };
      stocks.push(stock);
    }
    return stocks;
  }
}
