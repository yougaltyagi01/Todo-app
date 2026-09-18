const { cacheMiddleware, clearCache } = require('../../middleware/cache');

describe('cacheMiddleware', () => {

  beforeEach(() => {
    clearCache();
    jest.clearAllMocks();
  });

  test('should return cached data on cache hit', () => {
    const req = {
      originalUrl: '/api/todos'
    };

    const firstRes = {
      locals: {},
      json: jest.fn()
    };

    const firstNext = jest.fn();

    const middleware = cacheMiddleware(10000);

    middleware(req, firstRes, firstNext);

    expect(firstNext).toHaveBeenCalled();

    firstRes.json([
      { id: 1, text: 'Learn Jest', completed: false }
    ]);

    const secondRes = {
      locals: {},
      json: jest.fn()
    };

    const secondNext = jest.fn();

    middleware(req, secondRes, secondNext);

    expect(secondRes.json).toHaveBeenCalledWith([
      { id: 1, text: 'Learn Jest', completed: false }
    ]);

    expect(secondNext).not.toHaveBeenCalled();
  });

  test('should call next on cache miss', () => {
    const req = {
      originalUrl: '/api/todos'
    };

    const res = {
      locals: {},
      json: jest.fn()
    };

    const next = jest.fn();

    const middleware = cacheMiddleware(10000);

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

 test('should clear the cache', () => {
  const req = {
    originalUrl: '/api/todos'
  };

  const middleware = cacheMiddleware(10000);

  const firstRes = {
    locals: {},
    json: jest.fn()
  };

  const firstNext = jest.fn();

  middleware(req, firstRes, firstNext);

  firstRes.json([
    { id: 1, text: 'Learn Jest', completed: false }
  ]);

  clearCache();

  const secondRes = {
    locals: {},
    json: jest.fn()
  };

  const secondNext = jest.fn();

  middleware(req, secondRes, secondNext);

  expect(secondNext).toHaveBeenCalled();
});
})