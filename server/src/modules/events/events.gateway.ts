import { 
  ConnectedSocket, 
  MessageBody, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {onlineMap} from './onlineMap'
import {EVENTS} from '../../../../shared'

@WebSocketGateway(3000, {
  namespace: /\/chat-.+/, 
  transports: ['websocket'],
  cors: true
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() 
  public server: Server

  afterInit(server: Server) {
    console.log("websocket server init!")
  }

  handleConnection(
    @ConnectedSocket() 
    socket: Socket, 
    ...args: any[]
  ) {
    console.log('hi')
    // console.log(`connected ${socket.nsp.name}`)
    if(!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {}
    }
    // socket.emit(EVENTS.TEST, socket.nsp.name)
    this.server.emit(EVENTS.TEST)
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`disconnected ${socket.nsp.name}`)
    const newNamespace = socket.nsp
    delete onlineMap[socket.nsp.name][socket.id]
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]))
  }

  @SubscribeMessage('message')
  handleMessage(
    client: any,
    @MessageBody() payload: any
  ): string {
    console.log('here')
    return '안녕하세요';
  }

  @SubscribeMessage('test')
  handleTest(
    @MessageBody() data: string
  ) {
    console.log(data)
  }

  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket
  ){
    const newNamespace = socket.nsp
    console.log('login')
    onlineMap[socket.nsp.name][socket.id] = data.id
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]))
    data.channels.forEach((channel) => {
      socket.join(`${socket.nsp.name}-${channel}`)
    })
  }

  @SubscribeMessage(EVENTS.MSG)
  handleMSG(){
    
  }
}
