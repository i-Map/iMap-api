'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  // 测试登录
  it('POST | /v1/login', async () => {
    return app.httpRequest()
      .post('/v1/login')
      .type('json')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(200);
  });

  // 测试第三方登录 - GitHub
  it('GET | /v1/oauth/github', async () => {
    return app.httpRequest()
      .get('/v1/oauth/github')
      .type('json')
      .expect(500);
  });

  // 测试第三方登录 - GitHub
  it('GET | /v1/oauth/github?code=123', async () => {
    return app.httpRequest()
      .get('/v1/oauth/github')
      .type('json')
      .expect(500);
  });
});
