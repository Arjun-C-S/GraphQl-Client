import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './modules/common/setup/pino.config';
import { SocketModule } from './modules/socket/socket.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        LoggerModule.forRoot(pinoConfig),
        SocketModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}