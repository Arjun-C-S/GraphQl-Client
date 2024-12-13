import { Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { io, Socket } from 'socket.io-client';
import { MovieDTO } from './dto/movie.dto';
import { ConfigService } from '@nestjs/config';
import { SocketConfig } from 'env.interface';
import { SocketEvents } from './enum/socket.enum';

@Injectable()
export class SocketClient implements OnModuleInit {
    private socketClient: Socket;

    constructor(
        private readonly logger: Logger,
        private readonly configService: ConfigService<SocketConfig>,
    ) {
        this.socketClient = io(this.configService.get<string>('SOCKET_SERVER'));
    }

    onModuleInit() {
        this.socketClient.on(SocketEvents.CONNECT, () => {
            console.log('Connected to Socket.IO server');
        });

        this.socketClient.emit(SocketEvents.JOIN_ROOM, 'movie_creation');

        this.socketClient.on(SocketEvents.MOVIE_CREATION, (movie) => {
            console.log('Movie Created:', movie);
        });
    }

    createMovie(movieDetails: MovieDTO) {
        this.socketClient.emit(SocketEvents.CREATE_MOVIE, movieDetails);
        this.logger.log('Create Movie event emitted:', movieDetails);
    }
}
