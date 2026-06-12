import swaggerJSDoc from "swagger-jsdoc";
import {
  UserSchema,
  RegisterRequestSchema,
  LoginRequestSchema
} from "./schema/user.js";

import {
  ApplicationSchema,
  CreateApplicationSchema,
  UpdateApplicationSchema,
  AuthResponseSchema,
  ApplicationResponseSchema,
  ApplicationsListResponseSchema,
  UserResponseSchema,
  SuccessMessageSchema,
  ErrorResponseSchema,
  AuthErrorSchema
} from "./schema/application.js";


import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Application Tracker API",
      version: "1.0.0",
      description: "API documentation for Auth, Applications, and Admin features",
    },
    servers: [
      {
        url: process.env.BASE_URL + "/api/v1",
      },
    ],
    components: {

      schemas: {
        Register: RegisterRequestSchema,
        Login: LoginRequestSchema,

        User: UserSchema,

        Application: ApplicationSchema,
        CreateApplication: CreateApplicationSchema,
        UpdateApplication: UpdateApplicationSchema,

        AuthResponse: AuthResponseSchema,

        ApplicationResponse: ApplicationResponseSchema,
        ApplicationsListResponse: ApplicationsListResponseSchema,
        UserResponse: UserResponseSchema,

        SuccessMessage: SuccessMessageSchema,

        ErrorResponse: ErrorResponseSchema,
        AuthError: AuthErrorSchema
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/docs/*.js", "./src/docs/paths/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);