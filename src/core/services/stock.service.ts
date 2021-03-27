import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';

@Injectable()
export class StockService {
  stocks: Stock[] = [];
  currentId = 0;

  constructor() {
    this.seedData();
  }

  seedData(): void {
    console.log('seeding data', 'seeding');
    const stock1: Stock = {
      name: 'Novo',
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
    this.createStock(stock1);
    this.createStock(stock2);
    this.createStock(stock3);
  }

  createStock(stock: Stock): Stock {
    stock.id = ++this.currentId;
    this.stocks.push(stock);
    return stock;
  }

  getAllStocks(date: Date): Stock[] {
    for (const stock of this.stocks) {
      this.processStock(stock, date);
    }
    return this.stocks;
  }

  updateStock(stock: Stock, date: Date): Stock {
    const index = this.stocks.findIndex((s) => s.id == stock.id);
    this.processStock(stock, date);
    this.stocks[index] = stock;
    return stock;
  }

  deleteStock(stock: Stock): Stock {
    this.stocks = this.stocks.filter((s) => s.id != stock.id);
    return stock;
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
