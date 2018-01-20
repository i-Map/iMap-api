'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
  // 测试第三方登录 - GitHub
  it('It should return a userInfo', async () => {
    const ctx = app.mockContext();
    const model = {
      username: 'test',
      password: 'test',
    };

    const result = await ctx.service.v1.user.login(model);

    assert(result.attributes.username === 'test');
  });

  // 测试登录
  it('It should return a user info -> github info <-', async () => {
    const ctx = app.mockContext();
    const authData = {
      uid: '123',
      access_token: '123',
    };

    const result = await ctx.service.v1.user.oauth(authData, 'github');

    assert(result);
  });
});
