import { Module } from '@nestjs/common';
import { StockService } from 'src/core/services/stock.service';
import { StockGateway } from './gateways/stock.gateway';

@Module({
  providers: [StockGateway, StockService],
})
export class StockModule {}
