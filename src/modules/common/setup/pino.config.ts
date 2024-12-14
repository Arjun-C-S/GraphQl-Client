/**
 * This configuration object defines settings for the `pino` logger in the NestJS application.
 *
 * The `pinoHttp` object configures the HTTP-specific logging behavior, including:
 * - `customProps`: Adds custom properties to each log entry. In this case, it adds a `context` 
 *      property with the value 'HTTP' for better log identification.
 * - `transport`: Specifies the transport mechanism for formatting the log output.
 * - `target`: The `pino-pretty` transport is used to format logs in a human-readable format.
 * - `options`: The `singleLine` option ensures that logs are printed in a single line, making them easier to read.
 *
 */

export const pinoConfig = {
    pinoHttp: {
        customProps: () => ({
            context: 'HTTP',
        }),
        transport: {
            target: 'pino-pretty',
            options: {
                singleLine: true,
            },
        },
    },
};
