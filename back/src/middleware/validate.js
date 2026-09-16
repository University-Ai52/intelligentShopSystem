// validate(schema, "body" | "query" | "params")
export function validate(schema, where = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[where]);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      });
    }
    req[where] = result.data;
    next();
  };
}
