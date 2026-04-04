import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0', // Standard version for modern APIs
        info: {
            title: 'Exotic Books Admin API',
            version: '1.0.0',
            description: 'API documentation for the Day-by-Day Admin System',
        },
        // This is the magic that adds the "Authorize" button for your JWT
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Tell Swagger where to find your routes to read the comments
    apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
    // Serve the Swagger UI at the /api-docs route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('📄 Swagger Docs available at http://localhost:3000/api-docs');
};