import { Module } from '@nestjs/common';
import { StockService } from 'src/core/services/stock.service';
import { StockGateway } from './gateways/stock.gateway';
import { StockRepository } from '../infrastructure/stock.repository';
import { stocksProviders } from '../infrastructure/stock.providers';
import { MongoModule } from '../infrastructure/mongo.module';

@Module({
  providers: [StockGateway, StockService, StockRepository, ...stocksProviders],
  imports: [MongoModule],
})
export class StockModule {}
