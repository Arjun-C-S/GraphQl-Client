import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getApplicationPort, setupApplication } from './modules/common/setup/application';

/**
 * This project sets up a NestJS application with WebSocket support.
 *
 * The application leverages NestJS to manage WebSocket connections and provide real-time communication
 * capabilities. It includes modules for application setup and configuration, along with middleware
 * for handling WebSocket events, ensuring efficient and scalable communication for real-time features.
 *
 */

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true, cors: true });
    await setupApplication(app);
    const port = await getApplicationPort(app);
    await app.listen(port);
}
bootstrap();
