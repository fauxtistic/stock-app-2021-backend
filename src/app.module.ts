import { Module } from '@nestjs/common';
import { StockModule } from './api/stock.module';

@Module({
  imports: [StockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
