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
  handleRequestStocksEvent(
    @MessageBody() date: Date,
    @ConnectedSocket() client: Socket,
  ): void {
    const stocks = this.stockService.getAllStocks(date);
    client.emit('allStocks', stocks);
  }

  @SubscribeMessage('updateStock')
  handleUpdateStockEvent(@MessageBody() { stock, date }): void {
    const updatedStock = this.stockService.updateStock(stock, date);
    this.server.emit('stockUpdated', updatedStock);
    /*const newDate = new Date();
    const stocks = this.stockService.getAllStocks(newDate);
    this.server.emit('allStocks', stocks);*/
  }

  @SubscribeMessage('deleteStock')
  handleDeleteStockEvent(@MessageBody() stock: Stock): void {
    const deletedStock = this.stockService.deleteStock(stock);
    this.server.emit('stockDeleted', deletedStock);
    /*const newDate = new Date();
    const stocks = this.stockService.getAllStocks(newDate);
    this.server.emit('allStocks', stocks);*/
  }

  @SubscribeMessage('createStock')
  handleCreateStockEvent(@MessageBody() stock: Stock): void {
    const createdStock = this.stockService.createStock(stock);
    this.server.emit('stockCreated', createdStock);
  }
}
