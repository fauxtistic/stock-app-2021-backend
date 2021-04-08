import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { StockRepository } from '../../infrastructure/stock.repository';

@Injectable()
export class StockService {
  constructor(private stockRepo: StockRepository) {
    this.seedData();
  }

  async seedData(): Promise<void> {
    await this.stockRepo.deleteAllStocks();
    const stock1: Stock = {
      name: 'Novo Nordisk',
      description: 'Medicinal company',
      currentValue: 1000,
      dateOfCurrentValue: new Date(),
    };
    const stock2: Stock = {
      name: 'Vestas',
      description: 'Wind power company',
      currentValue: 1100,
      dateOfCurrentValue: new Date(),
    };
    const stock3: Stock = {
      name: 'Mærsk',
      description: 'Container company',
      currentValue: 1200,
      dateOfCurrentValue: new Date(),
    };
    const stock4: Stock = {
      name: 'Novozymes',
      description: 'Container company',
      currentValue: 1300,
      dateOfCurrentValue: new Date(),
    };
    const stock5: Stock = {
      name: 'Danske Bank',
      description: 'Container company',
      currentValue: 1400,
      dateOfCurrentValue: new Date(),
    };
    await this.createStock(stock1);
    await this.createStock(stock2);
    await this.createStock(stock3);
    await this.createStock(stock4);
    await this.createStock(stock5);
  }

  async createStock(stock: Stock): Promise<Stock> {
    const createdStock = this.stockRepo.addStock(stock);
    return createdStock;
  }

  async getAllStocks(date: Date): Promise<Stock[]> {
    const stocks = await this.stockRepo.getAllStocks();
    const updatedStocks: Stock[] = [];
    for (const stock of stocks) {
      const updatedStock = await this.updateStock(stock, date);
      updatedStocks.push(updatedStock);
    }
    return updatedStocks;
  }

  async updateStock(stock: Stock, date: Date): Promise<Stock> {
    this.processStock(stock, date);
    const updatedStock = await this.stockRepo.updateStock(stock);
    return updatedStock;
  }

  async deleteStock(stock: Stock): Promise<Stock> {
    const deletedStock = await this.stockRepo.deleteStock(stock);
    return deletedStock;
  }

  private processStock(stock: Stock, date: Date): Stock {
    const updateDate = new Date(date).toJSON().slice(0, 10);
    const stockDate = new Date(stock.dateOfCurrentValue).toJSON().slice(0, 10);
    if (
      updateDate > stockDate ||
      (!stock.dateOfOldValue && updateDate == stockDate)
    ) {
      stock.oldValue = stock.currentValue;
      stock.dateOfOldValue = stock.dateOfCurrentValue;
      stock.dateOfCurrentValue = new Date(date);
    }
    return stock;
  }
}
