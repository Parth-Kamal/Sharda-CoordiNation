const handleCastErrorDB = (err) => {
   err.message = `Invalid ${err.path}: ${err.value}`;
   err.statusCode = 400;
   return err;
};

export default (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   let error = { ...err };

   if (err.name === "CastError") {
      error = handleCastErrorDB(err);
   }

   return res.status(err.statusCode).json({
      msg: error.message,
   });
};
