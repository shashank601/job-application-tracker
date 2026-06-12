export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const data =
      source === "body"
        ? req.body
        : source === "params"
        ? req.params
        : req.query;

    const result = schema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map(i => ({
          field: i.path[0],
          message: i.message
        }))
      });
    }

    if (source === "body") req.body = result.data;
    if (source === "params") req.params = result.data;
    if (source === "query") req.query = result.data;

    next();
  };
};