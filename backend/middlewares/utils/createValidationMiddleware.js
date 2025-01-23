export function createValidationMiddleware(schema) {
   return async (req, res, next) => {
      try {
         await schema.validate(req.body, { strict: true });
         next();
      } catch (error) {
         res.status(400).json({ message: "Bad Request", error });
      }
   };
}
