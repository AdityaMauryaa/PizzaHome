const errorHandler = (err, req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;