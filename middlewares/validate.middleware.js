import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        status: false,
        message: formattedErrors[0]?.field + ": " + formattedErrors[0]?.message || "Validation failed", //    first error
        errors: formattedErrors,
      });
    }

    return res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default validate;