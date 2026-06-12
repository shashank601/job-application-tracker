export const ApplicationSchema = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      example: "684af3e2b7c5f7d6e1a67890"
    },
    userId: {
      type: "string",
      example: "684af3e2b7c5f7d6e1a12345"
    },
    company_name: {
      type: "string",
      example: "Google"
    },
    position: {
      type: "string",
      example: "Backend Developer"
    },
    status: {
      type: "string",
      enum: ["applied", "interview", "rejected", "accepted"],
      example: "applied"
    },
    applied_at: {
      type: "string",
      format: "date-time"
    },
    application_link: {
      type: "string",
      example: "https://careers.google.com/jobs/123"
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


// Request Body Schemas
export const CreateApplicationSchema = {
  type: "object",
  required: ["company_name", "position"],
  properties: {
    company_name: {
      type: "string",
      minLength: 2,
      example: "Google"
    },
    position: {
      type: "string",
      minLength: 2,
      example: "Backend Developer"
    },
    status: {
      type: "string",
      enum: ["applied", "interview", "accepted", "rejected"],
      example: "applied"
    },
    applied_at: {
      type: "string",
      format: "date-time"
    },
    application_link: {
      type: "string",
      format: "uri",
      example: "https://careers.google.com/jobs/123"
    }
  }
};


export const UpdateApplicationSchema = {
  type: "object",
  properties: {
    company_name: {
      type: "string",
      minLength: 2
    },
    position: {
      type: "string",
      minLength: 2
    },
    status: {
      type: "string",
      enum: ["applied", "interview", "accepted", "rejected"]
    },
    applied_at: {
      type: "string",
      format: "date-time"
    },
    application_link: {
      type: "string",
      format: "uri"
    }
  }
};


// respomse schema

export const AuthResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "User logged in successfully"
    },
    token: {
      type: "string"
    },
    user: {
      $ref: "#/components/schemas/User"
    }
  }
};


export const ApplicationResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true
    },
    data: {
      $ref: "#/components/schemas/Application"
    }
  }
};


export const ApplicationsListResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true
    },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Application"
      }
    },
    total: {
      type: "integer",
      example: 25
    },
    page: {
      type: "integer",
      example: 1
    },
    limit: {
      type: "integer",
      example: 10
    },
    totalPages: {
      type: "integer",
      example: 3
    },
    hasNextPage: {
      type: "boolean",
      example: true
    },
    hasPrevPage: {
      type: "boolean",
      example: false
    }
  }
};


export const UserResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true
    },
    data: {
      $ref: "#/components/schemas/User"
    }
  }
};


export const SuccessMessageSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true
    },
    message: {
      type: "string",
      example: "Application deleted successfully"
    }
  }
};


export const MongoIdParamSchema = {
  type: "string",
  pattern: "^[0-9a-fA-F]{24}$",
  example: "684af3e2b7c5f7d6e1a67890"
};


export const ErrorResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: false
    },
    message: {
      type: "string",
      example: "Application not found"
    }
  }
};

export const AuthErrorSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Invalid credentials"
    }
  }
};

