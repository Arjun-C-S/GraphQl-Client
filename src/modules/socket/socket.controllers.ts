import { Controller, Post, Body } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SocketClient } from './socket.service';
import { MovieDTO } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly socketClient: SocketClient,
        private readonly logger: Logger,
    ) {}

    @Post('create')
    createMovie(@Body() movieDetails: MovieDTO) {
        this.socketClient.createMovie(movieDetails);

        this.logger.log(`Movie creation event triggered for: ${movieDetails}`);
        return { message: 'Movie creation triggered' };
    }
}
