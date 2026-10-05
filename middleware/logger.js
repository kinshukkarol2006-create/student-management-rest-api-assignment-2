function logger(req, res, next) {
  const startedAt = Date.now();
  res.on('finish', () => {
    const timestamp = new Date().toISOString();
    const elapsedMs = Date.now() - startedAt;
    console.log(timestamp + ' ' + req.method + ' ' + req.originalUrl + ' ' + res.statusCode + ' ' + elapsedMs + 'ms');
  });
  next();
}

module.exports = logger;
