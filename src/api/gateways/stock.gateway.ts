import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StockService } from '../../core/services/stock.service';
import { Socket } from 'socket.io';
import { Stock } from '../../core/models/stock.model';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockService: StockService) {}

  @WebSocketServer() server;

  @SubscribeMessage('requestStocks')
  async handleRequestStocksEvent(
    @MessageBody() date: Date,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const stocks = await this.stockService.getAllStocks(date);
    client.emit('allStocks', stocks);
  }

  @SubscribeMessage('updateStock')
  async handleUpdateStockEvent(@MessageBody() { stock, date }): Promise<void> {
    const updatedStock = await this.stockService.updateStock(stock, date);
    this.server.emit('stockUpdated', updatedStock);
    /*const newDate = new Date();
    const stocks = this.stockService.getAllStocks(newDate);
    this.server.emit('allStocks', stocks);*/
  }

  @SubscribeMessage('deleteStock')
  async handleDeleteStockEvent(@MessageBody() stock: Stock): Promise<void> {
    const deletedStock = await this.stockService.deleteStock(stock);
    this.server.emit('stockDeleted', deletedStock);
    /*const newDate = new Date();
    const stocks = this.stockService.getAllStocks(newDate);
    this.server.emit('allStocks', stocks);*/
  }

  @SubscribeMessage('createStock')
  async handleCreateStockEvent(@MessageBody() stock: Stock): Promise<void> {
    const createdStock = await this.stockService.createStock(stock);
    this.server.emit('stockCreated', createdStock);
  }
}
