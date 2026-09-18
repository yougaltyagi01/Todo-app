const validateTodo = require('../../middleware/validateTodo');

describe('validateTodo middleware', () => {

  test('should return 400 when text is missing', () => {
    const req = {
      body: {}
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const next = jest.fn();

    validateTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Task is required'
    });

    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 when text is empty', () => {
    const req = {
      body: {
        text: '   '
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const next = jest.fn();

    validateTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Task is required'
    });

    expect(next).not.toHaveBeenCalled();
  });

  test('should call next when text is valid', () => {
    const req = {
      body: {
        text: 'Learn Jest'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const next = jest.fn();

    validateTodo(req, res, next);

    expect(next).toHaveBeenCalled();

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

});