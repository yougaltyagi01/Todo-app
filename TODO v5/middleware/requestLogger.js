const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  console.log(`[START] ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    console.log(
      `[END] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

module.exports = requestLogger;