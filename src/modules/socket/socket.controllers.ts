import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SocketClient } from './socket.service';
import { MovieDTO } from './dto/movie.dto';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly socketClient: SocketClient,
        private readonly logger: Logger,
    ) {}

    @Post('create')
    @UseGuards(JwtAuthGuard) // JWT Validation
    createMovie(@Body() movieDetails: MovieDTO) {
        this.socketClient.createMovie(movieDetails);

        this.logger.log(`Movie creation event triggered for: ${movieDetails}`);
        return { message: 'Movie creation triggered' };
    }
}
