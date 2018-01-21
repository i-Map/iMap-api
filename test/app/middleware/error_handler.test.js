'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/middleware/error_handler.test.js', () => {
  // 测试验证错误返回
  it('It should throw an validate error', async () => {
    await app.httpRequest()
      .post('/v1/reset')
      .type('json')
      .send({})
      .expect(500);
  });

  // 测试权限认证
  it('It should throw an validate error', async () => {
    return await app.httpRequest()
      .get('/')
      .type('json')
      .expect(401);
  });
});
