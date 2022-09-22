import { NestFactory } from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express'
import {WsAdapter} from '@nestjs/platform-ws'
import path from 'path'
import { AppModule } from '@/modules/app.module'
import {SocketIoAdapter} from './adapters/socket-io.adaptor'
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app))
  await app.listen(3000);
}

bootstrap();
