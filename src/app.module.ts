import { Module } from '@nestjs/common';
import { StockModule } from './api/stock.module';
import { StockService } from './core/services/stock.service';

@Module({
  imports: [StockModule],
  controllers: [],
  providers: [StockService],
})
export class AppModule {}
