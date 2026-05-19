import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BE Chat API",
      version: "1.0.0",
      description: "API documentation for BE Chat project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
