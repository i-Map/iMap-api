'use strict';

const jwt = require('jsonwebtoken');
const { app } = require('egg-mock/bootstrap');

describe('test/app/middleware/error_handler.test.js', () => {
  // 测试 404 Not Found
  it('It should throw an 404 error', async () => {
    const ctx = app.mockContext();

    const token = 'Bearer ' + jwt.sign({
      data: {
        objectId: '5a6cc9dba22b9d003d01d0e3',
      },
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, ctx.app.config.jwt.secret);

    await app.httpRequest()
      .get('/v1/test')
      .set('Authorization', token)
      .type('json')
      .expect(404);
  });
});
