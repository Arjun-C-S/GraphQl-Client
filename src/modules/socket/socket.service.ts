import { Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { io, Socket } from 'socket.io-client';
import { MovieDTO } from './dto/movie.dto';
import { ConfigService } from '@nestjs/config';
import { SocketConfig } from 'env.interface';
import { SocketEvents } from './enum/socket.enum';

/**
 * This service handles communication between the NestJS application and a Socket.IO server.
 *
 * The SocketClient service is responsible for establishing a connection to a Socket.IO server,
 * emitting and listening to events related to movie creation. It uses the `socket.io-client`
 * library to connect to the server and listens for events such as 'MOVIE_CREATION'.
 * It also allows emitting events like 'CREATE_MOVIE' with movie details to notify the server.
 *
 * The service is initialized on module startup and logs the connection status and movie creation events.
 *
 */

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
