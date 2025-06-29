import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Topper API',
            version: '1.0.0',
            description: 'API documentation for Topper project backend using Express & TypeScript',
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['src/api/v1/routes/**/*.ts'], // Auto-include from route files with Swagger JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);
