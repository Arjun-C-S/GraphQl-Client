import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from 'env.interface';
import { ConfigService } from '@nestjs/config';
import { SWAGGER, APPLICATION } from '../constants';
import { RedocModule, RedocOptions } from '@jozefazz/nestjs-redoc';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

/**
 * This module handles the setup and configuration of various aspects of the NestJS application,
 * including Swagger documentation, request validation, and logging.
 *
 * The `setupSwagger` function sets up Swagger documentation for the API, including the ability to
 * view the documentation via Redoc with customized themes. It uses the `nestjs/swagger` and
 * `@jozefazz/nestjs-redoc` libraries to generate and display the API documentation.
 *
 * The `setupRequestPayloadValidation` function ensures that incoming requests are validated using
 * the global `ValidationPipe`, helping to enforce input validation rules across the application.
 *
 * The `setupLogger` function integrates logging into the application using the `nestjs-pino`
 * logger and sets up error logging via the `LoggerErrorInterceptor`.
 *
 * Finally, the `setupApplication` function is a consolidated setup that initializes logging,
 * Swagger documentation, and request validation for the application.
 *
 */

async function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle(SWAGGER.APPLICATION_TITLE)
        .setDescription(SWAGGER.APPLICATION_DESCRIPTION)
        .setVersion(SWAGGER.APPLICATION_VERSION)
        .build();

    const document = SwaggerModule.createDocument(app, config);

    const redocOptions: RedocOptions = {
        title: SWAGGER.APPLICATION_TITLE,
        sortPropsAlphabetically: true,
        hideDownloadButton: false,
        hideHostname: false,
        theme: {
            typography: {
                fontSize: '16px',
                fontWeightBold: '900',
            },
            sidebar: {
                backgroundColor: '#d0e8c5',
            },
            rightPanel: {
                backgroundColor: '#01312b',
            },
        },
    };

    await RedocModule.setup(SWAGGER.SWAGGER_ENDPOINT, app, document, redocOptions);

    return app;
}

export async function getApplicationPort(app: INestApplication) {
    return +app.get<ConfigService>(ConfigService<AppConfig>).get('PORT', { infer: true }) || APPLICATION.DEFAULT_PORT;
}

async function setupRequestPayloadValidation(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe());

    return app;
}

export function setupLogger(app: INestApplication) {
    app.useLogger(app.get(Logger));
    app.useGlobalInterceptors(new LoggerErrorInterceptor());

    return app;
}

export async function setupApplication(app: INestApplication) {
    setupLogger(app);
    await setupSwagger(app);
    await setupRequestPayloadValidation(app);

    return app;
}
