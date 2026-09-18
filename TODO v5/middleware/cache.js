const cache = new Map();

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < duration) {
      console.log(`[CACHE HIT] ${key}`);
      return res.json(cached.data);
    }

    console.log(`[CACHE MISS] ${key}`);

    res.locals.cacheKey = key;

    const originalJson = res.json.bind(res);

    res.json = (data) => {
      cache.set(key, {
        data,
        timestamp: Date.now()
      });

      originalJson(data);
    };

    next();
  };
};

const clearCache = () => {
  cache.clear();
  console.log('[CACHE CLEARED]');
};

module.exports = {
  cacheMiddleware,
  clearCache
};