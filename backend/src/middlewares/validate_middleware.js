export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map(i => ({
          field: i.path[0],
          message: i.message
        }))
      });
    }

    req.body = result.data; 
    next();
  };
};
