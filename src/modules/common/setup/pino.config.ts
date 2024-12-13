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
