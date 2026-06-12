


export const UserSchema = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      example: "684af3e2b7c5f7d6e1a67890"
    },
    name: {
      type: "string",
      example: "Shashank"
    },
    email: {
      type: "string",
      format: "email",
      example: "shashank@example.com"
    },
    role: {
      type: "string",
      enum: ["user", "admin"],
      example: "user"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    },
    updatedAt: {
      type: "string",
      format: "date-time"
    }
  }
};



export const RegisterRequestSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
      example: "Shashank"
    },
    email: {
      type: "string",
      format: "email",
      example: "shashank@example.com"
    },
    password: {
      type: "string",
      minLength: 6,
      example: "password123"
    }
  }
};

export const LoginRequestSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "shashank@example.com"
    },
    password: {
      type: "string",
      example: "password123"
    }
  }
};