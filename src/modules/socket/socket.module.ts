import { Module } from '@nestjs/common';
import { SocketClient } from './socket.service';
import { MoviesController } from './socket.controllers';

@Module({
    controllers: [MoviesController],
    providers: [SocketClient],
})
export class SocketModule {}
